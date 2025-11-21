import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const ROLES_CLAIM = "https://mungpt.rentmux.com/roles"

// Initialize the Auth0 student
export const auth0 = new Auth0Client({
    // Options are loaded from environment variables by default
    // Ensure necessary environment variables are properly set
    async beforeSessionSaved(session) {
        return {
            ...session,
            user: {
                ...session.user,
                [ROLES_CLAIM]: session.user[ROLES_CLAIM],
            },
        };
    },

});
