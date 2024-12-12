import { baseApi } from "@/lib/redux/features/api/baseApi";
import { IssueResponse, MyIssuesResponse, ReportIssueData } from "@/types";


export const issueApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
    getMyIssues: builder.query< MyIssuesResponse,void >(
			{
				query: () => "issues/me/",
				providesTags:["Issue"]
			}
		),
		getMyAssignedIssues: builder.query< MyAssignedIssuesResponse,string >({
			query: () => "issues/assigned/",
			providesTags:["Issue"]
		}),

		getIssueDetail: builder.query< IssueResponse,string>({
			query:({ issueId })=>({
				url: `issues/${issueId}/`,
        method: "GET",
			}),
			providesTags:["Issue"]
		}),

		updateIssueStatus: builder.mutation< IssueResponse, ReportIssueData >({
			query: ({ apartmentId,...formData})=> ({
				url: `issues/create/${apartmentId}/`,
				method: "PATCH",
				body: formData,
			}),
      invalidatesTags:["Issue"]
    }),
		deleteIssue: builder.mutation<void ,string >({
			query: ({issueId}) => (
				{
					url: `issues/${issueId}/delete/`,
					method: "DELETE"
				}
			),
			invalidatesTags:["Issue"]
		}),

		addIssue: builder.mutation< IssueResponse, ReportIssueData >({
			query: ({apartment_id, ...formData})=> ({
				url: `issues/apartments/${apartment_id}/`,
        method: "POST",
        body: formData,
			}),
      invalidatesTags:["Issue"]
    }),


  })
})

export const {
	useGetMyIssuesQuery,
  useGetMyAssignedIssuesQuery,
  useGetIssueDetailQuery,
  useUpdateIssueStatusMutation,
  useDeleteIssueMutation,
  useAddIssueMutation,
} = issueApi