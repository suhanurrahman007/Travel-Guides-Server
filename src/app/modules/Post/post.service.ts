import { QueryBuilder } from "../../builder/QueryBuilder";
import { TImageFiles } from "../../interfaces/image.interface";
import { addDocumentToIndex, deleteDocumentFromIndex } from "../../utils/meilisearch";
import { PostSearchableFields } from "./post.constant";
import { TPost } from "./post.interface";
import { PostModel } from "./post.model";

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {
    const { postImages } = images;
    payload.images = postImages.map((image) => image.path);

    const result = await PostModel.create(payload);

    await addDocumentToIndex(result, 'Posts');
    return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
    const PostQuery = new QueryBuilder(
        PostModel.find().populate('authorId'),
        query
    )
        .filter()
        .search(PostSearchableFields)
        .sort()
        .paginate()
        .fields();

    const result = await PostQuery.modelQuery;

    return result;
};

const getPostsByPremiumStatusFromDB = async (premium: boolean) => {
    const result = await PostModel.find({ premium: premium })
        .populate('authorId')
    return result;
};

const getPostFromDB = async (postId: string) => {

    const result = await PostModel.findById(postId)
        .populate('authorId')
    return result;
};

const getPostCategoryFromDB = async(categoryName: string) => {
    const result = await PostModel.find({ category: categoryName })
    return result;
};

const getPostTagFromDB = async (tagName: string) => {
    const result = await PostModel.find({ tags: tagName })
    return result;
};

const updatePostInDB = async (postId: string, payload: TPost) => {
    const result = await PostModel.findByIdAndUpdate(postId, payload, { new: true });
    if (result) {
        await addDocumentToIndex(result, 'Posts');
    } else {
        throw new Error(`Post with ID ${postId} not found.`);
    }
    return result;
};


const deletePostFromDB = async (postId: string) => {
    const result = await PostModel.findByIdAndDelete(postId);
    const deletedPostId = result?._id;
    if (deletedPostId) {
        await deleteDocumentFromIndex('Posts', deletedPostId.toString());
    }
    return result;
};

export const PostServices = {
    createPostIntoDB,
    getAllPostsFromDB,
    getPostFromDB,
    updatePostInDB,
    deletePostFromDB,
    getPostCategoryFromDB,
    getPostTagFromDB,
    getPostsByPremiumStatusFromDB,
};

