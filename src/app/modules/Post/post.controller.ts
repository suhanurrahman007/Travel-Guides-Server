import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TImageFiles } from "../../interfaces/image.interface";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import { PostModel } from "./post.model";

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


const getAllPosts = catchAsync(async (req, res) => {
    const post = await PostServices.getAllPostsFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post retrieved successfully',
        data: post,
    });
});

const getPost = catchAsync(async (req, res) => {
    const postId = req.params.id;
    const post = await PostServices.getPostFromDB(postId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post retrieved successfully',
        data: post,
    });
});


const getPostCategory = catchAsync(async (req, res) => {
    const postCategory = req.params.categoryName;
    const post = await PostServices.getPostCategoryFromDB(postCategory);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post Category retrieved successfully',
        data: post,
    });
});

const getPostTag = catchAsync(async (req, res) => {
    const postTag = req.params.tagName;
    const post = await PostServices.getPostTagFromDB(postTag);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post Tag retrieved successfully',
        data: post,
    });
});

const getPostsByPremiumStatus = catchAsync(async (req, res) => {
    const premiumQuery = req.query.premium;
    const premium = premiumQuery === 'true';

    const posts = await PostServices.getPostsByPremiumStatusFromDB(premium);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `Posts with premium status ${premium ? 'enabled' : 'disabled'} retrieved successfully`,
        data: posts,
    });
});


const upvotePost = catchAsync(async (req, res) => {
    const { postId } = req.params;

    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $inc: { upVotes: 1 } }, // Increment the upVotes by 1
        { new: true } // Return the updated document
    ).populate('authorId');

    if (!updatedPost) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Post not found',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post upVoted successfully',
        data: updatedPost,
    });
});

const downvotePost = catchAsync(async (req, res) => {
    const { postId } = req.params;

    const updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        { $inc: { upVotes: -1 } }, // Increment the upVotes by 1
        { new: true } // Return the updated document
    ).populate('authorId');

    if (!updatedPost) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: 'Post not found',
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post upVoted successfully',
        data: updatedPost,
    });
});


const updatePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updatedPost = await PostServices.updatePostInDB(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post updated successfully',
        data: updatedPost,
    });
});

const deletePost = catchAsync(async (req, res) => {
    const { id } = req.params;
    await PostServices.deletePostFromDB(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Post deleted successfully',
        data: null,
    });
});

export const PostControllers = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost,
    getPostCategory,
    getPostTag,
    getPostsByPremiumStatus,
    upvotePost,
    downvotePost
};
