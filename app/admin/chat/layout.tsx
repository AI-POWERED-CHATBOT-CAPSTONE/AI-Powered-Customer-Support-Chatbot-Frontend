"use client"

import React from "react";
import AdminNav from "@/components/nav/admin-nav";
import TicketsPanel from "@/components/tickets/tickets-panel";
import SourcesPanel from "@/components/sources/sources-panel";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/utils";

export default function AdminChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className={"h-screen bg-[#f1f5f9]"}>
            <AdminNav/>
            <div className={"pt-16 h-full"}>
                <div className={"flex flex-row h-full gap-4 px-12 pb-8 pt-2"}>
                    <section className={"w-[30%] h-full"}>
                        <QueryClientProvider client={queryClient}>
                            <TicketsPanel />
                        </QueryClientProvider>
                    </section>
                    <section className={"w-[40%] h-full"}>
                        <QueryClientProvider client={queryClient}>
                            {children}
                        </QueryClientProvider>
                    </section>
                    <section className={"w-[30%] h-full"}>
                        <QueryClientProvider client={queryClient} >
                            <SourcesPanel/>
                        </QueryClientProvider>
                    </section>
                </div>
            </div>

        </main>
    )
}