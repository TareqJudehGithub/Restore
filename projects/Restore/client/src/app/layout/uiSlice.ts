import { createSlice } from "@reduxjs/toolkit";
import { number } from "zod";
import type { Product } from "../models/product";

// Dark Mode theme
const getInitialDarkMode = (): boolean => {
	const storedDarkMode: string | null = localStorage.getItem("darkMode");
	return storedDarkMode ? JSON.parse(storedDarkMode) : true;
};

export const uiSlice = createSlice({
	name: "ui",
	// States
	initialState: {
		isLoading: false,
		darkMode: getInitialDarkMode(),
		inventoryEditMode: false,
	},
	reducers: {
		startLoading: (state) => {
			state.isLoading = true;
		},
		stopLoading: (state) => {
			state.isLoading = false;
		},
		setDarkMode: (state) => {
			localStorage.setItem("darkMode", JSON.stringify(!state.darkMode));
			state.darkMode = !state.darkMode;
		},
		setInventoryEditMode: (state, action) => {
			state.inventoryEditMode = action.payload;
		},
	},
});

// Dispatch actions
export const { startLoading, stopLoading, setDarkMode, setInventoryEditMode } =
	uiSlice.actions;
