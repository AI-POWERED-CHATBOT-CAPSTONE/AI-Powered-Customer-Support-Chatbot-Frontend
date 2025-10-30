import {Schema, model, models} from 'mongoose';

export interface ISource {
    sourceId: string
    sourceName?: string,
    sourceType?: string,
}

const sourceSchema = new Schema<ISource>({
    sourceId: { type: String, required: true },
    sourceName: String,
    sourceType: String,
}, { timestamps: true });

export const SourceModel = models.User<ISource> ||  model<ISource>('Source', sourceSchema)