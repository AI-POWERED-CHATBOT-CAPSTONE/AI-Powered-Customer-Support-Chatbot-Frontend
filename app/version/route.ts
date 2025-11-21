import {NextResponse} from "next/server";

export const GET = () => {
    // current app version
    return NextResponse.json({
        version: "1.0.1",
    })
}