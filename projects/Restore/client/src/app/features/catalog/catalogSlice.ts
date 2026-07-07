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
		},
		setPageSize(state, action) {
			state.pageSize = action.payload;
		},
		setOrderBy(state, action) {
			state.orderBy = action.payload;
			state.pageNumber = 1;
		},
		setSearchTerm(state, action) {
			state.searchTerm = action.payload;
		},
		setTypes(state, action) {
			state.types = action.payload;
			state.pageNumber = 1;
		},
		setBrands(state, action) {
			state.brands = action.payload;
			state.pageNumber = 1;
		},
		resetParams() {
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
