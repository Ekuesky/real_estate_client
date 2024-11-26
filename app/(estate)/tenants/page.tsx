import ProtectedRoute from "@/components/shared/ProtectedRoute";
import type {Metadata} from "next";
import TenantCard from "@/components/cards/TenantCard";

export const metadata: Metadata = {
  title: "Ayiek real estate | Tenants",
  description: "Authenticated users can view basic information about other tenants within the property. Tenants can also search for other tenants",
};

function TenantsPageContent() {
return(
	<div>
		<TenantCard/>
	</div>
)
}

export default function TenantsPage() {
	return (

			<ProtectedRoute>
				<TenantsPageContent />
			</ProtectedRoute>
	);
}
