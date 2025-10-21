import {CircleQuestionMarkIcon} from "lucide-react";
import PanelHead from "@/components/ui/panel-head";
import Link from "next/link";

export default function TicketsPanel() {
    return (
        <div className={"bg-white h-full w-full rounded-lg"}>
            <PanelHead title={"Escalated conversations"} icon={CircleQuestionMarkIcon}/>
            <div className={"h-full overflow-y-auto px-6"}>
                <p className={"text-sm text-muted-foreground py-8"}>Chats</p>
                <ul className={"list-none flex flex-col"}>
                    <li>
                        <Link href={"/student/chat"}>
                            <p className={"py-2 text-sm"}>Icon data fix</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/student/chat"}>
                            <p className={"py-2 text-sm"}>Questions and answers</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/student/chat"}>
                            <p className={"py-2 text-sm truncate w-full"}>AI recommendation guideline and all related
                                code</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}