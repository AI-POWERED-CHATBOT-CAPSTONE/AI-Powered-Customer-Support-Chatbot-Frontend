"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {TypographyP, TypographySmall} from "@/components/ui/typography";
import {useUser} from "@auth0/nextjs-auth0";
import {useRouter} from "next/navigation";
import {LogOutIcon} from "lucide-react";

export default  function SidebarFooter() {

    const { user } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/auth/logout");
    }

    return (
        <div className={"flex flex-row gap-4 justify-between p-4 py-4 border-t cursor-pointer"} onClick={handleLogout}>
            <div className={"flex gap-3"}>
                <Avatar className={""}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <TypographyP>{ user?.email }</TypographyP>
                    <TypographySmall className={"flex gap-2 text-red-500 font-bold"}><LogOutIcon size={12}/> Logout</TypographySmall>
                </div>
            </div>
        </div>
    )
}