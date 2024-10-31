import { model, Schema } from "mongoose";
import { TTag } from "./tag.interface";

const TagSchema = new Schema<TTag>(
    {
        name: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    },
);

export const TagModel = model<TTag>('Tag', TagSchema);
