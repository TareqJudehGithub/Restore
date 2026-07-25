import { createBrowserRouter, Navigate } from "react-router";

import App from "../layout/App";
import Catalog from "../features/catalog/Catalog";
import BasketPage from "../features/basket/BasketPage";
import HomePage from "../features/home/HomePage";
import ContactPage from "../features/contact/ContactPage";
import ProductDetails from "../features/catalog/ProductDetails";
import AboutPage from "../features/about/AboutPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CheckoutPage from "../features/checkout/CheckoutPage";
import LoginForm from "../features/account/LoginForm";
import RegisterForm from "../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import CheckoutSuccess from "../features/checkout/CheckoutSuccess";
import OrdersPage from "../features/Orders/OrdersPage";
import OrderDetailedPage from "../features/Orders/OrderDetailedPage";
import InventoryPage from "../features/admin/InventoryPage";
import ProductForm from "../features/admin/ProductForm";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				// Only authorized users can access CheckoutPage
				element: <RequireAuth />,
				children: [
					{ path: "checkout", element: <CheckoutPage /> },
					{ path: "checkout/success", element: <CheckoutSuccess /> },
					{ path: "orders", element: <OrdersPage /> },
					{ path: "orders/:id", element: <OrderDetailedPage /> },
					{ path: "inventory", element: <InventoryPage /> },
					{
						path: "productForm",
						element: <ProductForm product={undefined} />,
					},
				],
			},
			{ path: "", element: <HomePage /> },
			{ path: "catalog", element: <Catalog /> },
			{ path: "catalog/:id", element: <ProductDetails /> },
			{ path: "basket", element: <BasketPage /> },
			{ path: "about", element: <AboutPage /> },
			{ path: "contact", element: <ContactPage /> },
			{ path: "checkout", element: <CheckoutPage /> },
			{ path: "register", element: <RegisterForm /> },
			{ path: "login", element: <LoginForm /> },
			{ path: "server-error", element: <ServerError /> },
			{ path: "not-found", element: <NotFound /> },
			{ path: "*", element: <Navigate replace to="/not-found" /> },
		],
	},
]);
