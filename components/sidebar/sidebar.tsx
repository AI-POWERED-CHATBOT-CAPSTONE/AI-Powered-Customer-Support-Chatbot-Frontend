import SidebarHeader from "@/components/sidebar/sidebar-header";
import SidebarFooter from "@/components/sidebar/sidebar-footer";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className={"flex flex-col h-full"}>
            <SidebarHeader />
            <div className={"h-full overflow-y-auto px-6"}>
                <p className={"text-sm text-muted-foreground py-8"}>Chats</p>
                <ul className={"list-none flex flex-col"}>
                    <li>
                        <Link href={"/dashboard/chat"} >
                            <p className={"py-2 text-sm"}>Icon data fix</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/dashboard/chat"} >
                            <p className={"py-2 text-sm"}>Questions and answers</p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/dashboard/chat"} >
                            <p className={"py-2 text-sm truncate w-full"}>AI recommendation guideline and all related code</p>
                        </Link>
                    </li>
                </ul>
            </div>
            <SidebarFooter />
        </div>
    )
}