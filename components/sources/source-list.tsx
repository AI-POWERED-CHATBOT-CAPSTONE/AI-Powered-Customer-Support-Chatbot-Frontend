"use client"

import {useMutation, useQuery} from "@tanstack/react-query";
import {TypographySmall} from "@/components/ui/typography";
import {addWebsiteAction, fetchSourcesAction} from "@/app/admin/chat/actions";
import {axiosErrorHandler, queryClient, timeAgo} from "@/lib/utils";
import {ISource, ISourceDTO} from "@/database/models/source-model";
import {useDataSourcesStore} from "@/store/use-data-sources-store";
import {useEffect} from "react";
import {toast} from "sonner";
import {SourceListItem} from "@/components/sources/source-list-item";
import ListLoader from "@/components/ui/list-loader";

export default function SourceList() {

    // const dataSourcesEvent: string | undefined = useDataSourcesStore((state) => state.event)


    useEffect(() => {

        const unsubscribe = useDataSourcesStore.subscribe(
            (state) => state.event,       // 👈 listen only to this field
            (event) => {
                if(event != undefined && ["files-added", "website-added", "source-deleted"].includes(event)) {
                    refreshItems()
                }
            }
        );


        return () => {
            unsubscribe()
        };

    }, []);


    const { isPending, data } = useQuery<ISourceDTO[]>({
        queryKey: ["fetch-data-sources"],
        queryFn: () => fetchSourcesAction(),
    })

    const refreshItems = () => {
        queryClient.invalidateQueries({ queryKey: ['fetch-data-sources' ] }).catch((error) => {
            console.log("error syncing records: ", error.message)
        });
    }

    if(isPending) {
        return (
            <ListLoader>Fetching data sources...</ListLoader>
        )
    }

    return (
        <div className={"h-full overflow-y-auto"}>
            <TypographySmall className={"text-slate-500"}>Uploaded Files / Links ({ data?.length || "0"})</TypographySmall>
            <div className={"h-full overflow-y-auto"}>
                <ul className={"flex flex-col list-none py-2"}>
                    {data && data.map((source: ISourceDTO) => {
                        return (
                            <SourceListItem source={source} key={source.sourceId}></SourceListItem>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}