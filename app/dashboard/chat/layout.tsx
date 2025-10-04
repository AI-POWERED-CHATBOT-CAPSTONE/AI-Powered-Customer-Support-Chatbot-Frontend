import React from "react";

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className={"h-screen"}>{children}</main>
    )
}