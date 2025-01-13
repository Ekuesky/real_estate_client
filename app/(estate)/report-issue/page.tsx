import { AuthFormHeader } from "@/components/forms/auth";
import type { Metadata } from "next";

import IssueCreateForm from "@/components/forms/issue/IssueCreateForm";
import ProtectedRoute from "@/components/shared/ProtectedRoute";

export const metadata: Metadata = {
	title: "Real Estate | Profile Edit",
	description: "Signed in users can edit their profile information",
};

function ReportIssuePageContent() {
	return (
		<div>
			<AuthFormHeader icon={true} title="Report an issue" />
			<div className="mt-7 sm:mx-auto sm:w-full sm:max-w-[480px]">
				<div className="bg-lightGrey dark:bg-deepBlueGrey rounded-xl px-6 py-12 shadow sm:rounded-lg sm:px-12 md:rounded-3xl">
					<IssueCreateForm/>
				</div>
			</div>
		</div>
	);
}

export default function ReportIssuePage(){
  return (
    <ProtectedRoute>
      <ReportIssuePageContent />
    </ProtectedRoute>
  )
}