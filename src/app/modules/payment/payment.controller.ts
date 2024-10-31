import { Types } from "mongoose";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";
import { TPayment } from "./payment.interface";

const createPayment = catchAsync(async (req, res) => {
    const { userId, amount, gateway } = req.body;

    const paymentPayload: TPayment = {
        userId: new Types.ObjectId(userId),
        amount: parseFloat(amount),
        gateway,
        status: "Pending"
    };

    const payment = await PaymentService.initiateVerificationPayment(paymentPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED, // Created status code
        message: 'Payment created successfully',
        data: payment,
    });
});

const getPaymentStatus = catchAsync(async (req, res) => {
    const { paymentId } = req.params;

    const paymentStatus = await PaymentService.getPaymentStatusFromDB(paymentId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Payment status retrieved successfully',
        data: paymentStatus,
    });
});

const processPaymentWebhook = catchAsync(async (req, res) => {
    const payload = req.body;

    const result = await PaymentService.handlePaymentWebhook(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Payment status retrieved successfully',
        data: result,
    });
});


export const PaymentControllers = {
    createPayment,
    getPaymentStatus,
    processPaymentWebhook

};