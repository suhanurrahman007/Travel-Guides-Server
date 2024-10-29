import { TImageFiles } from "../../interfaces/image.interface";
// import { addDocumentToIndex } from "../../utils/meilisearch";
import { TPost } from "./post.interface";
import { PostModel } from "./post.model";

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {
    const { postImages } = images;
    payload.images = postImages.map((image) => image.path);

    const result = await PostModel.create(payload);

    // await addDocumentToIndex(result, 'Posts');
    return result;
};

export const PostServices = {
    createPostIntoDB,
 
};