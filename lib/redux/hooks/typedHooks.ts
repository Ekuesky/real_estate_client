import type { AppDispatch, AppStore, RootState } from "@/lib/redux/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";

// Définit un hook personnalisé pour obtenir la fonction dispatch du store.
// Retourne la fonction dispatch du store, typée comme AppDispatch.
export const useAppDispatch: () => AppDispatch = useDispatch;

// Définit un hook personnalisé pour accéder au state du store.
// Retourne un hook useSelector typé avec RootState, permettant d'utiliser useSelector avec des types corrects pour le state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Définit un hook personnalisé pour obtenir une référence au store.
// Retourne le store, typé comme AppStore.
export const useAppStore: () => AppStore = useStore;