"use server"

import {IMessage, IMessageDTO, MessageModel} from "@/database/models/message-model";
import {ChatModel, IChat, IChatDTO} from "@/database/models/chat-model";
import {firstWords, getObjectId} from "@/lib/utils";
import {ai} from "@/lib/constants";
import apiClient from "@/lib/api-client";

export const sendMessage = async( payload: { chatId: string, studentId: string, message: string, isFirst: boolean} ) => {

    // Create the chat if this is the first conversation
    const chat = await createChat({
        title: firstWords(payload.message, 10),
        studentId: payload.studentId,
        chatId: payload.chatId
    })
    if (!chat) {
        throw new Error(`Unable to create chat`);
    }

    // Student message
    await MessageModel.create({
        chatId: chat._id,
        text: payload.message,
        senderId: payload.studentId,
        sentBy: "student",
    })

    // if chat has been excalated, no need for ai response
    if (!chat.aiAllowedToRespond) {
        return
    }

    // forward the query to the AI model
    const res = await apiClient.post(`/chat/query`, { message: payload.message }).then((response) =>  response.data)
    const { ai: aiResponseMessage, escalate } = res.data

    let aiText = aiResponseMessage
    let escalationTriggered = false
    if (escalate == "yes") {
        aiText = "Sorry, I don't have enough information to answer this question. I have notified a support agent to assit with your question"
        escalationTriggered = true
        await ChatModel.findById(chat._id).updateOne({ escalated: true })
    }

    //     AI response message
    await MessageModel.create({
        chatId: chat._id,
        text: aiText,
        senderId: ai.extId,
        sentBy: "ai",
        causedEscalation: escalationTriggered
    })

}


const createChat = async(payload: { chatId: string, studentId: string, title: string }): Promise<IChat|null> => {
    const _id = getObjectId(payload.chatId)
    let existingChat = await ChatModel.findById<IChat>(_id);
    console.log("existingChat:", existingChat)
    if (!existingChat) {
        console.log("studentId:", payload.studentId);
         existingChat = await ChatModel.create<IChat>({
             _id: _id,
             title: payload.title,
             studentId: payload.studentId,
             hasMessages: true,
             aiAllowedToRespond: true,
         })
    }
    return existingChat
}

export const fetchChatMessages = async( chatId: string | null ): Promise<IMessageDTO[]> => {
    console.log("fetching messages ....", chatId)
    if (!chatId) { return [] }
    const records = await MessageModel.find({ chatId: getObjectId(chatId) }).lean<IMessage[]>();
    return records.map((record) => {
        return {
            ...record,
            _id: record._id.toString(),
            chatId: record.chatId?.toString(),
        }
    })

}

export const fetchChatsConversations = async(studentId: string | null ): Promise<IChatDTO[]> => {
    console.log("fetching chat conversations ....", studentId)
    const records = await ChatModel.find({ studentId: studentId }).sort({createdAt: -1}).lean<IChat[]>();
    return records.map((record) => {
        return {
            ...record,
            _id: record._id.toString(),
        }
    })
}