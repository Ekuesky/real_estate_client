"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";
import Spinner from "@/components/shared/Spinner";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isLoading, SetIsLoading] = useState(true);

	useEffect(() => {
		const handleAuthState = async () => {
			const isLoggedIn = getCookie("logged_in") === "true";
			if (isLoggedIn) {
				dispatch(setAuth());
			} else {
				dispatch(setLogout());
				router.push("/login");
			}
			SetIsLoading(false);
		};
		handleAuthState();
	}, [dispatch, router]);
	if (isLoading) {
		return (
			<div className="flex-centered pt-32">
				<Spinner size="lg" />
			</div>
		);
	} else {
		return <>{children}</>;
	}
}

export default ProtectedRoute;