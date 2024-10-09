"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { authenticateUser, getUserProfile } from "@/api/api";
import { Spinner } from "@nextui-org/react";

const WithAuth = ({ children }: any) => {
  const { isLoggedIn, role, isProfileCompleted, login } = useAuthStore(
    (state) => state,
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "doctor" && !isProfileCompleted) {
        router.push("/profile");
      }
      setLoading(false);
      return;
    }
    console.log("Checking user authentication", isLoggedIn);
    (async () => {
      try {
        const data = await authenticateUser();
        console.log("User authentication data", data);

        if (data.success) {
          login();
          const res = await getUserProfile();
          if (res?.success) {
            if (res.data.role === "doctor" && !res.data.userId) {
              router.push("/profile");
            }
            setLoading(false);
            return;
          }
          setLoading(false);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/auth/login");
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex h-dvh w-full justify-center items-center gap-4">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }
  return children;
};

export default WithAuth;
