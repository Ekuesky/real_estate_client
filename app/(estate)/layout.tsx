// import LeftNavbar from "@/components/shared/navbar/LeftNavbar";
// import Navbar from "@/components/shared/navbar/Navbar";
// import RightNavbar from "@/components/shared/navbar/RightNavbar";
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
	return (
		<main className="bg-baby_veryBlack relative">
			<h2 className="text-3xl dark:text-pumpkin">Navbar</h2>
			<div className="flex">
				{/* Left Navbar*/}
				<div className="dark:text--pumpkin hidden text-xl md:block ">
					Left Navbar
				</div>

				<section className="flex min-h-screen flex-1 flex-col px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pt-32">
					<div>
						{children}
					</div>
				</section>
				{/* Right Navbar*/}
				<div className="dark:text--pumpkin hidden text-xl md:block ">
					Right Navbar
				</div>
			</div>


		</main>
	);
}