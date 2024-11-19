import React from "react";
import type { Metadata } from "next";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/profile/Header";
import About from "@/components/profile/About";
import Posts from "@/components/profile/Posts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Apartments from "@/components/profile/Apartments";

export const metadata: Metadata = {
	title: "Ayiek real estate | Profile",
	description: "Connected user profile page",
};

function ProfilePageContent() {
	return (
		<>
			<div className="grid items-start gap-4 px-4 pb-4 md:gap-6 md:px-6">
				<Header />

				{/* the tabs */}
				<div className="w-full">
					<Tabs
						className="dark:border-eerieBlack rounded-lg border grey-300"
						defaultValue="about"
					>
						<TabsList className="bg-baby_rich flex space-x-4">
							<TabsTrigger value="about" className="h3-semibold tab">
								About
							</TabsTrigger>
							<TabsTrigger value="posts" className="h3-semibold tab">
								Posts
							</TabsTrigger>
							<TabsTrigger value="my-issues" className="h3-semibold tab">
								My Issues
							</TabsTrigger>
							<TabsTrigger value="my-reports" className="h3-semibold tab">
								My Reports
							</TabsTrigger>
							<TabsTrigger value="assigned-issues" className="h3-semibold tab">
								Assigned Issues
							</TabsTrigger>
							<TabsTrigger value="apartments" className="h3-semibold tab">
								My Apartments
							</TabsTrigger>
						</TabsList>

						{/* about tabs content */}
						<About />

						{/* posts tab content */}
						<Posts />
						<Apartments/>
						{/* issue tab content */}
						{/*<Issues />*/}
						{/*/!* report tab content *!/*/}
						{/*<Reports />*/}
						{/*/!* assigned Issue tab content *!/*/}
						{/*<AssignedIssues />*/}
					</Tabs>
				</div>
			</div>
		</>
	);
}

export default function ProfilePage() {
	return (
		<ProtectedRoute>
			<ProfilePageContent />
		</ProtectedRoute>
	);
}
