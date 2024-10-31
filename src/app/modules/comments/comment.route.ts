import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { CommentValidationSchema } from './comment.validation';
import validateRequest from '../../middlewares/validateRequest';
import { CommentControllers } from './comment.controller';

const router = express.Router();

router.post(
    '/:postId',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN), // Ensure only authenticated users can comment
    validateRequest(CommentValidationSchema.createCommentValidationSchema), // Validate request body
    CommentControllers.createComment // Controller method to handle the request
);


router.get('/', auth(USER_ROLE.USER, USER_ROLE.ADMIN),
        CommentControllers.getAllComments);

router.get('/:id', CommentControllers.getComment);

router.put(
    '/:id',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    validateRequest(CommentValidationSchema.updateCommentValidationSchema),
    CommentControllers.updateComment
);

router.delete('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), CommentControllers.deleteComment);

export const CommentRoutes = router;
