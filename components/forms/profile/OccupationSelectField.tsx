import React, { useEffect } from "react";
import { Control, UseFormSetValue, Controller } from "react-hook-form";
import { TUserProfileSchema } from "@/lib/validationSchemas";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";
import { occupationOptions } from "@/constants";
import customStyles from "@/components/forms/selectInputCss";
import { Briefcase } from "lucide-react";
import Select from "react-select";

type Occupation =
	| "mason"
	| "carpenter"
	| "plumber"
	| "roofer"
	| "painter"
	| "electrician"
	| "hvac"
	| "tenant";

/* check if a value an Occupation type*/
function isOccupation(value: any): value is Occupation {
	const arr_occ = ["tenant", "mason", "carpenter", "plumber", "painter", "hvac", "roofer", "electrician"];
	return arr_occ.includes(value);
}

/* Define interface for the select field */
interface OccupationSelectFieldProps {
	setValue: UseFormSetValue<TUserProfileSchema>;
	control: Control<TUserProfileSchema>;
}

/* the select definition */
function OccupationSelectField({ setValue, control, }: OccupationSelectFieldProps) {

	const { data: profileData} = useGetUserProfileQuery();
	const profile = profileData?.profile;

	useEffect(() => {
			if (profile?.occupation && isOccupation(profile.occupation)) {
				const occupationValue = occupationOptions.find(
					(option) => option.value === profile.occupation
				);
				if (occupationValue) {
					setValue("occupation", occupationValue.value);
				}
			}
		},
		[profile, setValue]);

	return (
		<div>
			<label htmlFor="occupation" className="h4-semibold dark:text-babyPowder">
				Occupation
			</label>
			<div className="mt-1 flex items-center space-x-3">
				<Briefcase className="dark:text-babyPowder size-8" />
					<Controller
						control={control}
						name="occupation"
						render={({ field }) => (
							<Select
								className="mt-1 w-full"
								{...field}
								options={occupationOptions}
								value={occupationOptions.find(
									(option) => option.value === field.value,
								)}
								onChange={(option) => field.onChange(option?.value)}
								instanceId="occupation-select"
								styles={customStyles}
							/>
						)}
					/>
			</div>
		</div>
	);
}

export default OccupationSelectField;
