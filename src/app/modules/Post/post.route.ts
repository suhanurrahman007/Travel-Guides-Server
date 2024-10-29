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

auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  router.get('/',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN),
    PostControllers.getAllPosts);

router.get('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), PostControllers.getPost);

router.get('/category/:categoryName', PostControllers.getPostCategory);
router.get('/tag/:tagName', PostControllers.getPostTag);
router.get('/', PostControllers.getPostsByPremiumStatus);
router.post('/:postId/upvote', auth(USER_ROLE.USER, USER_ROLE.ADMIN), PostControllers.upvotePost);
router.post('/:postId/downvote', auth(USER_ROLE.USER, USER_ROLE.ADMIN), PostControllers.downvotePost);


router.put(
  '/:id',
  auth(USER_ROLE.USER, USER_ROLE.ADMIN),
  validateRequest(PostValidationSchema.updatePostValidationSchema),
  PostControllers.updatePost
);

router.delete('/:id', auth(USER_ROLE.USER, USER_ROLE.ADMIN), PostControllers.deletePost);

export const PostRoutes = router;
