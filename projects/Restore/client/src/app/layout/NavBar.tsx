import { NavLink } from "react-router";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	ListItem,
	List,
	Box,
	Badge,
} from "@mui/material";
import { LightMode, DarkMode, ShoppingCart } from "@mui/icons-material";

export default function NavBar({ darkMode, OnDarkMode }: NavBarProps) {
	return (
		<AppBar position="fixed">
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Typography component={NavLink} to={"/"} variant="h6">
						Re-Store
					</Typography>

					<IconButton onClick={OnDarkMode}>
						{/* Dark mode toggle on/off */}
						{darkMode ? (
							<DarkMode sx={{ color: "silver" }} />
						) : (
							<LightMode sx={{ color: "yellow" }} />
						)}
					</IconButton>
				</Box>
				<List
					sx={{
						display: "flex",
					}}
				>
					{midLinks.map(({ title, path }) => (
						<ListItem
							component={NavLink}
							to={path}
							key={path}
							sx={{ color: "inherit", typography: "h6" }}
						>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>
				<List
					sx={{
						display: "flex",
					}}
				>
					<Box>
						<IconButton size="medium">
							<Badge badgeContent="0" color="secondary">
								<ShoppingCart sx={{ color: "inherit" }} />
							</Badge>
						</IconButton>
					</Box>
					{rightLinks.map(({ title, path }) => (
						<ListItem
							component={NavLink}
							to={path}
							key={path}
							sx={{ color: "inherit", typography: "h6" }}
						>
							{title.toUpperCase()}
						</ListItem>
					))}
				</List>
			</Toolbar>
		</AppBar>
	);
}

const midLinks = [
	{ title: "catalog", path: "/catalog" },
	{ title: "about", path: "/about" },
	{ title: "contact", path: "/contact" },
];

const rightLinks = [
	{ title: "login", path: "/login" },
	{ title: "register", path: "/register" },
];

type NavBarProps = {
	darkMode: boolean;
	OnDarkMode: () => void;
};
