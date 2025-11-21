"use server"

import apiClient from "@/lib/api-client";
import {IMessage, IMessageDTO, MessageModel} from "@/database/models/message-model";
import {ChatModel, IChat, IChatDTO} from "@/database/models/chat-model";
import {ISource, ISourceDTO, SourceModel} from "@/database/models/source-model";
import {getObjectId} from "@/lib/utils";


export const addFilesAction = async( formData: FormData ) => {
    const res = await apiClient.post(`/upload/files`, formData).then((response) =>  response.data)

   // const { unique_id: uniqueId, filename, file_type: fileType } = res.data
    console.log(res.data)
    /*
    * [ file_type:"pdf", filename:"COMP 4754_6908 - ER to RM-c341c14d.pdf", unique_id:"c341c14d" ]
    *  */
    // save into source db
    await SourceModel.insertMany((res.data as {unique_id: string, file_name: string, file_type: string}[]).map((item) => {
        return {
            sourceId: item.unique_id,
            sourceName: item.file_name,
            sourceType: item.file_type,
        }
    }));

    return res;
};

// eg. https://www.mun.ca/finance/financial-services/cashiers-office-and-student-account-enquiries/frequently-asked-questions/
export const addWebsiteAction = async( link: string ) => {
    console.log("adding website ...")
    const res =  await apiClient.post(`/upload/website`, { link: link}).then((response) =>  response.data)

    const { unique_id: uniqueId } = res.data
    console.log("response data: uniqueId=", uniqueId, )
    // same link
    await SourceModel.create<ISource>({
        _id: getObjectId(),
        sourceId: uniqueId,
        sourceName: link,
        sourceType: "website",
    })
    return res;
}

export const deleteSourceAction = async( sourceId: string ) => {
    await SourceModel.deleteOne({ sourceId: sourceId })
    return { message: "Deleted Successfully" };
}


export const fetchSourcesAction = async (): Promise<ISourceDTO[]> => {
    const records = await SourceModel.find().sort({createdAt: -1}).lean<ISource[]>();
    return records.map( (record) => {
        return {
            ...record,
            _id: record._id.toString(),
        }
    })
};

export const fetchEscalatedConversationsAction = async( ): Promise<IChatDTO[]> => {
    const r = await ChatModel.find({ escalated: true }).sort({createdAt: -1}).lean<IChat[]>();
    return r.map((item) => {
        return {
            ...item,
            _id: item._id.toString(),
        }
    })
}

export const fetchEscalatedMessagesAction = async( chatId: string | null ): Promise<IMessageDTO[]> => {
    const r = await MessageModel.find({ chatId: getObjectId(chatId) }).lean<IMessage[]>();
    return r.map((item) => {
        return {
            ...item,
            _id: item._id.toString(),
            chatId: item.chatId?.toString(),
        }
    })
}

export const sendAdminMessageAction = async( payload: { chatId: string, adminId: string, message: string } ): Promise<void> => {

    const chatObjId = getObjectId(payload.chatId);
    await ChatModel.findById(payload.chatId).updateOne({ aiAllowedToRespond: false })

    // Student message
    await MessageModel.create({
        chatId: chatObjId,
        text: payload.message,
        senderId: payload.adminId,
        sentBy: "admin",
    })

}