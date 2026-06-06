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
					typography: "h6",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						textDecoration: "none",
						fontSize: 24,
						textTransform: "uppercase",
					}}
				>
					{darkMode ? (
						<Typography
							component={NavLink}
							to={"/"}
							variant="inherit"
							sx={navLinkStyleDark}
						>
							Re-Store
						</Typography>
					) : (
						<Typography
							component={NavLink}
							to={"/"}
							variant="inherit"
							sx={navLinkStyleLight}
						>
							Re-Store
						</Typography>
					)}

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
					{midLinks.map(({ title, path }) =>
						darkMode ? (
							<ListItem
								component={NavLink}
								to={path}
								key={path}
								sx={navLinkStyleDark}
							>
								{title.toUpperCase()}
							</ListItem>
						) : (
							<ListItem
								component={NavLink}
								to={path}
								key={path}
								sx={navLinkStyleLight}
							>
								{title.toUpperCase()}
							</ListItem>
						),
					)}
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
					{rightLinks.map(({ title, path }) =>
						darkMode ? (
							<ListItem
								component={NavLink}
								to={path}
								key={path}
								sx={navLinkStyleDark}
							>
								{title.toUpperCase()}
							</ListItem>
						) : (
							<ListItem
								component={NavLink}
								to={path}
								key={path}
								sx={navLinkStyleLight}
							>
								{title.toUpperCase()}
							</ListItem>
						),
					)}
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

const navLinkStyleDark = {
	color: "inherit",
	textDecoration: "none",
	":hover": {
		color: "gray",
		textShadow: "1px 1px grey",
	},
	"&.active": {
		color: "#baecf9",
	},
};
const navLinkStyleLight = {
	color: "inherit",
	textDecoration: "none",
	":hover": {
		color: "#baecf9",
		textShadow: "1px 1px grey",
	},
	"&.active": {
		color: "#baecf9",
	},
};

type NavBarProps = {
	darkMode: boolean;
	OnDarkMode: () => void;
};
