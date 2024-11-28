"use client";
import { useEffect, useState } from "react";
import ProfileComponent from "@/components/dashboard/profile/profile-component";
import { getUserProfile } from "@/api/api";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";
import { useProfileStore } from "@/store/profile-store";
import { logoutUser } from "@/api/api";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
    const { Doctor, addDoctor } = useProfileStore((state) => state);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const setIsProfile = useAuthStore((state) => state.setIsProfile);
    const setRole = useAuthStore((state) => state.setRole);

    const handleLogout = async () => {
        const res = await logoutUser();
        console.log(res.message);
        router.push("/auth/login");
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
        <div className="relative h-dvh bg-default flex items-center justify-center p-4">
            <div
                onClick={handleLogout}
                className="absolute top-4 right-4 flex items-center cursor-pointer bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-all duration-200"
            >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
            </div>

            <div className="shadow-lg bg-default w-full max-w-3xl">
                <ProfileComponent doctor={Doctor} onProfileUpdate={() => {}} />
            </div>
        </div>
    );
};

export default ProfilePage;
