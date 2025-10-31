"use client"

import {useMutation} from "@tanstack/react-query";
import {deleteSourceAction} from "@/app/admin/chat/actions";
import {toast} from "sonner";
import {axiosErrorHandler} from "@/lib/utils";
import {useDataSourcesStore} from "@/store/use-data-sources-store";

export const useDeleteSource = () => {

    const setEventCaller = useDataSourcesStore((state) => state.setEvent)

    const { mutate, isPending } = useMutation({
        mutationKey: ['delete-files'],
        mutationFn: (sourceId: string) => deleteSourceAction(sourceId),
        onSuccess: async (res) => {
            console.log("response:", res)
            toast(res.message)
            setEventCaller("source-deleted")
        },
        onError: axiosErrorHandler
    })

    const onDeleteHandler = (sourceId: string) => {
        setEventCaller(undefined)
        mutate(sourceId)
    }

    return {
        onDelete: onDeleteHandler,
        deleting: isPending
    }
}