"use client";
import { useGetUserQuery } from "@/lib/redux/features/auth/authApi";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/profile/Header";
import About from "@/components/profile/About";
import Posts from "@/components/profile/Posts";
import Apartments from "@/components/profile/Apartments";
import Spinner from "@/components/shared/Spinner";

function ProfilePageContent() {
 const { data: user, isLoading, isError } = useGetUserQuery();

 const tabConfigurations = {
   tenant: [
     { value: "about", label: "About" },
     { value: "posts", label: "Posts" },
     { value: "my-issues", label: "My Issues" },
     { value: "my-reports", label: "My Reports" },
     { value: "apartments", label: "My Apartments" }
   ],
   default: [
     { value: "about", label: "About" },
     { value: "posts", label: "Posts" },
     { value: "assigned-issues", label: "Assigned Issues" },
     { value: "my-reports", label: "My Reports" },
    /* { value: "apartments", label: "My Apartments" }*/
   ]
 };

 if (isLoading) return <Spinner />;
 if (isError) return <div>Error loading user data</div>;

 const userTabs = user?.occupation === "tenant"
   ? tabConfigurations.tenant
   : tabConfigurations.default;

 return (
  <div className="grid items-start gap-4 px-4 pb-4 md:gap-6 md:px-6">
   <Header />

   <div className="w-full">
    <Tabs
     className="dark:border-eerieBlack rounded-lg border grey-300"
     defaultValue={userTabs[0]?.value || "about"}
    >
     <TabsList className="bg-baby_rich flex space-x-4">
      {userTabs.map((tab) => (
       <TabsTrigger
        key={tab.value}
        value={tab.value}
        className="h4-bold tab"
       >
        {tab.label}
       </TabsTrigger>
      ))}
     </TabsList>

     {userTabs.map((tab) => (
      <TabsContent key={tab.value} value={tab.value}>
       {tab.value === "about" && <About />}
       {tab.value === "posts" && <Posts />}
       {tab.value === "my-issues" && user?.occupation === "tenant" && <span className="m-auto">Issue content</span>}
       {tab.value === "my-reports" && <span>Report content</span>}
       {tab.value === "assigned-issues" && user?.occupation !== "tenant" && <span>Assigned Issues content</span>}
       {tab.value === "apartments" && <Apartments />}
      </TabsContent>
     ))}
    </Tabs>
   </div>
  </div>
 );
}

export default function ProfilePage() {
 return (
  <ProtectedRoute>
   <ProfilePageContent />
  </ProtectedRoute>
 );
}