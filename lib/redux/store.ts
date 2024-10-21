import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rootReducer } from "@/lib/redux/features/rootReducer";
import { baseApi } from "@/lib/redux/features/api/baseApi";

// Définition de la fonction makeStore pour créer le store
export const makeStore = () => {
  const store = configureStore({
		// Configuration du reducer principal pour le store
    reducer: rootReducer,
		// Configuration du middleware
    middleware: (getDefaultMiddleware) =>
			 // Ajout du middleware de la slice API aux middlewares par défaut
      getDefaultMiddleware().concat(baseApi.middleware),
		// Activation des Redux DevTools en mode développement
    devTools: process.env.NODE_ENV === 'development',
  });
  // Setup listeners pour RTK Query
  setupListeners(store.dispatch);

  return store;
};

// Définition du type AppStore comme le retour de la fonction makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Définition du type RootState comme le retour de la méthode getState du store
export type RootState = ReturnType<AppStore["getState"]>;
// Définition du type AppDispatch comme la méthode dispatch du store
export type AppDispatch = AppStore["dispatch"];