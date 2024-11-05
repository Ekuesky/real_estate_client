import { baseApi } from "@/lib/redux/features/api/baseApi";
import { NonTenantResponse, ProfileData, ProfileResponse, ProfilesResponse, QueryParams } from "@/types";


export const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({

		getAllUsers: builder.query<ProfilesResponse, QueryParams>({
			query:(params: {}) => {
				const queryString = new URLSearchParams()

				if (params.page) {
          queryString.append("page", params.page.toString())
        }
				if (params.searchTerm) {
          queryString.append("search", params.searchTerm)
        }
				return `/profiles/?${queryString.toString()}`;
			},
			providesTags: ["User"]
		}),

		getAllTechnicians: builder.query<NonTenantResponse, QueryParams>({
			query: (params: {}) => {
        const queryString = new URLSearchParams()

        if (params.page) {
          queryString.append("page", params.page.toString())
        }
        if (params.searchTerm) {
          queryString.append("search", params.searchTerm)
        }
        return `/profiles/non-tenant-profiles/?${queryString.toString()}`;
      },
      providesTags: ["User"]
		}),

		getUserProfile: builder.query<ProfileResponse,void>({
			query: () => "/profile/user/me/",
      providesTags: ["User"],
		}),

		updateUserProfile: builder.query<ProfileData, ProfileData>({
			query: (formData) => ({
        url: "/profiles/user/",
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: ["User"]
		})
	})

});

export const {
	useGetAllUsersQuery,
  useGetAllTechniciansQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} = usersApi;