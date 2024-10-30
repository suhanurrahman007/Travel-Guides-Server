import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";
import { Types } from "mongoose";
import { TComment } from "./comment.interface";

const createComment = catchAsync(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user._id; // Assuming userId is stored in req.user after authentication

    const commentPayload: TComment = {
        content,
        userId,
        postId: new Types.ObjectId(postId), // Convert postId to ObjectId
        upVotes: 0, // Default to 0
    };

    const comment = await CommentServices.createCommentIntoDB(commentPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED, // Created status code
        message: 'Comment created successfully',
        data: comment,
    });
});


const getAllComments = catchAsync(async (req, res) => {
    const comment = await CommentServices.getAllCommentsFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment retrieved successfully',
        data: comment,
    });
});

const getComment = catchAsync(async (req, res) => {
    const commentId = req.params.id;
    const comment = await CommentServices.getCommentFromDB(commentId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment retrieved successfully',
        data: comment,
    });
});

const updateComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id
    const updatedComment = await CommentServices.updateCommentInDB(id, req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment updated successfully',
        data: updatedComment,
    });
});

const deleteComment = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id
    await CommentServices.deleteCommentFromDB(id, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Comment deleted successfully',
        data: null,
    });
});

export const CommentControllers = {
    createComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment,
};
