import { useAppSelector } from "@/lib/redux/hooks/typedHooks";
import { useGetUserProfileQuery } from "@/lib/redux/features/users/usersApi";

export function useUserProfile(){
	const {isAuthenticated } = useAppSelector((state) => state.auth) /* get isAuthenticated state from auth slice */
	const {data, isLoading, isError} = useGetUserProfileQuery(undefined,{
		skip: !isAuthenticated /* skip this instruction if not authenticated */
	});
	return { profile: data?.profile, isLoading, isError};
}