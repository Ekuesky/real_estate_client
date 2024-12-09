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
import { capitalizeWord, formatDate } from "@/utils";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import PaginationSection from "@/components/shared/PaginationSection";
import { setCurrentPage } from "@/lib/redux/features/users/userSlice";

const TenantCardContent = () => {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const page = useAppSelector((state) => state.user.page);
	const pageSize = useAppSelector((state) => state.user.pageSize);

	const searchTerm = useAppSelector((state) => state.user.searchTerm);
	console.log("Search Term:", searchTerm); // Added log
	const { data, isLoading, isError, error } = useGetAllUsersQuery({
		searchTerm:searchTerm||"", pageSize, page
	});

	const handlePageChange = (newPage:number) => {
		dispatch(setCurrentPage({page: newPage}));
	}
	const totalCount = data?.profiles.count || 0;
	const totalPages = Math.ceil(totalCount / pageSize);

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
			<h2 className="flex-center font-robotoSlab dark:text-pumpkin text-3xl sm:text-4xl">
				All Tenants - ({data?.profiles.count})
			</h2>
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
									<TenantInfo
										icon={Map}
										label="Country of origin"
										value={tenant.country_of_origin}
									/>
									<TenantInfo
										icon={Briefcase}
										label="Occupation"
										value={capitalizeWord(tenant.occupation)}
									/>
									<TenantInfo
										icon={CalendarDays}
										label="Date Joined"
										value={formatDate(
											tenant.date_joined,
										).toString()}
									/>
									{/*todo: complete with apartments informations*/}
								</CardDescription>
							</CardContent>
						</Card>
					))
				) : (
					<div className="w-full flex flex-col items-center justify-center space-y-4 p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
						<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
							strokeWidth="1.5"
							className="text-gray-400 dark:text-gray-500">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
						<p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
							No tenants found
						</p>
					</div>
				)}
			</div>
			<PaginationSection   currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />

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
