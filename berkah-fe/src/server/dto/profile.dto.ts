export type UpdateProfilePictureDTO = {
  image: File;
};

export type ProfileResponseDTO = {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
};

export type UpdatePersonalInformationDTO = {
  name: string;
};

export type UpdatePasswordDTO = {
  oldPassword: string;
  newPassword: string;
  newConfirmPassword: string;
};
