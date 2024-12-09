import { baseApi } from "@/lib/redux/features/api/baseApi";
import authReducer from "@/lib/redux/features/auth/authSlice"
import userReducer from "@/lib/redux/features/users/userSlice"
import apartReducer from "@/lib/redux/features/apartments/apartSlice"

export const rootReducer = {
	[baseApi.reducerPath]: baseApi.reducer,
	auth: authReducer,
	user: userReducer,
	apart: apartReducer,
};