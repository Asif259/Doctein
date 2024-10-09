"use client";

import { useEffect, useState } from "react";
import ProfileComponent from "@/components/profile-component";
import { getUserProfile, saveDoctorProfile } from "@/api/api";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const ProfilePage = () => {
  const [doctorEmail, setDoctorEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const setIsProfile = useAuthStore((state) => state.setIsProfile);
  const setRole = useAuthStore((state) => state.setRole);

  useEffect(() => {
    (async () => {
      try {
        const response = await getUserProfile();

        if (response.success && response.data) {
          if (response.data?.userId && response.data?.role === "doctor") {
            setLoading(false);
            setIsProfile(true);
            setRole("doctor");
            router.push("/dashboard");
            return;
          }
          setDoctorEmail(response.data?.email);
          toast.success(
            "Please complete your doctor profile for accessing application features!",
          );
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

  const handleFormSubmit = async (formData: any) => {
    setLoading(true);
    try {
      await saveDoctorProfile(doctorEmail, formData);
      toast.success("Profile saved successfully!");

      setIsProfile(true);
      setRole("doctor");

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-dvh w-full justify-center items-center gap-4">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <>
      <ProfileComponent
        email={doctorEmail}
        name=""
        degrees={[]}
        designation=""
        specialization=""
        phone={[]}
        bmdcNumber=""
        digitalSignature=""
        handleFormSubmit={handleFormSubmit}
        loading={loading}
      />
    </>
  );
};

export default ProfilePage;
