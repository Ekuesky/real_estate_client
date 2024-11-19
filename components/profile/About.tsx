"use client";

import React from "react";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import Spinner from "@/components/shared/Spinner";
import { TabsContent } from "@/components/ui/tabs";
import { ProfileItem } from "@/components/profile/ProfileItem";
import {
 BadgeCheck,
 Briefcase,
 CalendarDays,
 Contact,
 Hotel,
 MapPinnedIcon,
 Star,
 Map,
 UserRoundCheck,
} from "lucide-react";
import { capitalizeWord, formatDate } from "@/utils";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function AboutContent() {
 const { data, isLoading } = useGetUserProfileQuery();
 const profile = data?.profile;

 if (isLoading) {
  return (
   <div className="flex-center pt-32">
    <Spinner size="lg" />
   </div>
  );
 }

 return (
  <TabsContent value="about">
   <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
    {/* column 1 */}
    <div className="space-y-3">
     <ProfileItem
      icon={<Contact className="tab-icon" />}
      label="Name"
      value={profile?.full_name || ""}
     />
     <ProfileItem
      icon={<UserRoundCheck className="tab-icon" />}
      label="Gender"
      value={capitalizeWord(profile?.gender) || ""}
     />
     <ProfileItem
      icon={<CalendarDays className="tab-icon" />}
      label="Joined"
      value={formatDate(profile?.date_joined).toString() || ""}
     />
     <ProfileItem
      icon={<BadgeCheck className="tab-icon" />}
      label="Reputation"
      value={`${profile?.reputation} out of 100` || ""}
     />
     <ProfileItem
      icon={<Map className="tab-icon" />}
      label="Country"
      value={profile?.country_of_origin || ""}
     />
     <ProfileItem
      icon={<MapPinnedIcon className="tab-icon" />}
      label="City"
      value={profile?.city_of_origin || ""}
     />
    </div>
    {/* column 2 */}
    <div className="flex flex-col space-y-3 h-full">
     <div className="flex-grow space-y-3">
      <ProfileItem
       icon={<Briefcase className="tab-icon" />}
       label="Occupation"
       value={profile?.occupation || ""}
      />
      <ProfileItem
       icon={<Star className="tab-icon" />}
       label="Average Rating"
       value={(profile?.average_rating as string) || ""}
      />
      <div className="prose max-w-none">
       <p>
        <span className="tab-font">Bio: </span>
        <span className="px-2 py-1 rounded-md bg-electricIndigo/10 dark:bg-electricIndigo/20 dark:text-babyPowder text-sm">{profile?.bio || "No bio added"}</span>
       </p>
      </div>
     </div>
     <div className="mt-auto">
      <Link href="/profile/edit/">
       <Button className="h3-semibold electricIndigo-gradient text-babyPowder rounded-lg">
        Update your profile
       </Button>
      </Link>
     </div>
    </div>
   </div>
  </TabsContent>
 );
}

function About() {
 return (
  <ProtectedRoute>
   <AboutContent />
  </ProtectedRoute>
 );
}
export default About;