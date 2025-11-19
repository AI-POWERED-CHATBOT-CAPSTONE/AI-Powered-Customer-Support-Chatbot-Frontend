"use client"

import {TypographyH3, TypographySmall} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {useUser} from "@auth0/nextjs-auth0";

function GetStarted() {
    const router = useRouter();
    const { user } = useUser()

    const title = user && <TypographyH3 className={"text-white"}> Continue to dashboard </TypographyH3>

    return (
        <div className={"max-w-lg space-y-8"}>
            <div className={"mx-auto text-center"}>
                { title || <TypographyH3 className={"text-white"}> Login / Signup </TypographyH3> }
                <TypographySmall className={"text-muted-foreground"}> Tap the button below to get started with our MUN AI
                    agent </TypographySmall>
            </div>
            <div className={"w-full"}>
                <div className={"flex gap-2"}>
                    <Button onClick={() => router.push("/student/chat")} className={"flex-1 bg-[#ff5864]"}
                            variant={"default"}> Continue as student </Button>
                    <Button onClick={() => router.push("/admin/chat")} className={"flex-1"}
                            variant={"secondary"}> Continue as admin </Button>
                </div>
            </div>
        </div>
    )
}

export default GetStarted;