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
import {ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState} from "react";
import FileSelector, {FileSelectorImperatives} from "@/components/ui/file-selector";
import { useForm} from "react-hook-form";
import {axiosErrorHandler, DialogImperative} from "@/lib/utils";
import {useMutation} from "@tanstack/react-query";
import {addFilesAction} from "@/app/admin/chat/actions";
import {LoaderCircleIcon} from "lucide-react";
import {toast} from "sonner";

type AddFilesFormInput = {
    files: File[],
}

export default forwardRef(function AddFilesDialog(_, ref: ForwardedRef<DialogImperative>) {

    const [open, setOpen] = useState<boolean>(false)
    const fileSelectorRef = useRef<FileSelectorImperatives|null>(null)

    useImperativeHandle(ref, () => {
        return {
            open() {
                setOpen(true)
            },
        }
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['add-files'],
        mutationFn: (formData: FormData) => addFilesAction(formData),
        onSuccess: async (res) => {
            console.log("response:", res)
            fileSelectorRef?.current?.clear()
            toast(res.message)
            setOpen(false)
        },
        onError: axiosErrorHandler
    })

    const {
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
        clearErrors,
    } = useForm<AddFilesFormInput>()

    const submitHandler = useCallback((data: AddFilesFormInput) => {
        console.log("handle submit called", data)
        // validations
        if (!data.files || data.files.length == 0) {
            setError("files", { message: "Files cannot be empty",})
            return
        }

        // submit file
        console.log("ready to submit ...")
        const formData = new FormData();
        // formData.append("title", data.title);
        data.files.forEach((file) => {
            formData.append("files", file); // multer will collect them into an array
        });
        mutate(formData)

    }, [mutate, setError])

    const onFilesChange = useCallback((files: File[]) => {
        console.log("files change: length=>", files.length)
        if (files.length > 0) { clearErrors()}
        setValue("files", files)
    }, [clearErrors, setValue])


    return (

            <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <DialogHeader>
                        <DialogTitle>Add PDF Files</DialogTitle>
                        <DialogDescription className={"pb-4"}>
                            <span className={"block"}>Upload PDF files as source of information for MUN GPT AI agent</span>
                            {errors.files && <span className={"block text-red-500"}>{errors.files?.message}</span> }
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <FileSelector ref={fileSelectorRef} onChange={onFilesChange}/>
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
