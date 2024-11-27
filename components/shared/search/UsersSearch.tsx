"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { setSearchTerm } from "@/lib/redux/features/users/userSlice";

function UsersSearch() {
	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector((state) => state.user.setSearchTerm);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(e.target.value));
	};

	return (
		<div className="bg-gray dark:bg-eerieBlack mb-3 flex min-h-[56px] w-full grow rounded-full">
			<Image
				src="/assets/icons/search.svg"
				alt="Search"
				width={24}
				height={24}
				className="mx-3"
			/>
			<Input
				placeholder="Search..."
				type="search"
				value={searchTerm as string}
				onChange={handleSearchChange}
				className="search-text no-focus dark:text-babyPowder border-none bg-transparent shadow-none outline-none"
			/>
		</div>
	);
}

export default UsersSearch;
