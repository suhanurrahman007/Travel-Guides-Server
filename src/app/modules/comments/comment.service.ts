import httpStatus from "http-status";
import { QueryBuilder } from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { PostModel } from "../Post/post.model";
// import { commentSearchableFields } from "./comment.constant";
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";
import { commentSearchableFields } from "./comment.constant";
import { addDocumentToIndex } from "../../utils/meilisearch";

const createCommentIntoDB = async (payload: TComment) => {
    const post = await PostModel.findById(payload.postId);

    if (!post) {
        throw new AppError(httpStatus.NOT_FOUND, "Post not found");
    }

    const comment = await CommentModel.create(payload);

    if (!post.comments) {
        post.comments = [];
    }

    post.comments.push(comment._id);
    const updatedPost = await post.save();

    await addDocumentToIndex(updatedPost, 'Posts');
    
    return comment;
};

const getAllCommentsFromDB = async (query: Record<string, unknown>) => {
    const commentQuery = new QueryBuilder(
        CommentModel.find().populate('userId postId'),
        query
    )
        .filter()
        .search(commentSearchableFields)
        .sort()
        .paginate()
        .fields();

    const result = await commentQuery.modelQuery;

    return result;
};

const getCommentFromDB = async (CommentId: string) => {

    const result = await CommentModel.findById(CommentId)
        .populate('userId postId')
    return result;
};

const updateCommentInDB = async (commentId: string, payload: TComment, userId: string) => {
    const existingComment = await CommentModel.findById(commentId)

    if (!existingComment || existingComment.userId.toString() !== userId.toString()) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorized to update this comment");
    }
    const result = await CommentModel.findByIdAndUpdate(commentId, payload, { new: true });
    return result;
};

const deleteCommentFromDB = async (commentId: string, userId: string) => {
    const existingComment = await CommentModel.findById(commentId)

    if (!existingComment || existingComment.userId.toString() !== userId.toString()) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not authorized to update this comment");
    }
    const result = await CommentModel.findByIdAndDelete(commentId);
    return result;
};

export const CommentServices = {
    createCommentIntoDB,
    getAllCommentsFromDB,
    getCommentFromDB,
    updateCommentInDB,
    deleteCommentFromDB,
};
