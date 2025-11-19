import {Schema, model, Types, models} from 'mongoose';

export interface IMessage {
    _id: Types.ObjectId;
    chatId?: Types.ObjectId,
    text: string;
    senderId: string,
    sentBy: string,
    causedEscalation: boolean
}

export interface IMessageDTO {
    _id: string,
    chatId?: string,
    text: string;
    senderId: string,
    sentBy: string,
    causedEscalation: boolean,
}

const messageSchema = new Schema<IMessage>({
    chatId: { type: Schema.Types.ObjectId, required: false },
    text: String,
    senderId: String,
    sentBy: String,
    causedEscalation: { type: Boolean, default: false },
}, { timestamps: true });

export const MessageModel = models.Message<IMessage> || model<IMessage>('Message', messageSchema)