import { httpClient } from "@/lib/http-client";
import { ApiResponse } from "@/types";
import {
  ProfileResponseDTO,
  UpdatePersonalInformationDTO,
  UpdatePasswordDTO,
  UpdateProfilePictureDTO,
} from "@/server/dto/profile.dto";

class ProfileService {
  async getProfile() {
    const response =
      await httpClient.get<
        ApiResponse<ProfileResponseDTO, undefined, undefined>
      >("/user/profile");

    return response;
  }

  async updateProfilePicture(request: UpdateProfilePictureDTO) {
    const formData = new FormData();
    formData.append("image", request.image);

    const response = await httpClient.put<
      ApiResponse<ProfileResponseDTO, undefined, undefined>
    >("/user/profile/image", formData);

    return response;
  }

  async updatePersonalInformation(request: UpdatePersonalInformationDTO) {
    const response = await httpClient.put<
      ApiResponse<ProfileResponseDTO, undefined, undefined>
    >("/user/profile", { name: request.name });

    return response;
  }

  async updatePassword(request: UpdatePasswordDTO) {
    const response = await httpClient.put<
      ApiResponse<ProfileResponseDTO, undefined, undefined>
    >("/user/change-password", request);

    return response;
  }
}

export const profileService = new ProfileService();
