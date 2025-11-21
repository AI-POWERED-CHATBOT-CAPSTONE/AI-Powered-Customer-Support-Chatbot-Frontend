"use client"

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {useUser} from "@auth0/nextjs-auth0";
import {SeparatorVertical} from "lucide-react";

function LogoutButton({ className }: { className?: string }) {
    const router = useRouter();
    const { user } = useUser()

    const handleLogout = () => {
        router.push('/auth/logout');
    }

    const handleLogin = () => {
        router.push('/auth/login');
    }

    if (!user) {
        return <Button onClick={handleLogin} variant={"ghost"} className={cn("text-background", className)}> Login </Button>
    }

    return (
        <div className={"flex flex-row items-center"}>
            <Button onClick={handleLogout} variant={"ghost"} className={cn("text-background", className)}> Account: { user.email } </Button>
            <SeparatorVertical className={"text-white"} />
            <Button onClick={handleLogout} variant={"ghost"} className={cn("text-red-500", className)}> Logout </Button>
        </div>
    )
}

export default LogoutButton;