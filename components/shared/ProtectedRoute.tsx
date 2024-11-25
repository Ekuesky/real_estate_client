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
  /* get auth state from the store*/
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleAuthState = async () => {
      /* check if there is a logged_in attribute in browser cookie and if its value is set to true*/
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