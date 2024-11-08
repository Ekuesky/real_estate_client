import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";

export function useUserProfile(){
	const {isAuthenticated } = useAppSelector((state) => state.auth)
	const {data, isLoading, isError} = useGetUserProfileQuery(undefined,{
		skip: !isAuthenticated,
	});
	return { profile: data?.profile, isLoading, isError};
}