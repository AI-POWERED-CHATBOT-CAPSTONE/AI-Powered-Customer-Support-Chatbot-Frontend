import {Schema, model, models, Types} from 'mongoose';

export interface ISource {
    _id: Types.ObjectId;
    sourceId: string
    sourceName?: string,
    sourceType?: string,
    createdAt?: Date,
}

export interface ISourceDTO {
    _id: string
    sourceId: string
    sourceName?: string,
    sourceType?: string,
    createdAt?: Date,
}

const sourceSchema = new Schema<ISource>({
    sourceId: { type: String, required: true },
    sourceName: String,
    sourceType: String,
}, { timestamps: true });

export const SourceModel = models.Source<ISource> ||  model<ISource>('Source', sourceSchema)