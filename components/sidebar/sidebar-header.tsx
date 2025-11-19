import AppLogo from "@/components/ui/app-logo";
import Link from "next/link";

export default function SidebarHeader() {
    return (
        <Link href={"/"} className={"py-4 px-4"}>
            <AppLogo size={40} className={"text-2xl"} subHeadingClassName={"text-sm"} />
        </Link>
    )
}