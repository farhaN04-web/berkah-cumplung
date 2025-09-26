import { z } from "zod";

export class UserSchema {
  static readonly UPDATE_PROFILE = z.object({
    name: z.string().min(1).max(100).optional(),
  });

  static readonly CHANGE_PASSWORD = z.object({
    oldPassword: z.string().min(6).max(100),
    newPassword: z.string().min(6).max(100),
    newConfirmPassword: z.string().min(6).max(100),
  });

  static readonly UPDATE_PROFILE_IMAGE = z.object({
    image: z.string().min(1),
  });
}
