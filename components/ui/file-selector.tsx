"use client"
import {ChangeEvent, forwardRef, Ref, useEffect, useImperativeHandle, useState} from "react";
import { X } from "lucide-react";

export type FileSelectorImperatives = {
    clear: () => void
}

type Props = {
    onChange?: (value: File[]) => void,
    title?: string
    accept?: string
    ref?: Ref<FileSelectorImperatives>
    multiple?: boolean
}

const FileSelector = ({ title, onChange, accept = "pdf/*", multiple = true }: Props, ref: Ref<FileSelectorImperatives>) =>  {

    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if(onChange) {
            onChange(files)
        }
    }, [files, onChange]);

    useImperativeHandle(ref, () => {
        return {
            clear() {
                setFiles([]);
            }
        }
    })

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        if(!multiple) {
            setFiles([...selectedFiles]);
            return
        }
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full">

            <div className="w-full mb-5">
                <label
                    className="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded cursor-pointer "
                >
                    <div className="mb-3 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
                            <path
                                d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589"
                                stroke="#4F46E5"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <h2 className="text-center text-gray-400 text-xs font-normal mb-1">
                        PDFs smaller than 15MB
                    </h2>
                    <h4 className="text-center text-gray-900 text-sm font-medium">
                        {title || 'Click to browse your files' }
                    </h4>
                    <input
                        type="file"
                        className="hidden"
                        multiple={multiple}
                        accept={accept}
                        onChange={handleFileChange}
                    />
                </label>
            </div>

            {/* Uploaded File List */}
            <div className="space-y-4 mb-4">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border border-gray-300 rounded-md p-3"
                    >
                        <p className="text-sm text-gray-700 truncate">{file.name}</p>
                        <X
                            className="w-4 h-4 text-gray-600 cursor-pointer"
                            onClick={() => removeFile(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default forwardRef(FileSelector)

