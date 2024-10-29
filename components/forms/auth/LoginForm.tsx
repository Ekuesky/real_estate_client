"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useLoginUserMutation } from "@/lib/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { useForm } from "react-hook-form";
import { LoginUserSchema, TLoginUserSchema } from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { setAuth } from "@/lib/redux/features/auth/authSlice";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";


/**
 * LoginForm component for user authentication.
 * Uses react-hook-form for form management, Zod for validation, and RTK Query for API calls.
 */
function LoginForm() {
	/**
	 * RTK Query hook for the login API call.
	 * Destructures the mutation and loading state.
	 */
	const [loginUser, { isLoading }] = useLoginUserMutation();

	/**
	 * Next.js hook for client-side routing.
	 */
	const router = useRouter();

	/**
	 * RTK hook to dispatch actions to the Redux store.
	 */
	const dispatch = useAppDispatch();

	/**
	 * React Hook Form setup for managing form state and validation.
	 * Uses Zod resolver for schema-based validation.
	 */
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TLoginUserSchema>({
		resolver: zodResolver(LoginUserSchema),
		mode: "all",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	/**
	 * Handles form submission.  Calls the login API, dispatches Redux action,
	 * handles success and error cases.
	 */
	const onSubmit = async (values: z.infer<typeof LoginUserSchema>) => {
		try {
			await loginUser(values).unwrap();
			dispatch(setAuth());
			toast.success("Login successful");
			router.push("/welcome");
			/**
			 * Resets the form after successful login.
			 */
			reset();
		} catch (error) {
			const errorMsg = extractErrorMessage(error);
			toast.error(errorMsg || "An error occurred when trying to login");
		}
	};

	return (
		<main>
			<form
				noValidate
				onSubmit={handleSubmit(onSubmit)}
				className="flex w-full max-w-md flex-col gap-4"
			>
				{/* Reusable Form Field Component for Email */}
				<FormFieldComponent
					label="Email Address"
					name="email"
					register={register}
					errors={errors}
					placeholder="Email Address"
					startIcon={<MailIcon className="dark:text-babyPowder size-8" />}
				/>

				{/* Reusable Form Field Component for Password */}
				<FormFieldComponent
					label="Password"
					name="password"
					register={register}
					errors={errors}
					placeholder="Password"
					isPassword={true}
					link={{ linkText: "Forgot Password?", linkUrl: "/forgot-password" }}
				/>

				{/* Submit button with loading indicator */}
				<Button
					type="submit"
					className="h4-semibold bg-eerieBlack dark:bg-pumpkin w-full text-white"
					disabled={isLoading}
				>
					{isLoading ? <Spinner size="sm" /> : `Sign In`}
				</Button>
			</form>
		</main>
	);
}

export default LoginForm;