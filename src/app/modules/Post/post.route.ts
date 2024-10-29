import express from 'express';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middlewares/bodyParser';
import validateImageFileRequest from '../../middlewares/validateImageFileRequest';
import validateRequest from '../../middlewares/validateRequest';
import { ImageFilesArrayZodSchema } from '../../zod/image.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { PostValidationSchema } from './post.validation';
import { PostControllers } from './post.controller';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    multerUpload.fields([{ name: 'postImages' }]),
    validateImageFileRequest(ImageFilesArrayZodSchema),
    parseBody,
    validateRequest(PostValidationSchema.createPostValidationSchema),
    PostControllers.createPost
);

router.get('/', PostControllers.getAllPosts);

router.get('/:id', PostControllers.getPost);

router.put(
  '/:id',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(PostValidationSchema.updatePostValidationSchema),
  PostControllers.updatePost
);

router.delete('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), PostControllers.deletePost);

export const PostRoutes = router;
