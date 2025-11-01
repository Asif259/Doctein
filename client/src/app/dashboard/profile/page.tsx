"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Spinner,
    Button,
} from "@nextui-org/react";
import { getDoctor } from "@/api/dashboard/profileAPI";
import DoctorProfile from "@/components/dashboard/profile/doctor-profile";
import ProfileComponent from "@/components/dashboard/profile/profile-component";
import { FaEdit, FaUser } from "react-icons/fa";
import { useProfileStore } from "@/store/profile-store";
import { doctor } from "@/types/dashboard";

const ProfilePage = () => {
    const [loading, setLoading] = useState(true);
    const { Doctor, addDoctor, onProfileUpdate } = useProfileStore(
        (state) => state,
    );
    const [email, setEmail] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const fetchDoctorProfile = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getDoctor();
            const { doctorProfile, email } = response;
            addDoctor(doctorProfile);
            setEmail(email);
        } catch (err: unknown) {
            console.log("Failed to fetch doctor profile:", err);
        } finally {
            setLoading(false);
        }
    }, [addDoctor]);

    useEffect(() => {
        (async () => {
            await fetchDoctorProfile();
        })();
    }, [fetchDoctorProfile]);

    const handleProfileUpdate = async (doctor: doctor) => {
        try {
            onProfileUpdate(doctor);
            await fetchDoctorProfile();
            setOpen(false);
        } catch (err) {
            console.error("Failed to update profile:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-8rem)] w-full justify-center items-center">
                <Spinner color="primary" size="lg" />
            </div>
        );
    }

    return (
        <>
            <Modal
                className="bg-white"
                size="4xl"
                isOpen={open}
                onOpenChange={setOpen}
                shouldBlockScroll={true}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-gradient-to-r from-primary to-primary/80 text-white">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-xl" />
                                    <span className="text-2xl font-bold">
                                        Update Profile
                                    </span>
                                </div>
                            </ModalHeader>
                            <ModalBody className="p-6">
                                <ProfileComponent
                                    doctor={Doctor}
                                    onProfileUpdate={handleProfileUpdate}
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                                    Professional Profile
                                </h1>
                                <p className="text-lg text-gray-600">
                                    Manage your professional information and
                                    credentials
                                </p>
                            </div>
                            {Doctor && (
                                <Button
                                    startContent={
                                        <FaEdit className="w-4 h-4" />
                                    }
                                    className="bg-primary text-white font-semibold px-6 py-3 hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
                                    size="lg"
                                    onClick={() => setOpen(true)}
                                >
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="mt-8">
                        {Doctor ? (
                            <DoctorProfile
                                doctor={Doctor}
                                email={email || ""}
                            />
                        ) : (
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-16 text-center">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center ring-8 ring-primary/5">
                                        <FaUser className="text-4xl text-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            No Profile Found
                                        </h3>
                                        <p className="text-gray-600 max-w-md mx-auto">
                                            Create your professional profile to
                                            showcase your credentials and get
                                            started with the application
                                        </p>
                                    </div>
                                    <Button
                                        startContent={
                                            <FaEdit className="w-4 h-4" />
                                        }
                                        className="bg-primary text-white font-semibold px-8 py-3 hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/20"
                                        size="lg"
                                        onClick={() => setOpen(true)}
                                    >
                                        Create Profile
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
