import {TypographyP} from "@/components/ui/typography";
import React from "react";
import {IMessageDTO} from "@/database/models/message-model";

function ChatBubble({ children, isSender, sentBy = "student", message }: { children: React.ReactNode, isSender: boolean, sentBy?: string, message: IMessageDTO} ) {

    if (isSender) {
        return (
            <ResponseChatBubble> { children } </ResponseChatBubble>
        )
    }

    return (
        <CurrentUserChatBubble  sentBy={sentBy} message={message}> { children } </CurrentUserChatBubble>
    )
}

// for recipient
function ResponseChatBubble({ children }: { children: React.ReactNode }) {
    return (
        <TypographyP> {children} </TypographyP>
    )
}

// for sender
function CurrentUserChatBubble({ children, sentBy, message }: { children: React.ReactNode, sentBy?: string, message: IMessageDTO }) {
    return (
        <div className="flex justify-end w-full px-4 py-2">
            <div
                className="
          bg-[#f4f4f4]
          px-4 py-2 rounded-2xl
          max-w-[75%]
          whitespace-pre-wrap
          break-words
        "
            >
                <span style={ {color: message.endedAI ? "darkred": "black" } }>{children}</span>
                { sentBy !== "student" && (
                    <p className={"pt-4 grid place-content-end text-sm"}>
                        <span className={"inline-flex gap-2"}>
                             <span>sent by:</span>
                            { sentBy == "ai" && <span className={"text-red-500 font-bold uppercase"}>{sentBy}</span> }
                            { sentBy == "admin" && <span className={"text-teal-500 font-bold uppercase"}>{sentBy}</span> }
                        </span>
                    </p>
                )}
            </div>
        </div>
    )
}

export default ChatBubble