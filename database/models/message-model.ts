import {Schema, model, Types, models} from 'mongoose';

interface IMessage {
    chatId?: Types.ObjectId,
    text: string;
}

const messageSchema = new Schema<IMessage>({
    chatId: { type: Types.ObjectId, ref: 'Chat', required: true },
    text: String,
}, { timestamps: true });

export const MessageModel = models.User<IMessage> ||   model<IMessage>('Message', messageSchema)