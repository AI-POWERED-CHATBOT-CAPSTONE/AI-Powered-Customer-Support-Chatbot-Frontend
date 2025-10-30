import {Schema, model, models} from 'mongoose';

export interface IChat {
    title: string;
    escalated: boolean
}

const chatSchema = new Schema<IChat>({
    title: { type: String, required: true },
    escalated: { type: Boolean, default: false },
}, { timestamps: true });

export const ChatModel = models.User<IChat> ||    model<IChat>('Chat', chatSchema);