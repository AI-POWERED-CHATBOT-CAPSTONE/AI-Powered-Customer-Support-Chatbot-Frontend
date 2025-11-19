import {TypographyP} from "@/components/ui/typography";
import React from "react";
import {IMessageDTO} from "@/database/models/message-model";
import {cn} from "@/lib/utils";

function ChatBubble({ children, isSender, sentBy = "student", message }: { children: React.ReactNode, isSender: boolean, sentBy?: string, message: IMessageDTO} ) {

    console.log("message", {
        isSender,
        message
    })

    if (isSender) {
        return (
            <SenderChatBubble  sentBy={sentBy} message={message}> { children } </SenderChatBubble>
        )
    }

    return (
        <ResponseChatBubble sentBy={sentBy}> { children } </ResponseChatBubble>
    )
}

// for recipient
function ResponseChatBubble({ children, sentBy }: { children: React.ReactNode, sentBy?: string }) {
    return (
        <div>
            <TypographyP> {children} </TypographyP>
            <SentByText sentBy={sentBy} />
        </div>
    )
}

// for sender
function SenderChatBubble({ children, sentBy, message }: { children: React.ReactNode, sentBy?: string, message: IMessageDTO }) {
    return (
        <div className="flex justify-end w-full px-4 py-2">
            <div
                className="
          bg-[#f4f4f4]
          px-4 py-2 rounded-2xl
          max-w-[75%]
          whitespace-pre-wrap
          break-words
          select-text
        "
            >
                <span style={ {color: message.causedEscalation ? "darkred": "black" } }>{children}</span>
                <SentByText sentBy={sentBy} className={"place-content-end"} />
            </div>
        </div>
    )
}

function SentByText({ sentBy, className } : {sentBy?: string, className?: string}) {
    console.log("sendByText", sentBy)
    if (sentBy === "student") {
        return <p></p>
    }
    return (
        <p className={cn("pt-4 grid place-content-start text-sm",className)}>
            <span className={"inline-flex gap-2"}>
                 <span>sent by:</span>
                { sentBy == "ai"  && <span className={"text-red-500 font-bold uppercase"}>MUNGPT</span> }
                { sentBy == "admin" && <span className={"text-teal-500 font-bold uppercase"}>{sentBy}</span> }
            </span>
        </p>
    )
}

export default ChatBubble