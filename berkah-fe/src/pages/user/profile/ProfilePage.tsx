import { FullScreenLoading } from "@/components/layout";
import ChangePassword from "@/features/profile/components/ChangePassword";
import PersonalInformation from "@/features/profile/components/PersonalInformation";
import ProfilePicture from "@/features/profile/components/ProfilePicture";
import { useSession } from "@/hooks/useSession";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { session, sessionLoading } = useSession();

  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate("/login");
    }
  }, [session, sessionLoading, navigate]);

  if (sessionLoading) {
    return <FullScreenLoading />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto space-y-10 px-4 py-10">
      <h1 className="mb-10 text-2xl font-bold text-amber-800 md:text-[32px]">
        Profile Saya
      </h1>

      <div className="flex flex-col gap-6 lg:flex-row">
        <ProfilePicture />

        {/* Right Section */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Informasi Pribadi */}
          <PersonalInformation />

          {/* Ubah Kata Sandi */}
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
