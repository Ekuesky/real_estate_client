"use client";
import React from "react";
import { useTheme } from "next-themes";
import { useGetAllUsersQuery } from "@/lib/redux/features/users/usersApi";
import Spinner from "@/components/shared/Spinner";
import UsersSearch from "@/components/shared/search/UsersSearch";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TenantInfo from "@/components/cards/TenantInfo";
import { Briefcase, CalendarDays, Map } from "lucide-react";
import { formatDate } from "@/utils";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

const TenantCardContent = () => {
	const { theme } = useTheme();
	const { data, isLoading, isError, error } = useGetAllUsersQuery({});

	/* if data currently loading*/
	if (isLoading) {
		return (
			<div
				className={`flex-center pt-32 ${theme === "dark" ? "text-white" : "text-black"}`}
			>
				<Spinner size="lg" />
			</div>
		);
	}
	/* if there's an error fetching data */
	if (isError) {
		return (
			<div
				className={`flex-center pt-32 ${theme === "dark" ? "text-white" : "text-black"}`}
			>
				Error loading users: {error?.toString()}
			</div>
		);
	}

	return (
		<div>
			<UsersSearch />
			<h1 className="flex-center font-robotoSlab dark:text-pumpkin text-4xl sm:text-5xl">
				All Tenants - ({data?.profiles.results.length})
			</h1>
			<div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
				{/* S'il ya au moins une donnée */}
				{data && data?.profiles.results.length > 0 ? (
					data.profiles.results.map((tenant) => (
						<Card key={tenant.id}>
							<CardContent className="rounded-lg p-4">
								<CardHeader className="flex-col-center text-center">
									<Avatar>
										<AvatarImage
											className="rounded-full"
											alt="User profile avatar"
											width={100}
											height={100}
											src={
												tenant.avatar ||
												(theme === "dark"
													? "/assets/icons/user-profile-circle.svg"
													: "/assets/icons/user-profile-light-circle.svg")
											}
										/>
									</Avatar>
									<CardTitle className="h3-semibold font-robotoSlab dark:text-platinum">
										{tenant.full_name}
									</CardTitle>
								</CardHeader>
								<CardTitle className="flex-center">
									<p className="h4-semibold font-robotoSlab dark:text-lime-500">
										@{tenant.username}
									</p>
								</CardTitle>
								<CardDescription className="mt-4 space-y-2 border-b-0">
									<TenantInfo icon={Map} label="Country of origin" value={tenant.country_of_origin} />
									<TenantInfo icon={Briefcase} label="Occupation" value={tenant.occupation} />
									<TenantInfo icon={CalendarDays} label="Date Joined" value={formatDate(tenant.date_joined).toString()} />
									{/*todo: complete with apartments informations*/}
								</CardDescription>
							</CardContent>
						</Card>
					))
				) : (
					<p className="">No tenant found</p>
				)}
			</div>
		</div>
	);
};

function TenantCard() {
	return (
		<ProtectedRoute>
			<TenantCardContent />
		</ProtectedRoute>
	);
}

export default TenantCard;
