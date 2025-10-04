import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { Questrial } from 'next/font/google'

const questrial = Questrial({
    weight: "400",
    subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "MUN GPT",
  description: "Get financial information about MUN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={questrial.className}
      >
        {children}
      </body>
    </html>
  );
}
