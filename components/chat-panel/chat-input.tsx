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
import {useState} from "react";
type Props = {
    onSend?: (text: string) => void;
    hasLabel?: boolean,
    placeholder?: string
}
function ChatInput({ hasLabel = true, onSend, placeholder = "Ask MUN GPT..." }: Props ) {

    const [text, setText] = useState("");

    const onClickHandler = () => {
        if (onSend) onSend(text);
        setText("");
    }

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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        id="chat-box"
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-16 w-full resize-none rounded-lg bg-white  px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder={placeholder}
                        onKeyDown={(e) => {
                            // Enter without Shift → SEND
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault(); // stops newline
                                if (text.trim().length > 0) {
                                    onClickHandler();
                                }
                            }
                        }}
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupButton className="ml-auto rounded-full" size="sm" variant="default"
                                          onClick={onClickHandler}
                                          disabled={text.length === 0} >
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