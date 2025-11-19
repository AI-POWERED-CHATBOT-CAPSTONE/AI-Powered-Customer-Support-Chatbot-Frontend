# -----------------------------
# 1. Dependencies Install Stage
# -----------------------------
FROM node:24-alpine AS deps

WORKDIR /app

# Add compatibility libs for Next.js & sharp
RUN apk add --no-cache libc6-compat

# Copy lock files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies depending on package manager
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  else npm install; \
  fi


# -----------------------------
# 2. Builder Stage
# -----------------------------
FROM node:24-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Ensure Next.js build cache directory exists
RUN mkdir -p .next/cache

# Build full Next.js app (NON-STANDALONE)
RUN npm run build


# -----------------------------
# 3. Production Runtime Stage
# -----------------------------
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create lightweight non-root user
RUN addgroup -g 1001 nodejs && \
    adduser -u 1001 -G nodejs -s /bin/sh -D nextjs

# Copy production files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Ensure Next.js cache exists + proper permissions
RUN mkdir -p .next/cache && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3001

# Run Next.js normally (NOT standalone)
CMD ["npm", "run", "start"]
