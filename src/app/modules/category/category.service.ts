import { QueryBuilder } from "../../builder/QueryBuilder";
import { CategorySearchableFields } from "./category.constant";
import { TCategory } from "./category.interface";
import { CategoryModel } from "./category.model";

const createCategoryIntoDB = async (payload: TCategory) => {
    const Category = await CategoryModel.create(payload);
    return Category;
};

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
    const CategoryQuery = new QueryBuilder(
        CategoryModel.find(),
        query
    )
        .filter()
        .search(CategorySearchableFields)
        .sort()
        .paginate()
        .fields();

    const result = await CategoryQuery.modelQuery;

    return result;
};

export const CategoryServices = {
    createCategoryIntoDB,
    getAllCategoryFromDB,
};
