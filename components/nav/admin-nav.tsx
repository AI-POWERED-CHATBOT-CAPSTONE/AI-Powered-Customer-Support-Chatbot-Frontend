"use client"

import AppLogo from "@/components/ui/app-logo";
import {TypographyH4, TypographySmall} from "@/components/ui/typography";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {useUser} from "@auth0/nextjs-auth0";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function AdminNav() {
    const { user } = useUser()
    const router = useRouter()

    const handleLogout = () => {
        router.push("/auth/logout")
    }

    return (
        <>
            <div className={"fixed w-full py-2"}>
                <div className={"flex flex-row justify-between items-center container mx-auto"}>
                    <div className={"flex gap-4 items-center"}>
                        <AppLogo size={30} className={"text-sm"} logoOnly={true}/>
                        <TypographyH4>Admin Support</TypographyH4>
                    </div>
                    <div className={"inline-flex gap-4 items-center"}>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <TypographySmall>{ user?.email || '' } </TypographySmall>
                        <Button onClick={handleLogout} variant={"ghost"} className={"font-bold text-sm text-red-500"}> Logout </Button>
                    </div>
                </div>
            </div>
        </>
    )
}