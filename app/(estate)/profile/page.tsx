"use client";
import React from "react";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import Spinner from "@/components/shared/Spinner";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

function ProfilePageContent() {
	const { data, isLoading } = useGetUserProfileQuery();

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="lg" />
			</div>
		);
	}
	return (
		<div>
			<h1> {data?.profile.username}&apos;s Profile</h1>
		</div>
	);
}

export default function ProfilePage() {
	return (

			<ProtectedRoute>
				<ProfilePageContent />
			</ProtectedRoute>

	);
}
