import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Types } from "mongoose";
import { TReply } from "./reply.interface";
import { ReplyServices } from "./reply.service";

const createReply = catchAsync(async (req, res) => {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const userId = req.user._id; // Assuming userId is stored in req.user after authentication

    const ReplyPayload: TReply = {
        content,
        userId,
        commentId: new Types.ObjectId(commentId),
        postId: new Types.ObjectId(postId), // Convert postId to ObjectId
        upVotes: 0, // Default to 0
    };

    const Reply = await ReplyServices.createReplyIntoDB(ReplyPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED, // Created status code
        message: 'Reply created successfully',
        data: Reply,
    });
});


const getAllReply = catchAsync(async (req, res) => {
    const Reply = await ReplyServices.getAllReplyFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Reply retrieved successfully',
        data: Reply,
    });
});

const getReply = catchAsync(async (req, res) => {
    const ReplyId = req.params.id;
    const Reply = await ReplyServices.getReplyFromDB(ReplyId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Reply retrieved successfully',
        data: Reply,
    });
});

const updateReply = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id
    const updatedReply = await ReplyServices.updateReplyInDB(id, req.body, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Reply updated successfully',
        data: updatedReply,
    });
});

const deleteReply = catchAsync(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id
    await ReplyServices.deleteReplyFromDB(id, userId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Reply deleted successfully',
        data: null,
    });
});

export const ReplyControllers = {
    createReply,
    getAllReply,
    getReply,
    updateReply,
    deleteReply,
};
