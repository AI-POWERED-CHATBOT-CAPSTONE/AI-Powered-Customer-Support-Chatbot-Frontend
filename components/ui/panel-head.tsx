import {TypographySmall} from "@/components/ui/typography";
import {LucideIcon} from "lucide-react";

type Props = {
    title: string;
    icon: LucideIcon
}

export default function PanelHead({ title , icon } : Props) {
    const Icon = icon
    return (
        <div className={"py-4 px-4 flex items-center justify-between border-b"}>
            <TypographySmall className={"font-bold"}>{title}</TypographySmall>
            <Icon size={16}></Icon>
        </div>
    )
}