"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { authenticateUser } from "@/api/api";

const WithAuth = ({ children }: any) => {
  const { isLoggedIn, login } = useAuthStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) return;
    console.log("Checking user authentication", isLoggedIn);
    (async () => {
      const data = await authenticateUser();
      console.log("User authentication data", data);
      if (data.success) login();
      else router.push("/auth/login");
    })();
  }, []);

  if (!isLoggedIn) return null;
  return children;
};

export default WithAuth;
