import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { PaymentValidationSchema } from './payment.validation';
import { PaymentControllers } from './payment.controller';

const router = express.Router();

router.post(
    '/verification',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    validateRequest(PaymentValidationSchema.createPaymentValidationSchema),
    PaymentControllers.createPayment
);

router.get('/:paymentId', PaymentControllers.getPaymentStatus);

router.post('/webhook', PaymentControllers.processPaymentWebhook);

export const PaymentRoutes = router;
