import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
 	baseUrl: "/api/v1",
 	credentials: "include" /* Inclut les cookies dans les requêtes */
 });

 export const baseApi = createApi({
 	reducerPath: "api",
 	baseQuery: baseQuery,
 	endpoints: (builder) => ({}),
 });


// import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";
// import {
//  BaseQueryFn,
//  FetchArgs,
//  FetchBaseQueryError,
// } from "@reduxjs/toolkit/query";
//
// // Importation de Mutex pour gérer les requêtes concurrentes
// import { Mutex } from "async-mutex";
//
// // Création d'un mutex pour synchroniser les tentatives de réauthentification
// const mutex = new Mutex();
//
// // Configuration de la requête de base avec l'URL de l'API et l'inclusion des credentials
// const baseQuery = fetchBaseQuery({
//  baseUrl: "/api/v1",
//  credentials: "include", // Permet d'inclure les cookies dans les requêtes
// });
//
// /**
//  * Intercepteur de requêtes personnalisé avec gestion de la réauthentification
//  *
//  * Cette fonction gère automatiquement les erreurs 401 (non autorisé) en :
//  * 1. Utilisant un mutex pour éviter les requêtes de rafraîchissement concurrentes
//  * 2. Tentant de rafraîchir le token d'authentification
//  * 3. Réessayant la requête initiale après rafraîchissement
//  * 4. Déconnectant l'utilisateur si le rafraîchissement échoue
//  */
// const baseQueryWithReauth: BaseQueryFn< string | FetchArgs, unknown,
//   FetchBaseQueryError > = async (args, api, extraOptions) => {
//  // Attente si une autre requête de réauthentification est en cours
//  await mutex.waitForUnlock();
//
//  // Exécution de la requête initiale
//  let response = await baseQuery(args, api, extraOptions);
//
//  // Gestion de l'erreur 401 (non autorisé)
//  if (response?.error && response?.error.status === 401) {
//   // Vérifie qu'aucune réauthentification n'est en cours
//   if (!mutex.isLocked()) {
//    // Acquisition du verrou pour éviter les requêtes concurrentes
//    const release = await mutex.acquire();
//    try {
//     // Tentative de rafraîchissement du token
//     const refreshResponse = await baseQuery(
//      {
//       url: "/auth/refresh/",
//       method: "POST",
//      },
//      api,
//      extraOptions,
//     );
//     // Si le rafraîchissement réussit
//     if (refreshResponse?.data) {
//      // Met à jour l'état d'authentification
//      api.dispatch(setAuth());
//      // Réessaie la requête initiale
//      response = await baseQuery(args, api, extraOptions);
//     } else {
//      // Si le rafraîchissement échoue, déconnecte l'utilisateur
//      api.dispatch(setLogout());
//     }
//    } finally {
//     // Libère le mutex dans tous les cas
//     release();
//    }
//   } else {
//    // Si une réauthentification est déjà en cours, attend son aboutissement
//    await mutex.waitForUnlock();
//    // Réessaie la requête initiale
//    response = await baseQuery(args, api, extraOptions);
//   }
//  }
//  // Retourne la réponse finale
//  return response;
// };
//
// /**
//  * Création de l'API Redux avec configuration avancée
//  *
//  * - Utilise l'intercepteur personnalisé pour la gestion des requêtes
//  * - Définit des types de tags pour le cache et la synchronisation
//  * - Configure le rechargement automatique des données
//  */
// export const baseApi = createApi({
//  reducerPath: "api", // Chemin du reducer dans le store Redux
//  baseQuery: baseQueryWithReauth, // Utilisation de l'intercepteur personnalisé
//  tagTypes: ["User", "Apartment", "Issue", "Report", "Post"], // Types de ressources pour le cache
//  refetchOnFocus: true, // Rechargement des données quand l'application reprend le focus
//  refetchOnMountOrArgChange: true, // Rechargement des données à la réinit ou changement d'arguments
//  endpoints: (builder) => ({}),
// });