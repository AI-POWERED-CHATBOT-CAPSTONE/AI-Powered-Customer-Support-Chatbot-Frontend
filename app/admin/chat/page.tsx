"use client"

import React, {Suspense, useCallback, useEffect, useRef} from "react";
import {MessageCircleIcon} from "lucide-react";
import PanelHead from "@/components/ui/panel-head";
import ChatBubble from "@/components/chat-panel/chat-bubble";
import ChatInput from "@/components/chat-panel/chat-input";
import {useSearchParams} from "next/navigation";
import {useMutation, useQuery} from "@tanstack/react-query";
import {axiosErrorHandler, queryClient} from "@/lib/utils";
import {tempSupport} from "@/lib/constants";
import {fetchEscalatedMessagesAction, sendAdminMessageAction} from "@/app/admin/chat/actions";
import {useAdminChatStore} from "@/store/use-admin-chat-store";
import ListLoader from "@/components/ui/list-loader";
import {IMessageDTO} from "@/database/models/message-model";

function AdminChatPage() {

    return (
        <Suspense fallback={<ListLoader>Loading...</ListLoader> }>
            <AdminChatPageView />
        </Suspense>
    )

}

function AdminChatPageView() {
    const searchParams = useSearchParams()
    const chatId = searchParams.get('chatId')
    const setAdminEventCaller = useAdminChatStore((state) => state.setEvent)
    const containerRef = useRef<HTMLDivElement>(null)

    const { isPending, data } = useQuery({
        queryKey: ['fetch-escalated-chat-messages', chatId],
        queryFn: () => fetchEscalatedMessagesAction(chatId),
    })

    const refreshItems = async (chatId: string | null) => {
        await queryClient.invalidateQueries({ queryKey: ['fetch-escalated-chat-messages', chatId] }).catch((error) => {
            console.log("error syncing records: ", error.message)
        });
        scrollUpChat()
    }

    const { mutate, isPending: isPendingSendMessage } = useMutation({
        mutationKey: ['send-admin-message'],
        mutationFn: (request: { chatId: string, text: string }) => sendAdminMessageAction({
            chatId: request.chatId, adminId: tempSupport.extId, message: request.text
        }),
        onSuccess: async (res) => {
            console.log("response:", res)
            setAdminEventCaller("admin-message-sent")
        },
        onError: axiosErrorHandler
    })

    const sendMessageHandler = useCallback((text: string) => {
        if (!chatId) {return}
        setAdminEventCaller(undefined)
        mutate({chatId, text})
    }, [setAdminEventCaller, chatId, mutate])

    useEffect(() => {

        const unsubscribe = useAdminChatStore.subscribe(
            (state) => state.event,
            (event) => {
                if(event != undefined && ["admin-message-sent"].includes(event) && chatId) {
                    refreshItems(chatId).then(console.error)
                }
            }
        );

        return () => {
            unsubscribe()
        };

    }, [chatId]);


    useEffect(() => {
        scrollUpChat()
    }, [data]);

    const scrollUpChat = () => {
        console.log("smooth scroll running ...........")
        const el = containerRef.current
        if (!el) return
        el.scrollTo({
            top: el.scrollHeight,
            behavior: "smooth", // or "auto" for instant scroll
        });
    }

    return (
        <div className={"bg-white h-full w-full rounded-lg overflow-hidden"}>
            <PanelHead title={"Chat"} icon={MessageCircleIcon}/>
            <div className="flex flex-col h-full pb-12 pt-0">
                <div className="flex-1 overflow-y-auto px-4 py-6" id="chat-container" ref={containerRef}>
                    { isPending && (<div className={"max-w-3xl mx-auto"}><ListLoader>Fetching messages ...</ListLoader></div>)}
                    <ul className={"max-w-3xl mx-auto list-none space-y-8"}>
                        {
                            data && data.map((item: IMessageDTO) => {
                                let msg = item.text
                                if (item.endedAI) {
                                    msg = "This conversation was escalated to the support team"
                                }
                                return (
                                    <li key={item._id}>
                                        <ChatBubble isSender={item.sentBy === "student"} sentBy={item.sentBy} message={item}>{ msg }</ChatBubble>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="p-4">
                    {isPendingSendMessage &&
                        (<div className={"max-w-3xl mx-auto py-3"}>
                            <ListLoader className={""}>Sending ....</ListLoader>
                        </div>)
                    }
                    <ChatInput hasLabel={false} onSend={sendMessageHandler} placeholder={"Send message..."}/>
                </div>
            </div>
        </div>
    )
}

export default AdminChatPage;