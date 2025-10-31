"use client"

import {Item, ItemActions, ItemContent, ItemDescription, ItemTitle} from "@/components/ui/item";
import {timeAgo} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ISourceDTO} from "@/database/models/source-model";
import {useDeleteSource} from "@/hooks/use-delete-source";
import {LoaderCircleIcon} from "lucide-react";

export function SourceListItem({ source }: { source: ISourceDTO }) {

    const { onDelete, deleting } = useDeleteSource()

    return (
        <Item className={"px-0"}>
            <ItemContent>
                <ItemTitle>created { timeAgo(source.createdAt) }</ItemTitle>
                <ItemDescription>
                    { source.sourceName }
                </ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button variant="outline" size="sm" disabled={deleting} onClick={ () => onDelete(source.sourceId) }>
                    { deleting ? <LoaderCircleIcon className={"animate-spin"} /> : <span>Delete</span>}
                </Button>
            </ItemActions>
        </Item>
    )
}