import React from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Link from "next/link";
import {EditIcon} from "lucide-react";
import {TypographySmall} from "@/components/ui/typography";

export default function ClientChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className={"h-screen"}>
            <div className={"flex flex-row h-full"}>
                <div className={"w-[15%] h-full bg-[#f7f5f3]"}>
                    <Sidebar/>
                </div>
                <div className={"w-[85%] h-full bg-white"}>
                    <div className={"fixed w-full py-6 px-6"}>
                        <Link href="/app/student/chat" className={"flex gap-2 items-center"}>
                            <EditIcon size={16}/>
                            <div><TypographySmall> New Chat</TypographySmall></div>
                        </Link>
                    </div>
                    {/*<ChatInitializer />*/}
                    {children}
                </div>
            </div>

        </main>
    )
}