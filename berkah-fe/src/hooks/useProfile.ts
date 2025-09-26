import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/server/api/profile.service";
import { ResponseError } from "@/types";
import {
  UpdatePasswordDTO,
  UpdatePersonalInformationDTO,
  UpdateProfilePictureDTO,
} from "@/server/dto/profile.dto";
import toast from "react-hot-toast";
import { useSession } from "@/hooks/useSession";
import { QueryKeys } from "@/lib/query-keys";

export function useProfile() {
  const query = useQuery({
    queryKey: QueryKeys.User.Profile,
    queryFn: profileService.getProfile,
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    errorMessage: query.error
      ? (query.error as ResponseError).response?.message ||
        (query.error as Error).message ||
        "Gagal memuat profil"
      : undefined,
  };
}

export function useUpdateProfilePicture() {
  const { signIn, session } = useSession();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: UpdateProfilePictureDTO) => {
      return toast.promise(profileService.updateProfilePicture(request), {
        loading: "Memperbarui profil...",
        success: (response) =>
          response.message || "Profil berhasil diperbarui!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal memperbarui profil"
          );
        },
      });
    },
    onSuccess: async (response) => {
      if (response.status === "success" && session) {
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            photo: response.data.photo,
          },
        };
        await signIn(updatedSession);
        await qc.invalidateQueries({
          queryKey: QueryKeys.User.Profile,
          type: "all",
        });
      }
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal memperbarui profil"
      : undefined,
  };
}

export function useUpdatePersonalInformation() {
  const { signIn, session } = useSession();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (request: UpdatePersonalInformationDTO) => {
      return toast.promise(profileService.updatePersonalInformation(request), {
        loading: "Memperbarui informasi pribadi...",
        success: (response) =>
          response.message || "Informasi pribadi berhasil diperbarui!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal memperbarui informasi pribadi"
          );
        },
      });
    },
    onSuccess: async (response) => {
      if (response.status === "success" && session) {
        const updatedSession = {
          ...session,
          user: {
            ...session.user,
            name: response.data.name,
          },
        };
        await signIn(updatedSession);
        await qc.invalidateQueries({
          queryKey: QueryKeys.User.Profile,
        });
      }
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error,
  };
}

export function useUpdatePassword() {
  const { signOut } = useSession();

  const mutation = useMutation({
    mutationFn: (request: UpdatePasswordDTO) => {
      return toast.promise(profileService.updatePassword(request), {
        loading: "Memperbarui kata sandi...",
        success: (response) =>
          response.message || "Kata sandi berhasil diperbarui!",
        error: (error: ResponseError) => {
          return (
            error.response?.message ||
            error.message ||
            "Gagal memperbarui kata sandi"
          );
        },
      });
    },
    onSuccess: async (response) => {
      if (response.status === "success") {
        await signOut();
      }
    },
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    errorMessage: mutation.error
      ? (mutation.error as ResponseError).response?.message ||
        (mutation.error as Error).message ||
        "Gagal memperbarui kata sandi"
      : undefined,
  };
}
