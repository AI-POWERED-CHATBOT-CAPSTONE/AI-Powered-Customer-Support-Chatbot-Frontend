import {Schema, model, models, Types} from 'mongoose';

export interface IChat {
    _id: Types.ObjectId;
    title: string
    escalated: boolean
    hasMessages: boolean
    studentId: string
}

export interface IChatDTO {
    _id: string;
    title: string
    escalated: boolean
    hasMessages: boolean
    studentId: string
}

const chatSchema = new Schema<IChat>({
    _id: Schema.Types.ObjectId,
    title: { type: String, required: true },
    escalated: { type: Boolean, default: false },
    hasMessages: { type: Boolean, default: false },
    studentId: { type: String, required: true },

}, { timestamps: true });

export const ChatModel = models.Chat<IChat> ||  model<IChat>('Chat', chatSchema);