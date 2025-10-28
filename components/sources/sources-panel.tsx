"use client"
import {FileIcon, LinkIcon} from "lucide-react";;
import SourceList from "@/components/sources/source-list";
import {TypographySmall} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import AddFilesDialog from "@/components/sources/add-files-dialog";
import {useRef} from "react";
import AddWebsiteDialog from "@/components/sources/add-website-dialog";
import {DialogImperative, queryClient} from "@/lib/utils";
import {QueryClientProvider} from "@tanstack/react-query";

export default function SourcesPanel() {

    const addFilesRef = useRef<DialogImperative>(null);
    const addWebsiteRef = useRef<DialogImperative>(null);

    const handleAddFilesClick = () => {
        addFilesRef?.current?.open()
    }
    const handleAddWebsiteClick = () => {
        addWebsiteRef?.current?.open()
    }

    return (
        <QueryClientProvider client={queryClient} >
            <div className={"bg-white h-full w-full rounded-lg space-y-8"}>
            <div className={"py-2 px-4 flex items-center justify-between border-b"}>
                <TypographySmall className={"font-bold text-red-500"}>Sources</TypographySmall>
                <div className={"flex divide-x"}>
                    <div>
                        <Button onClick={handleAddFilesClick} variant={"ghost"} ><FileIcon size={18} /> Add Files</Button>
                        <AddFilesDialog ref={addFilesRef} />
                    </div>
                    <div>
                        <Button onClick={handleAddWebsiteClick} variant={"ghost"} ><LinkIcon size={18} /> Add Websites</Button>
                        <AddWebsiteDialog ref={addWebsiteRef} />
                    </div>
                </div>
            </div>
            <div className={"px-4"}>
                <SourceList/>
            </div>

        </div>
        </QueryClientProvider>
    )
}