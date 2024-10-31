import { QueryBuilder } from "../../builder/QueryBuilder";
import { TagSearchableFields } from "./tag.constant";
import { TTag } from "./tag.interface";
import { TagModel } from "./tag.model";

const createTagIntoDB = async (payload: TTag) => {
    const Tag = await TagModel.create(payload);
    return Tag;
};

const getAllTagFromDB = async (query: Record<string, unknown>) => {
    const TagQuery = new QueryBuilder(
        TagModel.find(),
        query
    )
        .filter()
        .search(TagSearchableFields)
        .sort()
        .paginate()
        .fields();

    const result = await TagQuery.modelQuery;

    return result;
};

export const TagServices = {
    createTagIntoDB,
    getAllTagFromDB,
};
