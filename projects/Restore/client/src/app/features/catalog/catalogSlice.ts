import { createSlice } from "@reduxjs/toolkit";
import type { ProductParams } from "../../models/productsParams";

const initialState: ProductParams = {
	pageNumber: 1,
	pageSize: 8,
	orderBy: "name",
	searchTerm: "",
	types: [],
	brands: [],
};

export const catalogSlice = createSlice({
	name: "catalogSlice",
	initialState,
	reducers: {
		setPageNumber(state, action) {
			state.pageNumber = action.payload;
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		setPageSize(state, action) {
			state.pageSize = action.payload;
		},
		setOrderBy(state, action) {
			state.orderBy = action.payload;
			state.pageNumber = 1;
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		setSearchTerm(state, action) {
			state.searchTerm = action.payload;
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		setTypes(state, action) {
			state.types = action.payload;
			state.pageNumber = 1;
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		setBrands(state, action) {
			state.brands = action.payload;
			state.pageNumber = 1;
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		resetParams() {
			window.scrollTo({ top: 0, behavior: "smooth" });
			return initialState;
		},
	},
});

export const {
	setPageNumber,
	setPageSize,
	setOrderBy,
	setSearchTerm,
	setTypes,
	setBrands,
	resetParams,
} = catalogSlice.actions;
