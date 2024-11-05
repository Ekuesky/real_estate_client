"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";
import Spinner from "@/components/shared/Spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleAuthState = async () => {
      const isLoggedIn = getCookie("logged_in") === "true";
      if (isLoggedIn) {
        dispatch(setAuth());
      } else {
        dispatch(setLogout());
        router.push("/login");
      }
    };
    handleAuthState();
  }, [dispatch, router]);

  if (isLoading) {
    return (
      <div className="flex-centered pt-32">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // or return a blank page or a loading spinner
  }

  return <>{children}</>;
}

export default ProtectedRoute;