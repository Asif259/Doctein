"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";
import { getDoctor } from "@/api/dashboard/profileAPI";
import DoctorProfile from "@/components/dashboard/profile/doctor-profile";
import ProfileComponent from "@/components/dashboard/profile/profile-component";
import { Spinner, Button } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { useProfileStore } from "@/store/profile-store";
import { doctor } from "@/types/dashboard";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { Doctor, addDoctor, onProfileUpdate } = useProfileStore((state) => state);
  const [email, setEmail] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [updateProfile, setUpdateProfile] = useState<doctor | null>(null);

  const fetchDoctorProfile = async () => {
    try {
      setLoading(true);
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

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  const handleProfileUpdate = async (doctor: doctor) => {
    try {
      setUpdateProfile(doctor);
      onProfileUpdate(doctor);
      await fetchDoctorProfile();
      setOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-dvh w-full justify-center items-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <>
      <Modal
        className="bg-default "
        size="2xl"
        isOpen={open}
        onOpenChange={setOpen}
        shouldBlockScroll={true}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Update Profile</ModalHeader>
              <ModalBody >
                <ProfileComponent doctor={Doctor} onProfileUpdate={handleProfileUpdate} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button
          startContent={<FaEdit />}
          className="flex items-center gap-2 bg-primary px-4"
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
      </div>

      <div>{Doctor ? (
          <DoctorProfile doctor={Doctor} email={email || ""}/>
      ) : (
          <div>No doctor profile available</div>
      )}
      </div>
    </>
  );
};

export default ProfilePage;
