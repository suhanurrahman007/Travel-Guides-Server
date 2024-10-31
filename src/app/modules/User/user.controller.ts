import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const userRegister = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Created Successfully',
    data: user,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users Retrieved Successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const user = await UserServices.getSingleUserFromDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Retrieved Successfully',
    data: user,
  });
});


// const requestVerification = catchAsync(async (req, res) => {
//   const userId  = req.params.id;
//   const requesterId = req.user._id; 

//   console.log(userId, requesterId)
//   if (!requesterId || requesterId.toString() !== userId) {
//     return sendResponse(res, {
//       success: false,
//       statusCode: httpStatus.FORBIDDEN,
//       message: "You are not authorized to verify this profile",
//     });
//   }
//   const verificationResult = await UserServices.verifyUserProfile(new Types.ObjectId(userId));

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'User Created Successfully',
//     data: verificationResult,
//   });
// });

export const UserControllers = {
  getSingleUser,
  userRegister,
  getAllUsers,
  // requestVerification
};
