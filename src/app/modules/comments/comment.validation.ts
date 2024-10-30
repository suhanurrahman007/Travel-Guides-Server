import { z } from "zod";

const createCommentValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Content cannot be empty"),
    }),
});

const updateCommentValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Content cannot be empty").optional(),
    }),
});

export const CommentValidationSchema = {
    createCommentValidationSchema,
    updateCommentValidationSchema
};