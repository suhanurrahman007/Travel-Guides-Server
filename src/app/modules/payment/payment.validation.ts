import { z } from "zod";

const createPaymentValidationSchema = z.object({
    body: z.object({
        amount: z.number().positive("Amount must be a positive number"),
    }),
});

const updatePaymentValidationSchema = z.object({
    body: z.object({
        amount: z.number().positive("Amount must be a positive number").optional(),
    }),
});

export const PaymentValidationSchema = {
    createPaymentValidationSchema,
    updatePaymentValidationSchema
};