"use client"

import {TypographyH1} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {HomeIcon, LogOutIcon} from "lucide-react";
import {Suspense} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useUser} from "@auth0/nextjs-auth0";

function Page403() {

    return (
        <Suspense fallback={<p>loading...</p>}>
            <Page403View></Page403View>
        </Suspense>
    )

}

function Page403View() {
    const searchParams = useSearchParams();
    const { user } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/auth/logout");
    }

    const handleGoBack = () => {
        router.push("/");
    }

    return (
        <div className={"w-full h-screen grid place-content-center text-center"}>
            <div className={"flex flex-col gap-2 max-w-sm"}>
                <TypographyH1 className={"text-2xl"}>Unauthorized</TypographyH1>
                <p><strong className={"text-red-500"}>{user?.email}</strong> is NOT authorized to access the {searchParams.get("page")} page</p>
                <div className={"flex flex-row gap-2 my-4"}>
                    <Button className={"flex-1"} variant={"outline"} onClick={handleGoBack}><HomeIcon /> Go Back</Button>
                    <Button className={"flex-1"} onClick={handleLogout}><LogOutIcon /> Logout </Button>
                </div>
            </div>
        </div>
    );
}

export default Page403;