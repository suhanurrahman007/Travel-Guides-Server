/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";
import { TPayment, TPaymentStatus } from "./payment.interface";
import { PaymentModel } from "./payment.model";

const initiateVerificationPayment = async (payload: TPayment) => {
    const payment = await PaymentModel.create(payload);
    return payment;
};


const getPaymentStatusFromDB = async (paymentId: string) => {
    if (!Types.ObjectId.isValid(paymentId)) {
        throw new Error("Invalid payment ID");
    }

    const payment = await PaymentModel.findById(paymentId).select('status');
    if (!payment) {
        throw new Error("Payment not found");
    }

    return payment;
};

const handlePaymentWebhook = async (payload: any) => {
    const { paymentId, status } = payload;

    if (!paymentId || !status) {
        throw new Error("Invalid webhook payload");
    }

    // Validate and map the status to your TPaymentStatus type
    const validStatuses: TPaymentStatus[] = ["Pending", "Completed", "Failed"];
    if (!validStatuses.includes(status)) {
        throw new Error("Invalid status received in webhook");
    }

    // Update payment status in the database
    const updatedPayment = await PaymentModel.findByIdAndUpdate(
        paymentId,
        { status },
        { new: true }
    );

    if (!updatedPayment) {
        throw new Error("Payment record not found");
    }

    return updatedPayment;
};
export const PaymentService = {
    initiateVerificationPayment,
    getPaymentStatusFromDB,
    handlePaymentWebhook
}