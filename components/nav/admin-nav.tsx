import AppLogo from "@/components/ui/app-logo";
import {TypographyH4, TypographySmall} from "@/components/ui/typography";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";

export default function AdminNav() {
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
                        <TypographySmall>Juliet Afolayan</TypographySmall>
                        <Link href={"/"} className={"text-foreground font-bold text-sm text-red-500"}> Logout </Link>
                    </div>
                </div>
            </div>
        </>
    )
}