"use client";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetTrigger,
} from "@/components/ui/sheet";
import { leftNavLinks } from "@/constants";
import { useAuthNavigation } from "@/hooks";
import { HomeModernIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNavbar() {
	const { handleLogout, isAuthenticated } = useAuthNavigation();
	return (
		<Sheet>
			<SheetTrigger asChild className="cursor-pointer">
				<Image
					src="/assets/icons/mobile-menu.svg"
					alt="Mobile Menu"
					width={36}
					height={36}
					className="invert-colors sm:hidden"
				/>
			</SheetTrigger>
			<SheetContent side="left" className="bg-baby_rich border-none">
				<Link href="/" className="flex items-center gap-1">
					<HomeModernIcon className="mr-2 size-11 text-lime-500" />
					<p className="h2-bold text-baby_veryBlack font-robotoSlab">
						Alpha <span className="text-lime-500"> Apartments</span>
					</p>
				</Link>

				<div>
					<SheetClose asChild>
						<LeftNavContent />
					</SheetClose>

					<SheetClose asChild>
						<SheetFooter>
							{isAuthenticated ? (
								<Button
									onClick={handleLogout}
									className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_richBlack min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
								>
									Logout
								</Button>
							) : (
								<>
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
								</>
							)}
						</SheetFooter>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
}