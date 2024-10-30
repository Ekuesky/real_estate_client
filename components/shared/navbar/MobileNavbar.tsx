"use client"; // Indicates this is a Client Component in Next.js

// Import necessary dependencies and components
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "@/components/ui/sheet";
import { leftNavLinks } from "@/constants";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthNavigation } from "@/hooks";

// Component for the content of the left navigation
function LeftNavContent() {
	// Get the current pathname for active link highlighting
	const pathname = usePathname();
	const { filteredNavLinks } = useAuthNavigation();

	return (
		<section className="flex h-full flex-col gap-6 pt-16">
			{/* Map through the navigation links */}
			{filteredNavLinks.map((linkItem) => {
				// Determine if the current link is active
				const isActive =
					(pathname.includes(linkItem.path) && linkItem.path.length > 1) ||
					pathname === linkItem.path;

				return (
					// Wrap each link in SheetClose for automatic closing on click
					<SheetClose asChild key={linkItem.path}>
						<Link
							href={linkItem.path}
							className={`${
								isActive
									? "electricIndigo-gradient text-babyPowder rounded-lg my-5"
									: "text-baby_richBlack"
							} flex items-center justify-start gap-4 bg-transparent p-4`}
						>
							{/* Icon for the navigation link */}
							<Image
								src={linkItem.imgLocation}
								alt={linkItem.label}
								width={22}
								height={22}
								className={`${isActive ? "" : "color-invert"}`}
							/>
							{/* Label for the navigation link */}
							<p className={`${isActive ? "base-bold" : "base-medium"}`}>
								{linkItem.label}
							</p>
						</Link>
					</SheetClose>
				);
			})}
		</section>
	);
}

// Main component for the mobile navbar
export default function MobileNavbar() {
	const { handleLogout, isAuthenticated } = useAuthNavigation();
	return (
		<Sheet>
			{/* Trigger for opening the mobile menu */}
			<SheetTrigger asChild className="cursor-pointer ">
				<Image
					src="/assets/icons/mobile-menu.svg"
					alt="Mobile Menu"
					width={36}
					height={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			{/* Content of the mobile menu */}
			<SheetContent
				side="left"
				className="bg-baby_rich border-none custom-scrollbar"
			>
				{/* Logo and site name */}
				<Link href="/" className="flex items-center gap-1">
					<HomeModernIcon className="mr-2 size-11 text-lime-500" />
					<p className="h2-bold text-baby_veryBlack font-robotoSlab">
						Ayiek <span className="text-lime-500"> Apartments</span>
					</p>
				</Link>

				<div>
					{/* Navigation links */}
					<SheetClose asChild>
						<LeftNavContent />
					</SheetClose>
					{isAuthenticated ? (
						<SheetClose asChild>
							<Button
								onClick={handleLogout}
								className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_richBlack min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
							>
								Logout
							</Button>
						</SheetClose>
					) : (
						/* Authentication buttons */
						<SheetClose asChild>
							<SheetFooter>
								<Link href="/register">
									<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-babyPowder mt-4 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
										Register
									</Button>
								</Link>
								<Link href="/login">
									<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-babyPowder min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
										Login
									</Button>
								</Link>
							</SheetFooter>
						</SheetClose>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}