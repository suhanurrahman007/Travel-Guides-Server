import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>(
    {
        content: {
            type: String,
            required: true,
        },
        upVotes: {
            type: Number,
            default: 0,
        },
        userId: {
            type: Schema.Types.ObjectId, // Single ObjectId, not an array
            ref: 'User', // Assuming 'User' is the correct reference
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId, // Single ObjectId, not an array
            ref: 'Post', // Assuming 'Post' is the correct reference
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    },
);

export const CommentModel = model<TComment>('Comment', commentSchema);
