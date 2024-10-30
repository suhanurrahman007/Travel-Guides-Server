import { Types } from "mongoose";

export interface TReply {
    userId: Types.ObjectId; 
    postId: Types.ObjectId; 
    commentId: Types.ObjectId; 
    content: string;
    upVotes: number;
}
