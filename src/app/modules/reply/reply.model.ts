import { model, Schema } from "mongoose";
import { TReply } from "./reply.interface";

const replySchema = new Schema<TReply>(
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
        commentId: {
            type: Schema.Types.ObjectId, // Single ObjectId, not an array
            ref: 'Comment', // Assuming 'Post' is the correct reference
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    },
);

export const ReplyModel = model<TReply>('Reply', replySchema);
