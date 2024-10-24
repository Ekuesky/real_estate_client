"use client";

import { AppStore, makeStore } from "@/lib/redux/store";
import React, { useRef } from "react";
import { Provider } from "react-redux";

interface ProviderProps {
	children: React.ReactNode;
}

export default function ReduxProvider({ children }: ProviderProps) {
	/* Utilisation de useRef pour maintenir la référence du store entre les re-renders */
	const storeRef = useRef<AppStore>();

	/* Création du store uniquement si il n'existe pas déjà */
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return(
		<Provider store={storeRef.current}>
			{children}
	  </Provider>
	)
}