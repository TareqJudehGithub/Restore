import { createSlice } from "@reduxjs/toolkit";

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
	},
});

// Dispatch actions
export const { startLoading, stopLoading, setDarkMode } = uiSlice.actions;
