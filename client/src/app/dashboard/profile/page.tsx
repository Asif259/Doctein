'use client';

import { useEffect, useState } from 'react';
import { getDoctor } from '@/api/api';
import DoctorProfile from '@/components/dashboard/profile/doctor-profile';
import ProfileComponent from '@/components/profile-component';
import { Spinner, Button } from "@nextui-org/react";
import { FaEdit,  FaWindowClose} from "react-icons/fa";
import { useProfileStore } from "@/store/profileStore";
import { doctor } from "@/types/dashboard";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { Doctor, addDoctor } = useProfileStore((state) => state);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const response = await getDoctor();
        const { doctorProfile, email } = response;

          addDoctor(doctorProfile); 
          setEmail(email);
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
      <div className="flex h-dvh w-full justify-center items-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Doctor) {
    return <div>No doctor profile found</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button 
           startContent={isEditing ? <FaWindowClose /> : <FaEdit />}
          color="secondary"
          className="flex items-center gap-2 bg-secondary-600 text-secondary-100"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Close" : "Edit"}
        </Button>
      </div>

      {isEditing ? (
        <ProfileComponent doctor={Doctor} />
      ) : (
        <DoctorProfile doctor={Doctor} email={email || ''} />
      )}
    </>
  );
};

export default ProfilePage;

