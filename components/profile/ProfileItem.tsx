

import React from "react";

interface ProfileItemProps {
 icon: React.ReactNode;
 label: string;
 value: string;
}

export const ProfileItem: React.FC<ProfileItemProps> = ({icon, label, value}) => (
   <div className="flex items-center space-x-2">
     {icon}
     <span className="flex items-center">
       <span className="tab-font font-semibold mr-2"> {label}: </span>
       <span className="px-2 py-1 rounded-md bg-electricIndigo/10 dark:bg-electricIndigo/20 dark:text-babyPowder text-sm">
         {value}
       </span>
     </span>
   </div>
);