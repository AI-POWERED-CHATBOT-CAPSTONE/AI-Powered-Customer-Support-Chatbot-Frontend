import AppLogo from "@/components/ui/app-logo";
import LogoutButton from "@/components/ui/logout-button";

function PreAuthNav() {
    return (
        <div className={"fixed w-full py-4"}>
            <div className={"flex flex-row justify-between items-center container mx-auto"}>
                <AppLogo />
                <LogoutButton />
            </div>
        </div>
    )
}

export default PreAuthNav