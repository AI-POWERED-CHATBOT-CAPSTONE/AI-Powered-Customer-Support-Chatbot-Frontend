"use client"
import TextareaAutosize from "react-textarea-autosize"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group"
import {TypographyH3} from "@/components/ui/typography";
import Image from "next/image";
import {Sparkles} from "lucide-react";

function ChatInput({ hasLabel = true }: { hasLabel?: boolean } ) {
    return (
        <div className={"flex justify-center items-center"}>
            <div className="grid w-full max-w-3xl gap-6 ">
                {hasLabel && (
                    <div className={"flex gap-2 justify-center"}>
                        <Image src={"/brand_logo.png"} alt={"brand logo"} width={40} height={40}/>
                        <TypographyH3 className={"text-center"}>Start conversation?</TypographyH3>
                    </div>
                )}
                <InputGroup className={"rounded-lg shadow shadow-[#f7f5f3]"}>
                    <TextareaAutosize
                        id="chat-box"
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-16 w-full resize-none rounded-lg bg-white  px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder="Ask MUN GPT..."
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupButton className="ml-auto rounded-full" size="sm" variant="default"
                                          disabled={true}>
                            <span>Send</span>
                            <Sparkles/>
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    )
}

export default ChatInput