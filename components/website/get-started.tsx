"use client"

import {TypographyH3, TypographySmall} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";

function GetStarted() {
    const router = useRouter();

    return (
        <div className={"max-w-lg space-y-8"}>
            <div className={"mx-auto text-center"}>
                <TypographyH3 className={"text-white"}> Unlock All Hidden Financial Information </TypographyH3>
                <TypographySmall className={"text-muted-foreground"}> Tap the button below to get started with our MUN AI
                    agent </TypographySmall>
            </div>
            <Button onClick={() => router.push("/dashboard/chat")} className={"w-full bg-[#ff5864]"} variant={"default"}> Get Started </Button>
        </div>
    )
}

export default GetStarted;