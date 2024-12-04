 import React from "react";
import type {Metadata} from "next";
 import AvailableAparts from "@/components/apartments/AvailableAparts";


export const metadata: Metadata = {
  title: "Ayiek real estate | Welcome",
  description: "Welcome to the real estate application",
};

function Page(props) {
	return (
		<div>
			<AvailableAparts/>
		</div>
	);
}

export default Page;