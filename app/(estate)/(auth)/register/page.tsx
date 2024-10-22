import React from "react";
import { AuthFormHeader } from "@/components/forms/auth";

export default function RegisterPage(props) {
	return (<div>
			<AuthFormHeader title="Sign up for an account"
											staticText="Already have an account"
											linkText="Login here"
											linkHref="/login"
											 />
		</div>);
}