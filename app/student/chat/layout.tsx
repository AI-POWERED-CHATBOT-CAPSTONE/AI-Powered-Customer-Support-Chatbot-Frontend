"use client"

import React, {Suspense, useCallback, useEffect} from "react";
import Sidebar from "@/components/sidebar/sidebar";
import {EditIcon} from "lucide-react";
import {TypographySmall} from "@/components/ui/typography";
import {getObjectId, queryClient} from "@/lib/utils";
import {useRouter, useSearchParams} from 'next/navigation'
import {Button} from "@/components/ui/button";
import {QueryClientProvider} from "@tanstack/react-query";
import ListLoader from "@/components/ui/list-loader";

export default function StudentChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={<ListLoader>Loading...</ListLoader>}>
            <StudentChatLayoutView > { children } </StudentChatLayoutView>
        </Suspense>
    )
}

function StudentChatLayoutView({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const chatId = searchParams.get('chatId')

    const handleNewChatClick = useCallback(() => {
        const newChatId = getObjectId()
        router.push(`/student/chat?chatId=${newChatId}`) // 👈 adds query param
    }, [router])

    useEffect(() => {
        if(!chatId) {
            handleNewChatClick()
        }
    }, [chatId, handleNewChatClick])



    return (
        <main className={"h-screen"}>
            <div className={"flex flex-row h-full"}>
                <div className={"w-[15%] h-full bg-[#f7f5f3]"}>
                    <QueryClientProvider client={queryClient}>
                        <Sidebar/>
                    </QueryClientProvider>
                </div>
                <div className={"w-[85%] h-full bg-white"}>
                    <div className={"fixed w-full py-6 px-6"}>
                        <Button variant={"link"} className={"flex gap-2 items-center"} onClick={handleNewChatClick}>
                            <EditIcon size={16}/>
                            <div><TypographySmall> New Chat</TypographySmall></div>
                        </Button>
                    </div>
                    {/*<ChatInitializer />*/}
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>

                </div>
            </div>

        </main>
    )
}