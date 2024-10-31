import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    },
);

export const CategoryModel = model<TCategory>('Category', categorySchema);
