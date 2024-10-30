import { Types } from "mongoose";

export interface TComment {
    userId: Types.ObjectId; 
    postId: Types.ObjectId; 
    content: string;
    upVotes: number;
}
