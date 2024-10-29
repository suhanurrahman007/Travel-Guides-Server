import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TImageFiles } from "../../interfaces/image.interface";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";

const createPost = catchAsync(async (req, res) => {
    if (!req.files) {
        throw new AppError(400, 'Please upload an image');
    }

    const Post = await PostServices.createPostIntoDB(
        req.body,
        req.files as TImageFiles
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post created successfully',
        data: Post,
    });
});

export const PostControllers = {
    createPost,
};
