import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { router } from "./app/routes/Routes";

import { store } from "./app/store/store";
import { Provider } from "react-redux";
// Styles
import "./app/layout/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);

{
	/*
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { catalogApi } from "./app/features/catalog/catalogApi";
 <ApiProvider api={catalogApi}>
	<RouterProvider router={router} />
</ApiProvider> */
}
