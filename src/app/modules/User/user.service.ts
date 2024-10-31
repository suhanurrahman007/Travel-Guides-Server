import { QueryBuilder } from '../../builder/QueryBuilder';
import { UserSearchableFields } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const users = new QueryBuilder(User.find(), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(UserSearchableFields);

  const result = await users.modelQuery;

  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  return user;
};

// const verifyUserProfile = async (userId: Types.ObjectId) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }


//   // Update user's verification status
//   user.status = "Pending";
//   const updatedUser = await user.save();

//   return updatedUser;
// };
export const UserServices = {
  createUser,
  getAllUsersFromDB,
  getSingleUserFromDB,
  // verifyUserProfile,
};
