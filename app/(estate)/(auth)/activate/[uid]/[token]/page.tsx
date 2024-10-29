"use client";


import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useActivateUserMutation } from "@/lib/redux/features/auth/authApi";

interface ActivationProps {
	params: {
		uid: string;
		token: string;
	};
}

export default function ActivationPage({ params }: ActivationProps) {
	const router = useRouter();
	/* RTK Query hook to perform the user activation request. Destructured to get the mutation function,
 		and the result object containing isLoading, isSuccess, and error. */
	const [activateUser, { isLoading, isSuccess, isError, error }] =
		useActivateUserMutation();


	useEffect(() => {
		/* Extract UID and token from the URL params */
		const { uid, token } = params;
		/*Call the activation mutation. This will trigger the activation process.*/
		activateUser({ uid, token });
	}, [activateUser, params]); // Only rerun if activateUser or params change


	/*This useEffect runs after the mutation completes.*/
	useEffect(() => {
		if (isSuccess) {
			toast.success("Account activated successfully!");
			router.push("/login");
		} else if (isError && error) {
			toast.error("Failed to activate your account");
		}
	}, [isSuccess, isError, error, router]); //Rerun only if isSuccess, error, router, or isError change

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h3 className="dark:text-platinum font-robotoSlab text-2xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
					{isLoading ? (
						<div className="flex-center">
							<span className="mr-2">⏰</span>
							<span>Activating your account....Please wait</span>
							<span className="ml-2">🥱</span>
						</div>
					) : isSuccess ? (
						<div>
							<span className="mr-2">✅</span>
							<span>Account Activated successfully!</span>
						</div>
					) : (
						isError && (
							<div>
								<span className="mr-2">❌</span>
								<span>Your account has already been activated...</span>
							</div>
						)
					)}
				</h3>
			</div>
		</div>
	);
}