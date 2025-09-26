import { prismaClient } from "./../config/db.config";
import {
  ChangePasswordDto,
  UpdateProfileImageDto,
  UpdateUserDto,
  UserResponseDto,
} from "./../dto/user.dto";
import { Password } from "./../utils/password.util";
import { ResponseError } from "./../utils/response.util";
import { UserSchema } from "./../validation/user.schema";
import { Validation } from "./../validation/validation";

export class UserService {
  /**
   * User Service for handling Admin, Mentor, and User Profiles Related Operations
   */
  // Get Profile Users
  static async getProfileUsers(userId: string): Promise<UserResponseDto> {
    const user = await prismaClient.users.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ResponseError("error", 404, "Users data not found!");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo ?? "",
      role: user.role,
    };
  }

  // Update Profile
  static async updateProfile(
    userId: string,
    data: UpdateUserDto
  ): Promise<UserResponseDto> {
    const validationData: UpdateUserDto = Validation.validate(
      UserSchema.UPDATE_PROFILE,
      data
    );

    const user = await prismaClient.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new ResponseError("error", 404, "Users data not found!");
    }

    const updateUser = await prismaClient.users.update({
      data: {
        name: validationData.name,
      },
      where: {
        id: userId,
      },
    });

    return {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      photo: updateUser.photo ?? "",
      role: updateUser.role,
    };
  }

  // Change Password
  static async changePassword(userId: string, data: ChangePasswordDto) {
    const validationData: ChangePasswordDto = Validation.validate(
      UserSchema.CHANGE_PASSWORD,
      data
    );

    const user = await prismaClient.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      throw new ResponseError("error", 404, "Users data not found!");
    }

    const isOldPasswordValid = await Password.comparePasswords(
      validationData.oldPassword,
      user.password
    );

    if (!isOldPasswordValid) {
      throw new ResponseError("error", 400, "Old password is incorrect!");
    }

    if (validationData.newPassword !== validationData.newConfirmPassword) {
      throw new ResponseError("error", 400, "New password does not match!");
    }

    const updateUser = await prismaClient.users.update({
      data: {
        password: await Password.hashPassword(validationData.newPassword),
      },
      where: {
        id: userId,
      },
    });

    return {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      photo: updateUser.photo ?? "",
      role: updateUser.role,
    };
  }

  // Update Profile Image
  static async updateProfileImage(userId: string, req: UpdateProfileImageDto) {
    const validationData: UpdateProfileImageDto = Validation.validate(
      UserSchema.UPDATE_PROFILE_IMAGE,
      req
    );

    const user = await prismaClient.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new ResponseError("error", 404, "Users data not found!");
    }

    const updateUser = await prismaClient.users.update({
      data: {
        photo: validationData.image,
      },
      where: {
        id: userId,
      },
    });

    return {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      photo: updateUser.photo ?? "",
      role: updateUser.role,
    };
  }

  // Manage Users
  static async getAllUsers() {}
  static async changeRoleUser() {}
  static async blockUser() {}
}
