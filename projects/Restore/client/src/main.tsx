import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import { router } from "./app/routes/Routes";

import { Provider } from "react-redux";
import { store } from "./app/store/store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styles
import "./app/layout/styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<ToastContainer
				position="bottom-right"
				hideProgressBar
				theme="colored"
			/>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
);

//#region ApiProvider - no store
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// import { catalogApi } from "./app/features/catalog/catalogApi";
//  <ApiProvider api={catalogApi}>
// 	<RouterProvider router={router} />
// </ApiProvider>
//#endregion
