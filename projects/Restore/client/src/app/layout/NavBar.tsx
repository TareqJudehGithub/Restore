import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useAppSelector, useAppDispatch } from "../store/store";
import { useFetchBasketQuery } from "../features/basket/basketApi";
import { useUserInfoQuery } from "../features/account/accountApi";

import { setDarkMode } from "./uiSlice";
import {
	LightMode,
	DarkMode,
	ShoppingCart,
	Menu,
	Close,
	Storefront,
	Login as LoginIcon,
	InfoOutlined,
} from "@mui/icons-material";
import type { Item } from "../models/basket";
import UserMenu from "./UserMenu";
import {
	AppBar,
	Toolbar,
	IconButton,
	ListItem,
	List,
	Box,
	Badge,
	LinearProgress,
	Typography,
	Divider,
	Collapse,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Button,
	useTheme,
	useMediaQuery,
} from "@mui/material";

export default function NavBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { data: user } = useUserInfoQuery();

	const { isLoading, darkMode } = useAppSelector((state) => state.ui);
	const dispatch = useAppDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	const { data: basket } = useFetchBasketQuery();

	// Single item count
	const itemCount =
		basket?.items.reduce(
			(sum: number, item: Item) => sum + item.quantity,
			0,
		) || 0;

	return (
		<AppBar position="fixed">
			<Toolbar
				sx={{
					display: "flex",
					justifyContent: "space-evenly",
					typography: "h6",
					minHeight: { xs: 72, md: 64 },
					px: { xs: 1.5, md: 2 },
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						textDecoration: "none",
						fontSize: 22,
						textTransform: "uppercase",
					}}
				>
					<Typography
						component={NavLink}
						to={"/"}
						variant="inherit"
						sx={{
							...navLinkStyleDark,
							px: 1.5,
							textShadow: "0.5px 0.5px 1px white",
						}}
					>
						Winter Adventures
					</Typography>

					{/* <Typography component={NavLink} to={"/"} variant="inherit">
						Winter Adventures
					</Typography> */}

					<IconButton onClick={() => dispatch(setDarkMode())}>
						{darkMode ? (
							<DarkMode sx={{ color: "silver" }} />
						) : (
							<LightMode sx={{ color: "yellow" }} />
						)}
					</IconButton>
				</Box>

				{!isMobile ? (
					<>
						<List
							sx={{
								display: "flex",

								justifyContent: "center",
								gap: 1,
								m: { md: "0 auto", lg: "0 auto" },
								//	mr: { md: 1, lg: 2 },
							}}
						>
							{midLinks.map(({ title, path }) =>
								darkMode ? (
									<ListItem
										component={NavLink}
										to={path}
										key={path}
										sx={{ ...navLinkStyleDark, px: 1.5 }}
									>
										{title.toUpperCase()}
									</ListItem>
								) : (
									<ListItem
										component={NavLink}
										to={path}
										key={path}
										sx={{ ...navLinkStyleLight, px: 1.5 }}
									>
										{title.toUpperCase()}
									</ListItem>
								),
							)}
						</List>
						<List sx={{ display: "flex", alignItems: "center", ml: "0" }}>
							<Box>
								<IconButton size="medium" component={Link} to="/basket">
									<Badge badgeContent={itemCount} color="secondary">
										<ShoppingCart
											sx={{ color: darkMode ? "inherit" : "white" }}
										/>
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
					</>
				) : (
					<IconButton
						onClick={() => setMobileMenuOpen((open) => !open)}
						sx={{ ml: "auto" }}
					>
						{mobileMenuOpen ? <Close /> : <Menu />}
					</IconButton>
				)}
			</Toolbar>

			<Collapse in={isMobile && mobileMenuOpen} timeout="auto" unmountOnExit>
				<Box
					sx={{
						px: 2,
						pb: 2,
						bgcolor: "background.paper",
						borderTop: 1,
						borderColor: "divider",
						color: darkMode ? "white" : "#172f9b",
					}}
				>
					<List
						disablePadding
						sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
					>
						<ListItemButton
							component={Link}
							to="/basket"
							onClick={() => setMobileMenuOpen(false)}
							sx={{ borderRadius: 2 }}
						>
							<ListItemIcon>
								<ShoppingCart />
							</ListItemIcon>
							<ListItemText primary="Shopping Cart" />
						</ListItemButton>

						<ListItemButton
							component={NavLink}
							to="/catalog"
							onClick={() => setMobileMenuOpen(false)}
							sx={{ borderRadius: 2 }}
						>
							<ListItemIcon>
								<Storefront />
							</ListItemIcon>
							<ListItemText primary="Catalog" />
						</ListItemButton>

						<Divider sx={{ my: 1 }} />

						<ListItemButton
							component={NavLink}
							to="/login"
							onClick={() => setMobileMenuOpen(false)}
							sx={{ borderRadius: 2 }}
						>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText primary="Login" />
						</ListItemButton>

						<Divider sx={{ my: 1 }} />

						<ListItemButton
							component={NavLink}
							to="/about"
							onClick={() => setMobileMenuOpen(false)}
							sx={{ borderRadius: 2 }}
						>
							<ListItemIcon>
								<InfoOutlined />
							</ListItemIcon>
							<ListItemText primary="About" />
						</ListItemButton>

						<Button
							component={NavLink}
							to="/contact"
							onClick={() => setMobileMenuOpen(false)}
							variant="contained"
							sx={{
								mt: 1,
								borderRadius: 999,
								py: 1,
								justifyContent: "center",
							}}
						>
							Contact
						</Button>
					</List>
				</Box>
			</Collapse>

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
	// { title: "register", path: "/register" },
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
