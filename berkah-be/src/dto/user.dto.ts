export interface UserResponseDto {
  id?: string;
  name: string;
  email: string;
  photo?: string;
  role?: string;
}

export interface UpdateUserDto {
  name: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  newConfirmPassword: string;
}

export interface UpdateProfileImageDto {
  image: string;
}
