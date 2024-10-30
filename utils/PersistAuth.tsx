"use client";
import React, { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks/typedHooks";
import { getCookie, setCookie } from "cookies-next";
import { setAuth, setLogout } from "@/lib/redux/features/auth/authSlice";

/* function to persist auth across navigation in our application*/
function PersistAuth() {
	/* get the dispatch function from our redux store*/
	const dispatch = useAppDispatch()

	useEffect(() =>{
		const isLoggedIn =	getCookie("logged_in") === "true";
		if(isLoggedIn){
      dispatch(setAuth());
    }else{
			dispatch(setLogout());
		}
	}, [dispatch]) //rerun if dispatch changes
	return null;
}

export default PersistAuth;