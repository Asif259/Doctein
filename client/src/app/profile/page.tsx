"use client";
import { useEffect, useState } from "react";
import ProfileComponent from "@/components/dashboard/profile/profile-component";
import { getUserProfile } from "@/api/api";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";
import { useProfileStore } from "@/store/profile-store";
import { doctor } from "@/types/dashboard";

const ProfilePage = () => {
    const { Doctor, addDoctor, onProfileUpdate } = useProfileStore(
        (state) => state,
    );
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const setIsProfile = useAuthStore((state) => state.setIsProfile);
    const setRole = useAuthStore((state) => state.setRole);

    const handleProfileUpdate = async (updatedDoctor: doctor) => {
        // Update the store
        if (onProfileUpdate) {
            onProfileUpdate(updatedDoctor);
        }

        // If profile was successfully saved and user doesn't have userId yet,
        // fetch updated user profile and redirect to dashboard
        if (updatedDoctor.key) {
            try {
                const response = await getUserProfile();
                if (response.success && response.data) {
                    if (
                        response.data?.role === "doctor" &&
                        response.data?.userId
                    ) {
                        setIsProfile(true);
                        setRole("doctor");
                        router.push("/dashboard");
                    }
                }
            } catch (error) {
                console.error("Error fetching updated profile:", error);
            }
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await getUserProfile();

                if (response.success && response.data) {
                    if (
                        response.data?.role === "doctor" &&
                        response.data?.userId
                    ) {
                        setLoading(false);
                        setIsProfile(true);
                        setRole("doctor");
                        router.push("/dashboard");
                        return;
                    } else {
                        if (response.data.doctor) {
                            addDoctor(response.data.doctor);
                        } else {
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
    }, [router, addDoctor, setIsProfile, setRole]);

    if (loading) {
        return (
            <div className="flex h-dvh w-full justify-center items-center gap-4">
                <Spinner color="warning" size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl xl:max-w-5xl">
                <ProfileComponent
                    doctor={Doctor}
                    onProfileUpdate={handleProfileUpdate}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
