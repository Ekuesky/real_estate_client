import { baseApi } from "@/lib/redux/features/api/baseApi";
import { NonTenantResponse, ProfileData, ProfileResponse, ProfilesResponse, QueryParams } from "@/types";

export const usersApi = baseApi.injectEndpoints({
 endpoints: (builder) => ({

    /* getAllUsers Query
     * @desc    Récupère la liste paginée de tous les utilisateurs avec possibilité de recherche
     * @param   {QueryParams} params - Paramètres de pagination et recherche
     * @returns {ProfilesResponse} Liste des profils utilisateurs avec métadonnées
     * @cache   Utilise le tag "User" pour la gestion du cache
     */
    getAllUsers: builder.query<ProfilesResponse, QueryParams>({
      query:(params: {}) => {
        const queryString = new URLSearchParams()

				/* QueryParams have a page and searchTerm field*/
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

    /* getAllTechnicians Query
     * @desc    Récupère la liste des techniciens (utilisateurs non-locataires)
     * @param   {QueryParams} params - Paramètres de pagination et recherche
     * @returns {NonTenantResponse} Liste des techniciens avec métadonnées
     * @cache   Utilise le tag "User" pour la gestion du cache
     */
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

    /* getUserProfile Query
     * @desc    Récupère le profil de l'utilisateur connecté
     * @returns {ProfileResponse} Données du profil utilisateur
     * @cache   Utilise le tag "User" pour la gestion du cache
     */
    getUserProfile: builder.query<ProfileResponse,void>({
      query: () => "/profiles/user/me/",
      providesTags: ["User"],
    }),

    /* updateUserProfile Mutation
     * @desc    Met à jour le profil de l'utilisateur
     * @param   {ProfileData} formData - Données du profil à mettre à jour
     * @returns {ProfileData} Données du profil mis à jour
     * @cache   Invalide le tag "User" pour forcer le rafraîchissement des données
     */
    updateUserProfile: builder.mutation<ProfileData, ProfileData>({
      query: (formData) => ({
        url: "/profiles/user/",
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: ["User"] /* After the mutation is executed successfully, any cached data associated with the user tag will be invalidated */
    })
 })
});

/* Export des hooks générés automatiquement par RTK Query
 * Ces hooks peuvent être utilisés directement dans les composants React
 * pour interagir avec l'API
 */
export const {
 useGetAllUsersQuery,
 useGetAllTechniciansQuery,
 useGetUserProfileQuery,
 useUpdateUserProfileMutation,
} = usersApi;