import {Schema, model, models} from 'mongoose';

export interface IUser {
    name: string;
    extId: string
    email: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    extId: { type: String, required: true },
    email: { type: String, required: true },
}, { timestamps: true });

// 3. Create a Model.
export const UserModel = models.User<IUser> || model<IUser>('User', userSchema);