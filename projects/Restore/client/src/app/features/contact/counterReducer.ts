import { createSlice } from "@reduxjs/toolkit";

export default function counterReducer(
	state = initialState,
	action: { type: string; payload: number },
) {
	switch (action.type) {
		case "increment":
			return {
				...state,
				data: state.data + action.payload,
			};
		case "decrement":
			return {
				...state,
				data: state.data - action.payload,
			};
		default:
			return state;
	}
}
const initialState: CounterState = {
	data: 42,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		// Actions
		increment: (state, action) => {
			state.data += action.payload;
		},
		decrement: (state, action) => {
			state.data -= action.payload;
		},
	},
});

export type CounterState = {
	data: number;
};

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions;

//#region Redux Legacy
export function incrementLegacy(amount = 1) {
	return {
		type: "increment",
		payload: amount,
	};
}
export function decrementLegacy(amount = 1) {
	return {
		type: "decrement",
		payload: amount,
	};
}
//#endregion
