import React from "react";
import type {Metadata} from "next";


export const metadata: Metadata = {
  title: "Ayiek real estate | Welcome",
  description: "Welcome to the real estate application",
};

function Page(props) {
	return (
		<div>
			<h1 className="dark:text-pumpkin text-6xl"> Welcome </h1>
		</div>
	);
}

export default Page;