import type { Metadata } from "next";
import buildings from "@/public/assets/images/buildings.webp";
import Link from "next/link";
import Image from "next/image";
import { SquareArrowLeft } from "lucide-react";

export const metadata: Metadata = {
	title: "Real estate apartments",
	description: "Welcome to the real estate",
	keywords: ["real estate", "apartments", "nextjs", "tailwindcss"],
};
const buttonStyles = `
  group relative overflow-hidden
  bg-stone-700 hover:bg-orange-500
  text-white font-semibold
  py-3 px-6 rounded-full
  transition duration-300 ease-in-out
  transform hover:-translate-y-1 hover:scale-105
  flex items-center justify-center
  text-lg sm:text-xl
  w-full sm:w-auto
  shadow-md hover:shadow-lg
`;

export default function HomePage() {
	return (
		<div className="relative h-screen">
			<div className="absolute inset-0 z-0">
				<Image
					src={buildings}
					alt="Apartments"
					fill
					style={{ objectFit: "cover", objectPosition: "center" }}
					priority
				/>
			</div>
			<main className="flex-center relative z-10 h-full bg-black/40 ">
				<div className="text-center">
					<h1 className="font-openSans mb-4 text-3xl font-semibold text-emerald-500 antialiased sm:text-6xl md:text-6xl">
						Welcome to the real estate
					</h1>

					<div className="flex items-center justify-center space-x-4 bg-gradient-to-br from-stone-800 to-stone-900 p-6 rounded-2xl shadow-2xl max-w-md mx-auto border-2 border-orange-500/20">
						<div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
							<Link href="/register" prefetch={false}>

								<button className={buttonStyles}>
									<span className="relative z-10 flex items-center">
										Register
									<SquareArrowLeft className="mx-2"/>
									</span>

								</button>
							</Link>

							<div className="w-px h-8 bg-stone-600 hidden sm:block"></div>

							<div className="flex items-center space-x-4">
								<Link href="/login" prefetch={false}>
									<button className={buttonStyles}>
										<span className="relative z-10 flex items-center">
											Login
											<SquareArrowLeft className="mx-2"/>
										</span>
									</button>
								</Link>
							</div>

						</div>
					</div>

				</div>
			</main>
		</div>
	);
}
