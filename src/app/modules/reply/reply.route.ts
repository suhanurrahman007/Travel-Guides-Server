import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { ReplyValidationSchema } from './reply.validation';
import { ReplyControllers } from './reply.controller';

const router = express.Router();

router.post(
    '/:postId/:commentId',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN), // Ensure only authenticated users can comment
    validateRequest(ReplyValidationSchema.createReplyValidationSchema), // Validate request body
    ReplyControllers.createReply // Controller method to handle the request
);

auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    router.get('/',
        ReplyControllers.getAllReply);

router.get('/:id', ReplyControllers.getReply);

router.put(
    '/:id',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    validateRequest(ReplyValidationSchema.createReplyValidationSchema),
    ReplyControllers.updateReply
);

router.delete('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), ReplyControllers.deleteReply);

export const ReplyRoutes = router;
