"use client"
import { useEffect, useState } from "react";
import ProfileComponent from "@/components/profile-component";
import { getUserProfile } from "@/api/api";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";

const ProfilePage = () => {
  const { Doctor, addDoctor } = useProfileStore((state) => state);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setIsProfile = useAuthStore((state) => state.setIsProfile);
  const setRole = useAuthStore((state) => state.setRole);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserProfile();
  
        if (response.success && response.data) {
          if (response.data?.role === "doctor" && response.data?.userId) {
            setLoading(false);
            setIsProfile(true);
            setRole("doctor");
            router.push("/dashboard");
            return;
          } else {
            // Check if doctor profile already exists
            if (response.data.doctor) {
              addDoctor(response.data.doctor);
            } else {
              // If no doctor profile, pass null or undefined to indicate new doctor
              addDoctor(null);
              toast.success(
                "Please complete your doctor profile to access the application features!",
              );
            }
          }
        } else {
          console.error(response.data);
          toast.error("Failed to load profile.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);
  

  if (loading) {
    return (
      <div className="flex h-dvh w-full justify-center items-center gap-4">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div className="h-dvh bg-gray-100 flex items-center justify-center p-4">
      <ProfileComponent doctor={Doctor} /> 
    </div>
  );
};

export default ProfilePage;
