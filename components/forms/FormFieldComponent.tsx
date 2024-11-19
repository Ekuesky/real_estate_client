import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";
import {
	FieldErrors,
	FieldValues,
	Path,
	UseFormRegister,
} from "react-hook-form";

// Define the type for the props passed to the FormFieldComponent
type FormFieldComponentProps<TFieldValues extends FieldValues> = {
	// Optional label for the field
	label?: string;
	// The name of the field (used for registration and error handling)
	name: Path<TFieldValues>;
	// The register function from react-hook-form for registering the field
	register: UseFormRegister<TFieldValues>;
	// Errors object from react-hook-form for accessing validation errors
	errors: FieldErrors<TFieldValues>;
	// The type of the input field (e.g., "text", "email", "password")
	type?: React.HTMLInputTypeAttribute;
	// Placeholder text for the input field
	placeholder?: string;
	// Indicates if the field is required
	required?: boolean;
	// Start icon for the input field
	startIcon?: React.ReactNode;
	// End icon for the input field
	endIcon?: React.ReactNode;
	// Flag indicating if the field is a password input
	isPassword?: boolean;
	// Flag indicating if the field is a text area
	isTextArea?: boolean;
	// Link object for displaying a clickable link associated with the field
	link?: {
		linkText: string;
		linkUrl: string;
	};
	// Custom class name for the field's container
	className?: string;
	// Flag indicating if the field should be disabled
	disabled?: boolean;
};

// Generic component for rendering different input types with styling and validation
export function FormFieldComponent<TFieldValues extends FieldValues>({
	label,
	name,
	register,
	disabled = false,
	errors,
	type = "text",
	placeholder,
	required = false,
	startIcon,
	endIcon,
	link,
	className,
	isPassword = false,
	isTextArea = false,
}: FormFieldComponentProps<TFieldValues>) {
	// Get the error message for the current field from the errors object
	const errorMessage = errors[name]?.message as unknown as string;

	// Function to render the appropriate input component based on the provided props
	const renderInputComponent = () => {
		if (isTextArea) {
			// Render a Textarea component if isTextArea is true
			return (
				<Textarea
					{...register(name, { required:true })} // Register the field with react-hook-form
					placeholder={placeholder} // Set the placeholder text
					className={`dark:text-babyPowder ${className}`} // Apply custom and dark mode styling
				/>
			);
		} else if (isPassword) {
			// Render a PasswordInput component if isPassword is true
			return (
				<PasswordInput
					{...register(name, { required:true })} // Register the field with react-hook-form
					placeholder={placeholder} // Set the placeholder text
				/>
			);
		} else {
			// Render a regular Input component for other input types
			return (
				<Input
					id={name} // Set the id for the input element
					{...register(name, { required:true })} // Register the field with react-hook-form
					type={type} // Set the input type (e.g., "text", "email")
					placeholder={placeholder} // Set the placeholder text
					startIcon={startIcon} // Add a start icon if provided
					endIcon={endIcon} // Add an end icon if provided
					disabled={disabled} // Disable the input if disabled is true
					className={`dark:text-babyPowder ${className}`} // Apply custom and dark mode styling
				/>
			);
		}
	};

	// Render the final component structure
	return (
		<div>
			<div className="mb-1 flex justify-between">
				<label htmlFor={name} className="h4-semibold dark:text-babyPowder mb-1">
					{label} {/* Render the field label if provided */}
				</label>
				{/* Render a clickable link if the link object is provided */}
				{link && (
					<Link
						href={link.linkUrl}
						className="h4-semibold cursor-pointer hover:text-indigo-500 dark:text-lime-500 dark:hover:text-indigo-500"
					>
						{link.linkText}
					</Link>
				)}
			</div>
			<div className="mt-1">{renderInputComponent()}</div> {/* Render the input component */}
			{/* Display the validation error message if there is one */}
			{errorMessage && (
				<span className="mt-2 text-sm text-red-500">{errorMessage}</span>
			)}
		</div>
	);
}