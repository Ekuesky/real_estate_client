"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import Spinner from "@/components/shared/Spinner";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { ProfileItem } from "@/components/profile/ProfileItem";
import { Building, FileDigit, LampFloor } from "lucide-react";

function ApartmentsContent() {
	const dispatch = useAppDispatch();
	const { data, isLoading, isError, error } = useGetUserProfileQuery();

	if (isLoading) {
		return (
			<div className="flex-center pt-32">
				<Spinner size="lg" />
			</div>
		);
	}

	if (isError) {
		return <div>Error: {error?.message || "An error occurred"}</div>;
	}

	const apartments = data?.profile?.apartments || [];

	if (apartments.length > 0) {
		return (
			<TabsContent value="apartments">
				<div className="dark:bg-black dark:text-gray-200  grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg  p-4">
					{" "}
					{/* Dark mode background */}
					{apartments.map((apartment) => (
						<div
							key={apartment.id}
							className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md p-4"
						>
							{" "}
							{/* Dark mode card background */}
							<h3 className="text-lime-500 text-lg  font-medium mb-2 dark:text-lime-500">
								Apartment {apartment.unit_number}
							</h3>
							<ProfileItem
								icon={
									<FileDigit className="h-6 w-6 dark:text-sky-500" />
								}
								label="Unit Number"
								value={apartment.unit_number}
							/>
							<ProfileItem
								icon={
									<Building className="h-6 w-6 dark:text-sky-500" />
								}
								label="Building"
								value={apartment.building || "N/A"}
							/>
							<ProfileItem
								icon={
									<LampFloor className="h-6 w-6 dark:text-sky-500" />
								}
								label="Floor"
								value={apartment.floor}
							/>
						</div>
					))}
				</div>
			</TabsContent>
		);
	} else {
		return (
      <TabsContent value="apartments">
        <div className="flex cursor-pointer flex-row justify-center">
					<p className="pt-5"> No apartment found</p>
          {/*<Link href="/apartments">*/}
          {/*  <Button className="h3-semibold electricIndigo-gradient text-babyPowder w-64 rounded-lg dark:text-white"> /!*Dark mode button text*!/*/}
          {/*    Add new apartment*/}
          {/*  </Button>*/}
          {/*</Link>*/}
        </div>
      </TabsContent>
		);
	}
}

export default function Apartments() {
	return (
		<ProtectedRoute>
			<ApartmentsContent />
		</ProtectedRoute>
	);
}
