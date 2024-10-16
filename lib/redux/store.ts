import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";

export const makeStore = () => {
	return configureStore(
		{
      reducer: {},
    }
	)
}

// setupListeners(makeStore().dispatch);

// Define your root state type
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

