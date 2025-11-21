"use client"

import ChatBubble from "@/components/chat-panel/chat-bubble";
import ChatInput from "@/components/chat-panel/chat-input";
import { useSearchParams } from 'next/navigation'
import {useMutation, useQuery} from "@tanstack/react-query";
import {fetchChatMessages, sendMessage} from "@/app/student/chat/actions";
import {axiosErrorHandler, queryClient} from "@/lib/utils";
import {IMessageDTO} from "@/database/models/message-model";
import ListLoader from "@/components/ui/list-loader";
import {Suspense, useCallback, useEffect, useRef} from "react";
import {useStudentChatStore} from "@/store/use-student-chat-store";
import {useUser} from "@auth0/nextjs-auth0";

function StudentChatPage() {
    return (
        <Suspense fallback={<ListLoader>Loading...</ListLoader>}>
            <StudentChatPageView />
        </Suspense>
    )
}

function StudentChatPageView() {
    const searchParams = useSearchParams()
    const chatId = searchParams.get('chatId')
    const setEventCaller = useStudentChatStore((state) => state.setEvent)
    const containerRef = useRef<HTMLDivElement>(null)
    const { user } = useUser()

    const refreshItems = useCallback(async (chatId: string | null) => {
        await queryClient.invalidateQueries({ queryKey: ['fetch-chat-messages', chatId] }).catch((error) => {
            console.log("error syncing records: ", error.message)
        });
        scrollUpChat()
    }, [])


    useEffect(() => {

        const unsubscribe = useStudentChatStore.subscribe(
            (state) => state.event,
            (event) => {
                if(event != undefined && ["message-sent"].includes(event) && chatId) {
                    refreshItems(chatId).catch(console.error)
                }
            }
        );

        return () => {
            unsubscribe()
        };

    }, [chatId, refreshItems]);

    const { isPending, data } = useQuery({
        queryKey: ['fetch-chat-messages', chatId],
        queryFn: () => fetchChatMessages(chatId),
    })



    const { mutate, isPending: isPendingSendMessage } = useMutation({
        mutationKey: ['send-student-message'],
        mutationFn: (request: { chatId: string, text: string }) => sendMessage({
            chatId: request.chatId, studentId: user?.sub || '', message: request.text,  isFirst: Boolean(!(data && data.length > 0))
        }),
        onSuccess: async (res) => {
            console.log("response:", res)
            setEventCaller("message-sent")
        },
        onError: axiosErrorHandler
    })

    const sendMessageHandler = useCallback((text: string) => {
        if (!chatId) {return}
        setEventCaller(undefined)
        mutate({chatId, text})
    }, [setEventCaller, chatId, mutate])


    // smooth scroll to bottom
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

    useEffect(() => {
        scrollUpChat()
    }, []);

    console.log('Chat ID:', chatId)

    return (
        <div className="flex flex-col h-screen py-12">
            <div className="flex-1 overflow-y-auto px-4 py-6" id="chat-container" ref={containerRef}>
                { isPending && (<div className={"max-w-3xl mx-auto"}><ListLoader>Fetching messages ...</ListLoader></div>)}
                { chatId && (
                    <ul className={"max-w-3xl mx-auto list-none space-y-8"}>

                        {
                            data && data.map((message: IMessageDTO) => {
                                return (
                                    <li key={message._id.toString()}>
                                        <ChatBubble isSender={message.sentBy === "student"}  sentBy={message.sentBy} message={message} />
                                    </li>
                                )
                            })
                        }

                    </ul>
                )}
            </div>
            <div className="p-4">
                { isPendingSendMessage &&
                    (<div className={"max-w-3xl mx-auto pb-3"}>
                        <ListLoader className={""}>Thinking ....</ListLoader>
                    </div>)
                }
                <ChatInput hasLabel={false} onSend={sendMessageHandler} />
            </div>
        </div>
    )
}

export default StudentChatPage;