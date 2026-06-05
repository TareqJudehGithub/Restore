import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

export default function NavBar({ darkMode, OnDarkMode }: NavBarProps) {
	return (
		<AppBar position="fixed">
			<Toolbar>
				<Typography variant="h6">Re-Store</Typography>
				<IconButton onClick={OnDarkMode}>
					{/* Dark mode toggle on/off */}
					{darkMode ? (
						<DarkMode sx={{ color: "silver" }} />
					) : (
						<LightMode sx={{ color: "yellow" }} />
					)}
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}

type NavBarProps = {
	darkMode: boolean;
	OnDarkMode: () => void;
};
