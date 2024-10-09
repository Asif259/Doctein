'use client';

import DoctorProfile from '@/components/dashboard/profile/doctor-profile';
import { useEffect, useState } from 'react';
import { getDoctor } from '@/api/api';  
import { Spinner } from "@nextui-org/react";

const ProfilePage = () => {
  const [doctorProfile, setDoctorProfile] = useState({
    name: "",
    degrees: [],
    designation: "",
    specialization: "",
    phone: [],
    email: "",
    bmdcNumber: "",
    digitalSignature: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const { doctorProfile, email } = await getDoctor();  
        setDoctorProfile({
          ...doctorProfile, 
          email  
        });
      } catch (err: any) {
        setError(err.message || "Error fetching doctor profile");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctorProfile();
  }, []);
  

  if (loading) {
    return (
        <div className="flex h-dvh w-full justify-center items-center gap-4">
          <Spinner color="warning" size="lg" />
        </div>
      );
  }


  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <DoctorProfile
        name={doctorProfile.name}
        degrees={doctorProfile.degrees}
        designation={doctorProfile.designation}
        specialization={doctorProfile.specialization}
        phone={doctorProfile.phone}
        email={doctorProfile.email}
        bmdcNumber={doctorProfile.bmdcNumber}
        digitalSignature={doctorProfile.digitalSignature}
      />
    </>
  );
};

export default ProfilePage;
