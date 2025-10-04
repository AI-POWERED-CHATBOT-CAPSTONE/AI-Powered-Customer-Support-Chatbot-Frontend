'use client'

import {TypographyP} from "@/components/ui/typography";
import {DotLottieReact} from "@lottiefiles/dotlottie-react";

function Intro() {
    return (
        <div className={"flex flex-col gap-5 "}>
            <DotLottieReact
                src="https://lottie.host/8356ee4e-382d-4a5f-8c0b-58e76f9cc05f/VYUpTLmp2f.lottie"
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