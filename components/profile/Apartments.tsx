import React from "react";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

function Apartments() {
	return (
		<TabsContent value="apartments">
			<div className="flex cursor-pointer flex-row justify-between">
				<Link href="/apartments">
					<Button className="h3-semibold electricIndigo-gradient text-babyPowder w-64 rounded-lg">
						Add new apartment
					</Button>
				</Link>
			</div>
		</TabsContent>
	);
}

export default Apartments;
