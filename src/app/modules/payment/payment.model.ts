import { model, Schema } from "mongoose";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        amount: { type: Number, required: true },
        gateway: { type: String, default: "Stripe" },
        status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" }
    },
    { timestamps: true }
);

export const PaymentModel = model<TPayment>("Payment", paymentSchema);