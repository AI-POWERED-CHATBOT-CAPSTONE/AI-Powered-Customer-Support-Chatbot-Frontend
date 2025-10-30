import apiClient from "@/lib/api-client";
import {Types} from "mongoose";
import {IMessage} from "@/database/models/message-model";
import {IChat} from "@/database/models/chat-model";
import {ISource} from "@/database/models/source-model";


export const addFilesAction = async( formData: FormData ) => {
    return await apiClient.post(`/upload/files`, formData).then((response) =>  response.data)
};

export const addWebsiteAction = async( link: string ) => {
    return await apiClient.post(`/upload/website`, {
        link: link,
    }).then((response) =>  response.data)
}


export const fetchSourcesAction = async( ): Promise<ISource[]> => {
    return []
}

export const fetchEscalatedConversationsAction = async( ): Promise<IChat[]> => {
    return []
}

export const fetchMessagesAction = async( chatId: Types.ObjectId ): Promise<IMessage[]> => {
    return []
}

export const sendMessagesAction = async( chatId: Types.ObjectId ): Promise<void> => {

}