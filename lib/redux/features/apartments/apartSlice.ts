import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	page: 1,
	pageSize:3
};

const apartSlice = createSlice({
	name: "apart",
	initialState,
	reducers: {
		setPagination: (state, action: PayloadAction<{ page: number, pageSize?: number }>) => {
			state.page = action.payload.page;
			state.pageSize = action.payload.pageSize || state.pageSize;

		},

	},
});

export const { setPagination } = apartSlice.actions;
export default apartSlice.reducer;