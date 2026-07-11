import { Link, NavLink } from "react-router";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useFetchBasketQuery } from "../features/basket/basketApi";
import { setDarkMode } from "./uiSlice";

import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	ListItem,
	List,
	Box,
	Badge,
	LinearProgress,
} from "@mui/material";

import { LightMode, DarkMode, ShoppingCart } from "@mui/icons-material";
import type { Item } from "../models/basket";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../features/account/accountApi";

export default function NavBar() {
	const { data: user } = useUserInfoQuery();

	const { isLoading, darkMode } = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();

	const { data: basket } = useFetchBasketQuery();

	// Single item count
	const itemCount =
		basket?.items.reduce(
			(sum: number, item: Item) => sum + item.quantity,
			0,
		) || 0;

	//TODO: Cart total

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

					<IconButton onClick={() => dispatch(setDarkMode())}>
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
						<IconButton size="medium" component={Link} to="/basket">
							<Badge badgeContent={itemCount} color="secondary">
								<ShoppingCart sx={{ color: darkMode ? "inherit" : "white" }} />
							</Badge>
						</IconButton>
					</Box>

					{user ? (
						<ListItem sx={navLinkStyleDark}>
							<UserMenu user={user} />
						</ListItem>
					) : (
						rightLinks.map(({ title, path }) => (
							<ListItem
								component={NavLink}
								to={path}
								key={path}
								sx={navLinkStyleDark}
							>
								{title.toUpperCase()}
							</ListItem>
						))
					)}
				</List>
			</Toolbar>
			{isLoading && (
				<Box sx={{ width: "100%" }}>
					<LinearProgress aria-label="Loading…" />
				</Box>
			)}
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
