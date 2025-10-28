import apiClient from "@/lib/api-client";


export const addFilesAction = async( formData: FormData ) => {
    return await apiClient.post(`/upload/files`, formData).then((response) =>  response.data)
};

