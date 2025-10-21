import Image from "next/image";
import {TypographyH1} from "@/components/ui/typography";
import Link from "next/link";

export default function AppLogo({ size = 60, className, logoOnly = false, text }: { size?: number, className?: string, logoOnly?: boolean, text?: string })  {

    const logo = <Image src={"/brand_logo.png"} alt={"app logo"} width={size} height={size} />

    if (logoOnly) {
        return <Link href={logoOnly ? "/" : "/"}>{logo}</Link>
    }

    return (
        <div className={"flex gap-4 items-center"}>
            {logo}
            <TypographyH1 className={className}> {text || "MUN GPT"} </TypographyH1>
        </div>
    )
}