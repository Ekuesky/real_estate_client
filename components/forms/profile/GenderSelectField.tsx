import React, { useEffect } from "react";
import { Control, UseFormSetValue, Controller } from "react-hook-form";
import { TUserProfileSchema } from "@/lib/validationSchemas";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import { UserSearch } from "lucide-react";
import customStyles from "@/components/forms/selectInputCss";
import Select from "react-select";

type Gender = "male" | "female" | "other";

function isGender(value: any): value is Gender {
 return ["male", "female", "other"].includes(value);
}

const genderOptions = [
 { value: "male", label: "Male" },
 { value: "female", label: "Female" },
 { value: "other", label: "Other" },
];

interface GenderSelectFieldProps {
 setValue: UseFormSetValue<TUserProfileSchema>;
 control: Control<TUserProfileSchema>;
}

function GenderSelectField({ setValue, control }: GenderSelectFieldProps) {
 const { data: profileData } = useGetUserProfileQuery();
 const profile = profileData?.profile;

 useEffect(() => {
  if (profile?.gender && isGender(profile.gender)) {
   const genderValue = genderOptions.find(
    (option) => option.value === profile.gender
   );
   if (genderValue) {
    setValue("gender", profile.gender);
   }
  }
 }, [profile, setValue]);

 return (
  <div>
   <label
    htmlFor="gender"
    className="h4-semibold dark:text-babyPowder"
   >
    Gender
   </label>
   <div className="mt-1 flex items-center space-x-3">
    <UserSearch className="dark:text-babyPowder size-8" />
    <Controller
     control={control}
     name="gender"
     render={({ field }) => (
      <Select
       className="mt-1 w-full"
       {...field}
       options={genderOptions}
       value={genderOptions.find(
        (option) => option.value === field.value
       )}
       onChange={(option) =>
        field.onChange(option?.value)
       }
       instanceId="gender-select"
       styles={customStyles}
      />
     )}
    />
   </div>
  </div>
 );
}

export default GenderSelectField;