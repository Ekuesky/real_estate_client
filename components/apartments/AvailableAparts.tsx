"use client"
import React from "react";
import { useGetAvailableApartmentQuery } from "@/lib/redux/features/apartments/apartApi";
import Spinner from "@/components/shared/Spinner";
import { extractErrorMessage } from "@/utils";
import { useTheme } from "next-themes";
import { ApartmentCard } from "@/components/cards/ApartmentCard";

function AvailableAparts() {
	const { data, isLoading, isSuccess, isError, error } =
		useGetAvailableApartmentQuery();
	const theme = useTheme();

	if (isLoading) {
		return (
			<div
				className={`flex-center pt-32 ${theme === "dark" ? "text-white" : "text-black"}`}
			>
				<Spinner size="lg" />
			</div>
		);
	}
	if (isError) {
		return (
			<div
				className={`flex-center pt-32 ${theme === "dark" ? "text-white" : "text-black"}`}
			>
				Error loading Apartments: {error?.toString()}
			</div>
		);
	}

	return (

		<>
			<h2 className="flex-center font-robotoSlab dark:text-pumpkin text-3xl sm:text-4xl">
        Available Apartments - ({data?.apartments.count})
      </h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
				{data && data?.apartments.results.length > 0 ?
					(data?.apartments.results.map((apartment) => (
							<ApartmentCard
								building={apartment.building}
								created_at={apartment.created_at}
								unit_number={apartment.unit_number}
								id={apartment.id}
								floor={apartment.floor} />
						)
					))
					: null}
			</div>
		</>
	);
}

export default AvailableAparts;
