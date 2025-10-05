import {TypographyP} from "@/components/ui/typography";
import React from "react";

function ChatBubble({ children, isSender }: { children: React.ReactNode, isSender: boolean } ) {

    if (!isSender) {
        return (
            <ResponseChatBubble> { children } </ResponseChatBubble>
        )
    }

    return (
        <CurrentUserChatBubble > { children } </CurrentUserChatBubble>
    )
}

// for recipient
function ResponseChatBubble({ children }: { children: React.ReactNode }) {
    return (
        <TypographyP> {children} </TypographyP>
    )
}

// for sender
function CurrentUserChatBubble({ children }: { children: React.ReactNode }) {
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
                {children}
            </div>
        </div>
    )
}

export default ChatBubble