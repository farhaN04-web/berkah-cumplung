import { Card } from "@/components/ui/card";
import ProfilePictureForm from "@/features/profile/form/ProfilePictureForm";

export default function ProfilePicture() {
  return (
    <Card className="w-full p-6 text-center lg:w-[300px]">
      <ProfilePictureForm />
    </Card>
  );
}
