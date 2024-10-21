import { baseApi } from "@/lib/redux/features/api/baseApi";
import authReducer from "@/lib/redux/features/auth/authSlice"

export const rootReducer = {
	[baseApi.reducerPath]: baseApi.reducer,
	auth: authReducer,
};