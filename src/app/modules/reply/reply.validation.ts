import { z } from "zod";

const createReplyValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Content cannot be empty"),
    }),
});

const updateReplyValidationSchema = z.object({
    body: z.object({
        content: z.string().min(1, "Content cannot be empty").optional(),
    }),
});

export const ReplyValidationSchema = {
    createReplyValidationSchema,
    updateReplyValidationSchema
};