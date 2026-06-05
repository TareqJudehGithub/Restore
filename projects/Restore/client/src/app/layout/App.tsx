import { useEffect, useState } from "react";

import type { Product } from "../models/product";
import Catalog from "../features/catalog/Catalog";
import {
	Container,
	createTheme,
	ThemeProvider,
	Box,
	CssBaseline,
} from "@mui/material";
import NavBar from "./NavBar";

function App() {
	// States
	const [products, setProducts] = useState<Product[]>([]);
	const [darkMode, setDarkMode] = useState<boolean>(true);
	useEffect(() => {
		const url: string = "https://localhost:5001/api/products";

		const fetchData = async () => {
			const response = await fetch(url);
			const data = await response.json();

			setProducts(data);
		};
		fetchData();
	}, []);

	// Handlers
	function handleDarkMode(): void {
		return setDarkMode((darkMode) => !darkMode);
	}

	// Dark Mode theme
	//const darkMode: boolean = true;
	const paletteType = darkMode ? "dark" : "light";

	const theme = createTheme({
		palette: {
			mode: paletteType,
			background: {
				// Set background color based on palette mode
				default: paletteType === "light" ? "#eaeaea" : "#121212",
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<NavBar darkMode={darkMode} OnDarkMode={handleDarkMode} />
			<Box
				sx={{
					minHeight: "100vh",
					background: darkMode
						? "radial-gradient(circle, #172f9b, #111b27)"
						: "radial-gradient(circle, #baecf9, #f0f9ff)",
					py: 6,
				}}
			>
				<Container maxWidth="xl" sx={{ mt: 8 }}>
					<Catalog products={products} />
				</Container>
			</Box>
		</ThemeProvider>
	);
}

export default App;
