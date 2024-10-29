import { Types } from "mongoose";

export interface TPost {
    authorId: Types.ObjectId; // The admin user's ObjectId
    title: string;
    content: string;
    images?: string[]; // Optional array for post images
    category: string; // E.g., Adventure, Beach, Exploration
    tags?: string[]; // Optional array for keyword tags
    premium: boolean; // Indicates if the post is premium content
    upVotes?: number; // Optional; defaults to 0 if omitted
    comments?: Types.ObjectId[]; // Optional array of comment ObjectIds
}
