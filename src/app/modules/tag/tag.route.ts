import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { TagValidationSchema } from './tag.validation';
import { TagControllers } from './tag.controller';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN), // Ensure only authenticated users can Tag
    validateRequest(TagValidationSchema.createTagValidationSchema), // Validate request body
    TagControllers.createTag // Controller method to handle the request
);


router.get('/', auth(USER_ROLE.USER, USER_ROLE.ADMIN),
        TagControllers.getAllTag);

export const TagRoutes = router;
