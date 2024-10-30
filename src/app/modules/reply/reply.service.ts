import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { PostModel } from "../Post/post.model";
import { TReply } from "./reply.interface";
import { ReplyModel } from "./reply.model";
import { CommentModel } from "../comments/comment.model";
import { replySearchableFields } from "./reply.constant";

const createReplyIntoDB = async (payload: TReply) => {
    const postExists = await PostModel.exists({ _id: payload.postId });
    if (!postExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const commentExists = await CommentModel.exists({ _id: payload.commentId });
    if (!commentExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Comment not found");
    }

    // Create the Reply
    const result = await ReplyModel.create(payload);
    return result;
};

const getAllReplyFromDB = async (query: Record<string, unknown>) => {
    const ReplyQuery = new QueryBuilder(
        ReplyModel.find().populate('userId'),
        query
    )
        .filter()
        .search(replySearchableFields)
        .sort()
        .paginate()
        .fields();

    const result = await ReplyQuery.modelQuery;

    return result;
};

const getReplyFromDB = async (ReplyId: string) => {

    const result = await ReplyModel.findById(ReplyId)
        .populate('userId')
    return result;
};

const updateReplyInDB = async (ReplyId: string, payload: TReply, userId: string) => {
    const existingReply = await ReplyModel.findById(ReplyId)

    if (!existingReply || existingReply.userId.toString() !== userId.toString()) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorized to update this Reply");
    }
    const result = await ReplyModel.findByIdAndUpdate(ReplyId, payload, { new: true });
    return result;
};

const deleteReplyFromDB = async (ReplyId: string, userId: string) => {
    const existingReply = await ReplyModel.findById(ReplyId)

    if (!existingReply || existingReply.userId.toString() !== userId.toString()) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorized to update this Reply");
    }
    const result = await ReplyModel.findByIdAndDelete(ReplyId);
    return result;
};

export const ReplyServices = {
    createReplyIntoDB,
    getAllReplyFromDB,
    getReplyFromDB,
    updateReplyInDB,
    deleteReplyFromDB,
};
