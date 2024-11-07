"use client";

import { GoogleLogin } from "@/utils";
import OauthButton from "@/components/shared/OauthButtton";

export default function OauthButtons() {
	return (
		<div className="mt-3 flex items-center justify-between gap-2">
			<OauthButton provider="google" onClick={GoogleLogin}>
				Sign in with Google
			</OauthButton>
		</div>
	);
}