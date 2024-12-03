import { baseApi } from "@/lib/redux/features/api/baseApi";
import {
	ApartmentData,
	ApartmentResponse,
	AssignApartmentData,
	AssignApartmentResponse,
	AvailableApartmentsResponse,
	MessageResponse,
} from "@/types";

export const apartApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAvailableApartment: builder.query<AvailableApartmentsResponse, void>(
			{
				query: () => "apartments/available/",
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
	useReleaseApartmentMutation,
	useAssignApartmentMutation,
	useAddApartmentMutation,
} = apartApi;
