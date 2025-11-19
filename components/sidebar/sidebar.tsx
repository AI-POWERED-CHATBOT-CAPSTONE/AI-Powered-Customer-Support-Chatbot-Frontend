"use client"

import SidebarHeader from "@/components/sidebar/sidebar-header";
import SidebarFooter from "@/components/sidebar/sidebar-footer";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {fetchChatsConversations} from "@/app/student/chat/actions";
import ListLoader from "@/components/ui/list-loader";
import {queryClient} from "@/lib/utils";
import {useEffect} from "react";
import {useStudentChatStore} from "@/store/use-student-chat-store";
import {useUser} from "@auth0/nextjs-auth0";

export default function Sidebar() {

    const { user } = useUser();

    const { isPending, data } = useQuery({
        queryKey: ['fetch-chat-conversations'],
        queryFn: () => fetchChatsConversations(user?.sub || ''),
    })

    console.log("sidebar called ...", data)

    const refreshItems = () => {
        queryClient.invalidateQueries({ queryKey: ['fetch-chat-conversations'] }).catch((error) => {
            console.log("error syncing records: ", error.message)
        });
    }

    useEffect(() => {

        const unsubscribe = useStudentChatStore.subscribe(
            (state) => state.event,
            (event) => {
                if(event != undefined && ["message-sent"].includes(event)) {
                    refreshItems()
                }
            }
        );

        return () => {
            unsubscribe()
        };

    }, []);

    if (isPending) {
        return (
            <ListLoader>Fetching conversations ....</ListLoader>
        )
    }


    return (
        <div className={"flex flex-col h-full"}>
            <SidebarHeader />
            <div className={"h-full overflow-y-auto px-6"}>
                <p className={"text-sm text-muted-foreground py-8"}>Chats</p>
                <ul className={"list-none flex flex-col"}>
                    {
                       data && data.map((chat) => {
                           return (
                               <li key={chat._id.toString()}>
                                   <Link href={`/student/chat?chatId=${chat._id.toString()}`}>
                                       <p className={"py-2 text-sm"}>{ chat.title }</p>
                                   </Link>
                               </li>
                           )
                        })
                    }

                </ul>
            </div>
            <SidebarFooter />
        </div>
    )
}