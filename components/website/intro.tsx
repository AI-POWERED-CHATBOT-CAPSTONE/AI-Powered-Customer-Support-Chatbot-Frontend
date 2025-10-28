'use client'

import {TypographyP} from "@/components/ui/typography";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

function Intro() {
    return (
        <div className={"flex flex-col gap-5 "}>
            <DotLottieReact
                src="https://lottie.host/a9c36aca-befd-440e-8989-ab33000a5c89/4OeNVaIWMm.lottie"
                loop
                autoplay
            />
            <div className={"max-w-2xl mx-auto"}>
                <TypographyP className={"text-center"}>
                    At Memorial University of Newfoundland, one of the most significant challenges
                    identified is the delay and complexity students face when seeking financial information
                    such as tuition fees, charges, scholarships, and payment guidelines
                </TypographyP>
            </div>


        </div>
    )
}

export default Intro;