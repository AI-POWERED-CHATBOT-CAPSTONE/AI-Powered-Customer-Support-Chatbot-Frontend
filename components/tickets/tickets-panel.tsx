"use client"

import {CircleQuestionMarkIcon} from "lucide-react";
import PanelHead from "@/components/ui/panel-head";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import ListLoader from "@/components/ui/list-loader";
import {fetchEscalatedConversationsAction} from "@/app/admin/chat/actions";

export default function TicketsPanel() {

    const { isPending, data } = useQuery({
        queryKey: ['fetch-escalated-chat-conversations'],
        queryFn: () => fetchEscalatedConversationsAction(),
    })

    console.log("Tickets sidebar called ...", data)

    return (
        <div className={"bg-white h-full w-full rounded-lg overflow-hidden"}>
            <PanelHead title={"Escalated conversations"} icon={CircleQuestionMarkIcon}/>
            <div className={"h-full overflow-y-auto px-6"}>
                <p className={"text-sm text-muted-foreground py-8"}>Chats</p>
                { isPending && <ListLoader>Fetching conversations ....</ListLoader> }
                <ul className={"list-none flex flex-col"}>
                    {
                        data && data.map((chat) => {
                            return (
                                <li key={chat._id.toString()}>
                                    <Link href={`/admin/chat?chatId=${chat._id.toString()}`}>
                                        <p className={"py-2 text-sm"}>{chat.title}</p>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}