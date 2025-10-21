import {Button} from "@/components/ui/button";
import {FileIcon, GlobeIcon} from "lucide-react";

export default function SourceActions() {
    return (
        <div className={"flex items-center gap-2 w-full"}>
            <Button variant={"default"} size={"sm"} className={"flex-1"}> <FileIcon size={18} /></Button>
            <Button variant={"secondary"} size={"icon-sm"} className={"flex-1"}> <GlobeIcon /> Add Website links</Button>
        </div>
    )
}