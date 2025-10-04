import Sidebar from "@/components/sidebar/sidebar";
import ChatInitializer from "@/components/chat-panel/chat-initializer";
import Link from "next/link";
import {EditIcon} from "lucide-react";
import {TypographySmall} from "@/components/ui/typography";

function ChatPage() {
    return (
        <div className={"flex flex-row h-full"}>
            <div className={"w-[15%] h-full bg-[#f7f5f3]"}>
                <Sidebar />
            </div>
            <div className={"w-[85%] h-full"}>
                <div className={"fixed w-full py-6 px-6"}>
                    <Link href="/dashboard/chat" className={"flex gap-2 items-center"}>
                        <EditIcon size={16} />
                        <div><TypographySmall> New Chat</TypographySmall></div>
                    </Link>
                </div>
                <ChatInitializer />
            </div>
        </div>
    )
}

export default ChatPage;