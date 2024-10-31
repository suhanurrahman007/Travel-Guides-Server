import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidationSchema } from './category.validation';
import { CategoryControllers } from './category.controller';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN), // Ensure only authenticated users can Category
    validateRequest(CategoryValidationSchema.createCategoryValidationSchema), // Validate request body
    CategoryControllers.createCategory // Controller method to handle the request
);


router.get('/', auth(USER_ROLE.USER, USER_ROLE.ADMIN),
        CategoryControllers.getAllCategory);

export const CategoryRoutes = router;
