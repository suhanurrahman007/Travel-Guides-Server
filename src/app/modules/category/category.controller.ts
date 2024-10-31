import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
    const Category = await CategoryServices.createCategoryIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED, // Created status code
        message: 'Category created successfully',
        data: Category,
    });
});


const getAllCategory = catchAsync(async (req, res) => {
    const Category = await CategoryServices.getAllCategoryFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Category retrieved successfully',
        data: Category,
    });
});


export const CategoryControllers = {
    createCategory,
    getAllCategory,
};
