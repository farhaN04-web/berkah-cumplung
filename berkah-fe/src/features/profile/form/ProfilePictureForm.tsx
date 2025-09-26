import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useUpdateProfilePicture } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { profilePictureSchema, ProfilePictureSchema } from "@/schemas/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ProfilePictureForm() {
  const { session } = useSession();

  const form = useForm<ProfilePictureSchema>({
    resolver: zodResolver(profilePictureSchema),
    defaultValues: {
      image: undefined,
    },
  });

  const { mutate: updateProfilePicture, isLoading } = useUpdateProfilePicture();

  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  useEffect(() => {
    if (files[0]?.file instanceof File) {
      form.setValue("image", files[0].file);
    }
  }, [files, form]);

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  const onUploadPicture = (values: ProfilePictureSchema) => {
    updateProfilePicture(values, {
      onSuccess: () => {
        form.reset();
        removeFile(files[0]?.id);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onUploadPicture)}>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center gap-4">
            <div
              className="relative flex size-40 shrink-0 items-center justify-center overflow-hidden rounded-full border border-input"
              aria-label={
                previewUrl ? "Preview of uploaded image" : "Default user avatar"
              }
            >
              {previewUrl ? (
                <img
                  className="size-40 object-cover"
                  src={previewUrl}
                  alt="Preview of uploaded image"
                />
              ) : (
                <div aria-hidden="true">
                  <Avatar className="h-40 w-40 shadow-lg ring-2 ring-white">
                    <AvatarImage
                      src={
                        session?.user.photo
                          ? `${import.meta.env.VITE_API_BASE_URL}/${session?.user?.photo}`
                          : "https://github.com/shadcn.png"
                      }
                      alt={session?.user?.name ?? "User"}
                      className="cursor-pointer object-cover"
                    />
                    <AvatarFallback>
                      {session?.user?.name![0]!.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
            <div className="relative inline-block w-full space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <input
                      {...getInputProps()}
                      className="sr-only"
                      aria-label="Upload image file"
                      tabIndex={-1}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type={fileName ? "submit" : "button"}
                onClick={(e) => {
                  if (!fileName) {
                    e.preventDefault();
                    openFileDialog();
                  }
                }}
                aria-haspopup="dialog"
                className="w-full bg-amber-800 text-lg hover:bg-amber-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : fileName ? (
                  "Simpan"
                ) : (
                  "Pilih Foto"
                )}
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="inline-flex w-full flex-wrap gap-2 text-xs">
              <p className="truncate text-muted-foreground" aria-live="polite">
                {fileName}
              </p>{" "}
              <button
                onClick={() => {
                  removeFile(files[0]?.id);
                  form.reset();
                }}
                className="font-medium text-destructive hover:underline"
                aria-label={`Remove ${fileName}`}
              >
                Hapus
              </button>
            </div>
          )}
          <div>
            <p className="mb-2 text-base font-semibold text-black md:text-xl">
              {session?.user.name}
            </p>
            <p className="text-sm text-neutral_500 md:text-base">
              {session?.user.email}
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}
