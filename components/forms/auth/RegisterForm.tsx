"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"; // Imports Zod resolver for React Hook Form
import { Contact2Icon, MailIcon, UserCheck2 } from "lucide-react"; // Imports icons from lucide-react
import { useRegisterUserMutation } from "@/lib/redux/features/auth/authApi"; // Imports a Redux hook for registering users
import { useRouter } from "next/navigation"; // Imports the useRouter hook for client-side navigation
import { useForm } from "react-hook-form"; // Imports React Hook Form for form management
import {
	RegisterUserSchema,
	TRegisterUserSchema,
} from "@/lib/validationSchemas";
import { extractErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";


export default function RegisterForm() {
	// Uses the useRegisterUserMutation hook from Redux to handle user registration
	const [registerUser, { isLoading }] = useRegisterUserMutation();
	const router = useRouter(); // Initializes the router for navigation

	// Uses React Hook Form to manage the form
	const {
		register, // register function to register form fields
		handleSubmit, // handleSubmit function to handle form submission
		reset, // reset function to reset the form
		formState: { errors }, // errors object containing validation errors
	} = useForm<TRegisterUserSchema>({
		resolver: zodResolver(RegisterUserSchema), // Uses Zod resolver for validation
		mode: "all", // Validates on every input change
		defaultValues: { // Default values for the form fields
			username: "",
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			re_password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof RegisterUserSchema>) => {
		try {
			// Calls the registerUser mutation from Redux
			await registerUser(values).unwrap();
			//Displays success message
			toast.success(
				"An Email with an activation link has been sent to your email address. Please check your email and activate your account.",
			);
			reset(); // Resets the form
			router.push("/login"); // Redirects to login page after successful registration
		} catch (e) {
			// Handles errors during registration
			const errorMessage = extractErrorMessage(e); // Extracts a user-friendly error message
			toast.error(errorMessage || "An error occurred"); // Displays the error message
		}
	};

	return (
		<main>
			<form
				noValidate // Disables HTML5 native validation
				onSubmit={handleSubmit(onSubmit)} // Handles form submission
				className="flex w-full max-w-md flex-col gap-4" // Styling
			>
				{/* Reusable FormFieldComponent for each input field */}
				<FormFieldComponent
					label="Username"
					name="username"
					register={register}
					errors={errors}
					placeholder="Username"
					startIcon={<UserCheck2 className="dark:text-babyPowder size-8" />}
				/>

				<FormFieldComponent
					label="First Name"
					name="first_name"
					register={register}
					errors={errors}
					placeholder="First Name"
					startIcon={<Contact2Icon className="dark:text-babyPowder size-8" />}
				/>

				<FormFieldComponent
					label="Last Name"
					name="last_name"
					register={register}
					errors={errors}
					placeholder="Last Name"
					startIcon={<Contact2Icon className="dark:text-babyPowder size-8" />}
				/>

				<FormFieldComponent
					label="Email Address"
					name="email"
					register={register}
					errors={errors}
					placeholder="Email Address"
					startIcon={<MailIcon className="dark:text-babyPowder size-8" />}
				/>

				<FormFieldComponent
					label="Password"
					name="password"
					register={register}
					errors={errors}
					placeholder="Password"
					isPassword={true} //indicates it's a password field
				/>

				<FormFieldComponent
					label="Password Confirm"
					name="re_password"
					register={register}
					errors={errors}
					placeholder="Confirm Password"
					isPassword={true} //indicates it's a password field
				/>
				{/* Submit button with loading state */}
				<Button
					type="submit"
					className="h4-semibold bg-eerieBlack dark:bg-pumpkin w-full text-white"
					disabled={isLoading} // Disables the button while loading
				>
					{isLoading ? <Spinner size="sm" /> : `Submit`}
				</Button>
			</form>
		</main>
	);
}