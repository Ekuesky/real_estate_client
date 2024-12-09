import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	searchTerm: "",
	page: 1,
	pageSize:3
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setSearchTerm: (state, action: PayloadAction<{searchTerm: string }>) => {
			state.searchTerm = action.payload.searchTerm;
		},
		setCurrentPage: (state, action: PayloadAction<{ page: number, pageSize?: number }>) => {
			state.page = action.payload.page;
			state.pageSize = action.payload.pageSize || state.pageSize;
		},
	},
});

export const { setSearchTerm, setCurrentPage } = userSlice.actions;
export default userSlice.reducer;