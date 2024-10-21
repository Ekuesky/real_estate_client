import type { Metadata } from "next";
import buildings from "@/public/assets/images/buildings.webp";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";


export const metadata: Metadata = {
	title: "Real estate apartments",
	description: "Welcome to the real estate",
	keywords: ["real estate", "apartments", "nextjs", "tailwindcss"]
};

export default function HomePage() {
	return (
		<div className="relative h-screen">
			<div className="absolute inset-0 z-0">
				<Image src={buildings} alt="Apartments" fill style={{ objectFit: "cover", objectPosition: "center" }}
							 priority />
			</div>
			<main className="flex-center relative z-10 h-full bg-black/40 ">
				<div className="text-center">
					<h1 className="font-robotoSlab mb-4 text-3xl font-semibold text-emerald-500 antialiased sm:text-6xl md:text-8xl">
						Welcome to the real estate
					</h1>
					<p className="my-8 text-2xl text-zinc-100 sm:text-3xl">
						Are you a tenant? Or an existing tenant?
					</p>
					<Link href="/register" prefetch={false}>
						<button
							className="bg-stone-700 rounded-3xl px-4 py-2 text-lg font-semibold text-white hover:bg-orange-400 sm:px-6 sm:text-1xl">
							<span className="inline-flex items-center">
								Create Your Account
									<ArrowRightIcon className="ml-2 size-6" />
							</span>
						</button>
					</Link>
				</div>

			</main>

		</div>
	);
}

