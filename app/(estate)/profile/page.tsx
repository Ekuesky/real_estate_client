"use client";
import React from "react";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import Spinner from "@/components/shared/Spinner";

function ProfilePage() {

	const {data, isLoading} = useGetUserProfileQuery()

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="lg"/>
			</div>)
	}
	return (
		<div>
			<h1> {data?.profile.username}&apos;s Profile</h1>
		</div>
	);
}

export default ProfilePage;