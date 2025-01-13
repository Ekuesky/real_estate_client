import { baseApi } from "@/lib/redux/features/api/baseApi";
import {
	ApartmentData,
	ApartmentResponse,
	AssignApartmentData,
	AssignApartmentResponse,
	ApartmentsResponse,
	MessageResponse, QueryParams
} from "@/types";

export const apartApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({

		getMyApartments: builder.query<ApartmentsResponse,void>({
			query: () => "apartments/me/",
      providesTags:["Apartment"]
		})
		,
		getAvailableApartment: builder.query<ApartmentsResponse, QueryParams>(
			{
				query: (params:{}) => {
					const queryString = new URLSearchParams()
					if (params?.page) {
            queryString.append("page", params.page.toString())
          }
					if (params?.pageSize) {
            queryString.append("pageSize", params.pageSize)
          }
					return `apartments/available/?${queryString.toString()}`
				}
			},
		),

		releaseApartment: builder.mutation<MessageResponse, void>({
			query: (uid) => ({
				url: `apartments/${uid}/release/`,
				method: "PATCH",
			}),
			invalidatesTags: ["Apartment"],
		}),

		assignApartment: builder.mutation<
			AssignApartmentResponse,
			AssignApartmentData
		>({
			query: ({ uid, tenant }) => ({
				url: `apartments/${uid}/assign/`,
				method: "PATCH",
				body: tenant,
			}),
			invalidatesTags: ["Apartment"],
		}),

		addApartment: builder.mutation<ApartmentResponse, ApartmentData>({
			query: (formData) => ({
				url: "apartments/",
				method: "POST",
				body: formData,
			}),
		}),
	}),
});

export const {
	useGetAvailableApartmentQuery,
	useGetMyApartmentsQuery,
	useReleaseApartmentMutation,
	useAssignApartmentMutation,
	useAddApartmentMutation,
} = apartApi;
