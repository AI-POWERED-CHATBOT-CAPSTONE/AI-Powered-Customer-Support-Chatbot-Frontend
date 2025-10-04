import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {TypographyP} from "@/components/ui/typography";
import {MoreHorizontalIcon} from "lucide-react";

export default  function SidebarFooter() {
    return (
        <div className={"flex flex-row gap-4 justify-between p-4 py-4 border-t"}>
            <div className={"flex gap-3"}>
                <Avatar className={""}>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <TypographyP>Daniel Kwakye</TypographyP>
                </div>
            </div>
            <MoreHorizontalIcon />
        </div>
    )
}