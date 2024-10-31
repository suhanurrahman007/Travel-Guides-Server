import { Types } from "mongoose";

export type TPaymentStatus = "Pending" | "Completed" | "Failed";

export interface TPayment {
    userId: Types.ObjectId;
    amount: number;
    gateway: string;
    status: TPaymentStatus;
}
