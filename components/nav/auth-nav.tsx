import AppLogo from "@/components/ui/app-logo";
import LogoutButton from "@/components/ui/logout-button";

function AuthNav() {
    return (
        <div className={"fixed w-full py-2 bg-red-50"}>
            <div className={"flex flex-row justify-between items-center container mx-auto"}>
                <AppLogo />
                <LogoutButton className={"text-foreground"} />
            </div>
        </div>
    )
}

export default AuthNav