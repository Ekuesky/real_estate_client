"use client";
import React from "react";
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import { useResetPasswordRequestMutation } from "@/lib/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { PasswordResetRequestSchema, TPasswordResetRequestSchema } from "@/lib/validationSchemas";
import { toast } from "react-toastify";
import { extractErrorMessage } from "@/utils";
import { FormFieldComponent } from "@/components/forms/FormFieldComponent";
import { MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";

function PasswordResetRequestForm() {

	const [resetPasswordRequest, {isLoading} ] = useResetPasswordRequestMutation()
	const {register, handleSubmit, reset, formState:{errors} } = useForm<TPasswordResetRequestSchema>(
		{
      resolver: zodResolver(PasswordResetRequestSchema) /* using zod resoler to validate fields*/,
      mode: "all",
			defaultValues: {
        email: "",
      },
    }
	)
	const onSubmit = async (values : z.infer<typeof PasswordResetRequestSchema> ) => {
		try {
      await resetPasswordRequest(values).unwrap()
      toast.success("An Email with a password reset link has been sent to your email address. Please check your email.")
      reset()
    } catch (e) {
			const errorMsg = extractErrorMessage(e)
      toast.error(errorMsg || "An error has occurred")
    }
	}
	return (
		<main>
			{/* Disable browser HTML5 default validation to avoid collision errors validation messages,
			since we are already using zod for validation */}
			<form noValidate onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-4">
				<FormFieldComponent
					label="Email Address"
          name="email"
          register={register}
					errors={errors}
          placeholder="Email Address"
          startIcon={<MailIcon className="dark:text-babyPowder size-8" />}
				 />
				<Button type="submit" className="h4-semibold bg-eerieBlack dark:bg-pumpkin w-full text-white" disabled={isLoading}>
					{isLoading? <Spinner size="sm"/> : "Request password reset"}
				</Button>

			</form>
		</main>
	);
}

export default PasswordResetRequestForm;