"use client"
import TextareaAutosize from "react-textarea-autosize"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group"
import {TypographyH3} from "@/components/ui/typography";
import Image from "next/image";
import {SendIcon} from "lucide-react";

function ChatInput() {
    return (
        <div className="grid w-full max-w-2xl gap-6 ">
            <div className={"flex gap-2 justify-center"}>
                <Image src={"/brand_logo.png"} alt={"brand logo"} width={40} height={40} />
                <TypographyH3 className={"text-center"}>How can I help you?</TypographyH3>
            </div>
            <InputGroup className={"rounded-lg"}>
                <TextareaAutosize
                    id="chat-box"
                    data-slot="input-group-control"
                    className="flex field-sizing-content min-h-16 w-full resize-none rounded-lg bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                    placeholder="Message MUN GPT..."
                />
                <InputGroupAddon align="block-end">
                    <InputGroupButton className="ml-auto rounded-full" size="icon-sm" variant="default" disabled={true}>
                        <SendIcon />
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}

export default ChatInput