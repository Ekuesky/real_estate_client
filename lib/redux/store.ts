import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "@/lib/redux/features/rootReducer";
import { baseApi } from "@/lib/redux/features/api/baseApi";


let store: ReturnType<typeof makeStore> | undefined;

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    devTools: process.env.NODE_ENV === "development",
  });
  /* Utilisation du pattern singleton
   Configure les listeners une seule fois lors de la création du store */
  setupListeners(store.dispatch);

  return store;
};

/* Définition du type AppStore comme le retour de la fonction makeStore */
export type AppStore = ReturnType<typeof makeStore>;
/* Définition du type RootState comme le retour de la méthode getState du store */
export type RootState = ReturnType<AppStore["getState"]>;
/* Définition du type AppDispatch comme la méthode dispatch du store */
export type AppDispatch = AppStore["dispatch"];