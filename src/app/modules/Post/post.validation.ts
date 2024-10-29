import { Types } from "mongoose";
import { z } from "zod";

const createPostValidationSchema = z.object({
    body: z.object({
        authorId: z.string().refine((id) => Types.ObjectId.isValid(id), {
            message: "Invalid ObjectId for authorId",
        }),
        title: z.string().min(1, "Title is required"),
        content: z.string().min(1, "Content cannot be empty"),
        images: z.array(z.string().url()).optional(),
        category: z.string().min(1, "Category is required"),
        tags: z.array(z.string()).optional(),
        premium: z.boolean(),
        upVotes: z.number().nonnegative().optional().default(0), // Optional, default 0
        comments: z.array(z.string()).optional(),
    }),
});

export const PostValidationSchema = {
    createPostValidationSchema,
};