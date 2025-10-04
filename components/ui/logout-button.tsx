import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

function LogoutButton({ className }: { className?: string }) {
    return (
        <Button variant={"ghost"} className={cn("text-background", className)}> Logout </Button>
    )
}

export default LogoutButton;