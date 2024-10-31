import { z } from "zod";

const createTagValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Content cannot be empty"),
    }),
});


export const TagValidationSchema = {
    createTagValidationSchema,
};