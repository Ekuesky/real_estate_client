import { Building, Hash, Calendar, Layers } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { capitalizeWord, formatDate } from "@/utils";
import TenantInfo from "@/components/cards/TenantInfo";
import React from "react";

interface ApartmentProps {
	id: string;
	created_at: string;
	unit_number: string;
	building: string;
	floor: string;
}

export function ApartmentCard({
	id,
	created_at,
	unit_number,
	building,
	floor,
}: ApartmentProps) {
	return (
		<Card key={id} className="w-full max-w-sm mx-auto">
			<CardContent className="pt-6">
				<div className="space-y-4">

					<div className="flex items-center space-x-2">
						<Building className="h-5 w-5 text-muted-foreground" />
						<span className="font-medium">{building}</span>
					</div>
					<TenantInfo
						icon={Hash}
						label="Unit-number"
						value={unit_number}
					/>
					<TenantInfo
						icon={Layers}
						label="Floor"
						value={floor}
					/>
					<TenantInfo
						icon={Calendar}
						label="Creation date"
						value={formatDate(created_at)}
					/>
				</div>
			</CardContent>
			<CardFooter>
				{/* todo prevu de mettre un bouton ici*/}
			</CardFooter>
		</Card>
	);
}
