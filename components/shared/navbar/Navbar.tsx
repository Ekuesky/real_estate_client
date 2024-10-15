import { HomeModernIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ThemeSwitcher from "@/components/shared/navbar/ThemeSwitcher";
import MobileNavbar from "@/components/shared/navbar/MobileNavbar";

export default function Navbar() {
	return (
		<nav className="flex-between bg-baby_rich border-b-platinum shadow-platinum fixed z-50 w-full gap-5 border-b-2 p-4 sm:p-6 lg:px-12 dark:border-b-0 dark:shadow-none">
			<Link href="/" className="flex items-center">
				<HomeModernIcon className="mr-2 size-11 text-lime-500" />
				<p className="h2-bold font-robotoSlab text-veryBlack dark:text-babyPowder hidden sm:block">
					Real Estate <span className="text-lime-500"> Apartments</span>
				</p>
			</Link>

			<div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
				{/* Theme Switcher placeholder*/}
				{/*<div className="dark:text-pumpkin text-lg sm:block sm:text-xl">*/}
				{/*	Theme Switcher*/}
			  {/*</div>*/}
				<ThemeSwitcher />
				{/* Mobile Navbar */}
				{/*<div className="dark:text-pumpkin text-lg sm:text-xl">*/}
				{/*	Mobile NavBar*/}
			  {/*</div>*/}
				<MobileNavbar/>
			</div>

		</nav>
	);
}