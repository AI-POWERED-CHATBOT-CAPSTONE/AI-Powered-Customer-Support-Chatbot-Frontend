import React from "react";
import AdminNav from "@/components/nav/admin-nav";
import TicketsPanel from "@/components/tickets/tickets-panel";
import SourcesPanel from "@/components/sources/sources-panel";

export default function AdminChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className={"h-screen bg-[#f1f5f9]"}>
            <AdminNav/>
            <div className={"pt-16 h-full"}>
                <div className={"flex flex-row h-full gap-4 px-12 pb-8 pt-2"}>
                    <section className={"w-[30%] h-full"}>
                        <TicketsPanel />
                    </section>
                    <section className={"w-[40%] h-full"}>
                        {children}
                    </section>
                    <section className={"w-[30%] h-full"}>
                        <SourcesPanel/>
                    </section>
                </div>
            </div>

        </main>
    )
}