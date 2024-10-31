import { z } from "zod";

const createCategoryValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Content cannot be empty"),
        description: z.string().min(1, "Content cannot be empty"),

    }),
});


export const CategoryValidationSchema = {
    createCategoryValidationSchema,
};