"use client";

import { useEffect, useState } from "react";
import ProfileComponent from "@/components/profile-component";
import { getUserProfile, saveDoctorProfile } from "@/api/api";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [doctorEmail, setDoctorEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        
        if (response.success) {
          setDoctorEmail(response.data.email); 
        } else {
          console.error(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Define handleFormSubmit here and pass it to ProfileComponent
  const handleFormSubmit = async (formData: any) => {
    setLoading(true);
    try {
      // Save doctor profile using the API
      await saveDoctorProfile(doctorEmail, formData);
      // Redirect to dashboard after successful save
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileComponent
      email={doctorEmail}
      name="" 
      degrees=""
      designation=""
      specialization=""
      phone={[]}
      bmdcNumber=""
      digitalSignature=""
      handleFormSubmit={handleFormSubmit} // Pass handleFormSubmit to the component
      loading={loading} // Pass loading state
    />
  );
};

export default ProfilePage;
