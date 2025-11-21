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
import {ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import FileSelector, {FileSelectorImperatives} from "@/components/ui/file-selector";
import { useForm} from "react-hook-form";
import {axiosErrorHandler, DialogImperative} from "@/lib/utils";
import {useMutation} from "@tanstack/react-query";
import {addFilesAction} from "@/app/admin/chat/actions";
import {LoaderCircleIcon} from "lucide-react";
import {toast} from "sonner";
import {useDataSourcesStore} from "@/store/use-data-sources-store";
import {MAX_TOTAL_SIZE_BYTES, MAX_TOTAL_SIZE_MB} from "@/lib/constants";

type AddFilesFormInput = {
    files: File[],
}

export default forwardRef(function AddFilesDialog(_, ref: ForwardedRef<DialogImperative>) {

    const [open, setOpen] = useState<boolean>(false)
    const fileSelectorRef = useRef<FileSelectorImperatives|null>(null)
    const setEventCaller = useDataSourcesStore((state) => state.setEvent)

    useImperativeHandle(ref, () => {
        return {
            open() {
                setOpen(true)
                clearErrors()
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
            setEventCaller("files-added")
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
        watch
    } = useForm<AddFilesFormInput>()
    const files: File[] = watch("files");


    const checkFilesLimitExceeded = useCallback((files?: File[]) => {
        if (files) {
            const totalSize = files.reduce((acc, file) => acc + file.size, 0);
            console.log("TOTAL FILE SIZE_MB=", totalSize / (1024 * 1024))
            console.log("ALLOWABLE FILE SIZE_MB=", MAX_TOTAL_SIZE_MB)

            if (totalSize > MAX_TOTAL_SIZE_BYTES) {
                setError("files", { message: `File(s) should NOT exceed ${MAX_TOTAL_SIZE_MB} MB`,})
                return true
            }
        }
        return false
    }, [setError])

    const submitHandler = useCallback((data: AddFilesFormInput) => {
        console.log("handle submit called", data)
        // validations
        if (!data.files || data.files.length == 0) {
            setError("files", { message: "Files cannot be empty",})
            return
        }

        // Calculate total size
        const exceeded = checkFilesLimitExceeded(data.files)
        if (exceeded) {
            return;
        }

        // submit file
        console.log("ready to submit ...")
        const formData = new FormData();
        // formData.append("title", data.title);
        data.files.forEach((file) => {
            formData.append("files", file); // multer will collect them into an array
        });

        setEventCaller(undefined)
        mutate(formData)

    }, [checkFilesLimitExceeded, mutate, setError, setEventCaller])

    const onFilesChange = useCallback((files: File[]) => {
        console.log("files change: length=>", files.length)
        if (files.length > 0) { clearErrors()}

        setValue("files", files)

    }, [clearErrors, setValue])


    useEffect(() => {
        checkFilesLimitExceeded(files)
    }, [checkFilesLimitExceeded, files])

    return (

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <DialogHeader>
                        <DialogTitle>Add Files</DialogTitle>
                        <DialogDescription className={"pb-4"}>
                            <span className={"block"}>Upload files as source of information for MUN GPT AI agent</span>
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
                        <Button type="submit" disabled={isPending || Boolean(errors.files) }>
                            { isPending ? <span className={"inline-flex gap-2 items-center"}> <LoaderCircleIcon className={"animate-spin"} /> <span>Training in progress</span> </span>: <span>Save changes</span>}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
            </Dialog>
    )
})
