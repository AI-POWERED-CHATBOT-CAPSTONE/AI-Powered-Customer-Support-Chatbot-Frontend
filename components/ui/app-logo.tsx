import Image from "next/image";
import {TypographyH1, TypographyLarge} from "@/components/ui/typography";
import Link from "next/link";
import {cn} from "@/lib/utils";

export default function AppLogo({ size = 60, className, logoOnly = false, text, subHeadingClassName }: { size?: number, className?: string, logoOnly?: boolean, text?: string, subHeadingClassName?: string })  {

    const logo = <Image src={"/brand_logo.png"} alt={"app logo"} width={size} height={size} />

    if (logoOnly) {
        return <Link href={logoOnly ? "/" : "/"}>{logo}</Link>
    }

    return (
        <div>
            <div className={"flex gap-4 items-center"}>
                {logo}
                <TypographyH1 className={className}> {text || "MUN GPT"} </TypographyH1>
            </div>
            <TypographyLarge className={cn(`text-slate-500`, subHeadingClassName)}>
                Memorial University&#39;s <strong>first ☝️</strong> AI Chatbot
            </TypographyLarge>
        </div>
    )
}