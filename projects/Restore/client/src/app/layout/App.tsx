import { useAppSelector } from "../store/store";

import { Outlet } from "react-router";
import {
	Container,
	createTheme,
	ThemeProvider,
	Box,
	CssBaseline,
} from "@mui/material";

import NavBar from "./NavBar";
import { Footer } from "./Footer";

function App() {
	const { darkMode } = useAppSelector((state) => state.ui);
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
			<NavBar />
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
					{/* <Catalog /> */}
					<Outlet />
				</Container>
			</Box>
			<Footer />
		</ThemeProvider>
	);
}

export default App;
