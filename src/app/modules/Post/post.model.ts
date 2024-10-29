import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
    {
        authorId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User', // Assuming you have a User model
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        images: {
            type: [String], // Array of strings for image URLs
            default: [],
        },
        category: {
            type: String,
            required: true,
        },
        tags: {
            type: [String], // Array of strings for tags
            default: [],
        },
        premium: {
            type: Boolean,
            required: true,
            default: false, // Default value for premium
        },
        upVotes: {
            type: Number,
            required: true,
            default: 0, // Default number of upvotes
        },
        comments: {
            type: [Schema.Types.ObjectId],
            ref: 'Comment', // Assuming you have a Comment model
            default: [],
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    },
);

// Pre-save middleware to check if the post already exists
postSchema.pre('save', async function (next) {
    const isPostExists = await PostModel.findOne({
        title: this.title,
        authorId: this.authorId,
    });

    if (isPostExists) {
        throw new Error('Post with this title already exists for this author!');
    }
    next();
});

// Create the Post model
export const PostModel = model<TPost>('Post', postSchema);