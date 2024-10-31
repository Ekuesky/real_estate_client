import React from "react";
import type { Metadata } from "next";
import { AuthFormHeader } from "@/components/forms/auth";
import PasswordResetRequestForm from "@/components/forms/auth/PasswordResetRequestForm";

// add metadata
export const metadata: Metadata = {
	title: "Ayiek real estate | Password reset",
	description: "Welcome to the real estate application",
};

function Page() {
	return (
		<div>
			<AuthFormHeader
				linkHref="/login"
				title="Reset Password Request"
				linkText="Back to Login page"
				staticText="Want to go back?"
			/>
			<div className=" mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<PasswordResetRequestForm
					/>
				</div>
			</div>
		</div>
	);
}

export default Page;
