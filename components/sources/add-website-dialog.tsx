"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {ForwardedRef, forwardRef, useCallback, useImperativeHandle, useState} from "react";
import { useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {axiosErrorHandler, DialogImperative} from "@/lib/utils";
import {useMutation} from "@tanstack/react-query";
import {addFilesAction, addWebsiteAction} from "@/app/admin/chat/actions";
import {toast} from "sonner";
import {LoaderCircleIcon} from "lucide-react";
import {useDataSourcesStore} from "@/store/use-data-sources-store";

type AddWebsiteFormInput = {
    link: string,
}

export default forwardRef(function AddWebsiteDialog(_, ref: ForwardedRef<DialogImperative>) {

    const [open, setOpen] = useState<boolean>(false)
    const setEventCaller = useDataSourcesStore((state) => state.setEvent)

    useImperativeHandle(ref, () => {
        return {
            open() {
                setOpen(true)
            },
        }
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['add-website'],
        mutationFn: (link: string) => addWebsiteAction(link),
        onSuccess: async (res) => {
            console.log("response:", res)
            reset()
            toast(res.message)
            setEventCaller("website-added")
            setOpen(false)
        },
        onError: axiosErrorHandler
    })

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<AddWebsiteFormInput>()

    const submitHandler = useCallback((data: AddWebsiteFormInput) => {
        console.log("handle submit called", data)
        // submit file
        console.log("ready to submit ...")
        setEventCaller(undefined)
        mutate(data.link)

    }, [mutate, setEventCaller])


    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <DialogHeader>
                        <DialogTitle>Add Website Link</DialogTitle>
                        <DialogDescription className={"pb-4"}>
                            <span className={"block"}>Add website link as information source for AI agent</span>
                            {errors.link && <span className={"block text-red-500"}>{errors.link?.message}</span> }
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 pb-8">
                        <div className="grid gap-3">
                            <Label htmlFor="link-1">Website url</Label>
                            <Input id="link-1" { ...register("link", { required: "This field cannot be empty" }) } />
                            { errors.link && (<div>{errors.link.message}</div>)}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type={"button"} variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            { isPending ? <LoaderCircleIcon className={"animate-spin"} /> : <span>Save changes</span>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
})