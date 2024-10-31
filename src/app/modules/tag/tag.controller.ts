import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TagServices } from "./tag.service";

const createTag = catchAsync(async (req, res) => {
    const Tag = await TagServices.createTagIntoDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED, // Created status code
        message: 'Tag created successfully',
        data: Tag,
    });
});


const getAllTag = catchAsync(async (req, res) => {
    const Tag = await TagServices.getAllTagFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Tag retrieved successfully',
        data: Tag,
    });
});


export const TagControllers = {
    createTag,
    getAllTag,
};
