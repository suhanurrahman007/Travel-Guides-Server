import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { ProfileRoutes } from '../modules/Profile/profile.route';
import { MeilisearchRoutes } from '../modules/Meilisearch/meilisearch.routes';
import { PostRoutes } from '../modules/Post/post.route';
import { CommentRoutes } from '../modules/comments/comment.route';
import { ReplyRoutes } from '../modules/reply/reply.route';
import { PaymentRoutes } from '../modules/payment/payment.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { TagRoutes } from '../modules/tag/tag.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/search-items',
    route: MeilisearchRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/reply',
    route: ReplyRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/tag',
    route: TagRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
