import {
	Button,
	Fade,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from "@mui/material";
import Menu, { type MenuProps } from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import { useState } from "react";
import type { User } from "../models/User";
import { Person, History, Logout, Inventory } from "@mui/icons-material";
import { useLogoutMutation } from "../features/account/accountApi";
import { useAppSelector } from "../store/store";
import { Link } from "react-router";

export default function UserMenu({ user }: UserMenuProps) {
	const { darkMode } = useAppSelector((state) => state.ui);
	const [logout] = useLogoutMutation();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			{...props}
		/>
	))(({ theme }) => ({
		"& .MuiPaper-root": {
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 180,
			color: "rgb(55, 65, 81)",
			boxShadow:
				"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
			"& .MuiMenu-list": {
				padding: "4px 0",
			},
			"& .MuiMenuItem-root": {
				"& .MuiSvgIcon-root": {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
					...theme.applyStyles("dark", {
						color: "inherit",
					}),
				},
				"&:active": {
					backgroundColor: alpha(
						theme.palette.primary.main,
						theme.palette.action.selectedOpacity,
					),
				},
			},
			...theme.applyStyles("dark", {
				color: theme.palette.grey[300],
			}),
		},
	}));

	return (
		<div>
			{darkMode ? (
				<>
					<Button
						size="large"
						sx={navLinkStyleDark}
						id="demo-customized-button"
						aria-controls={open ? "demo-customized-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open}
						disableElevation
						onClick={handleClick}
						endIcon={<KeyboardArrowDownIcon />}
					>
						{user.email}
					</Button>

					<StyledMenu
						id="demo-customized-menu"
						slotProps={{
							list: {
								"aria-labelledby": "demo-customized-button",
							},
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						sx={navLinkStyleDark}
					>
						<MenuItem onClick={handleClose} disableRipple>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText>My Profile</ListItemText>
						</MenuItem>
						<MenuItem
							onClick={handleClose}
							disableRipple
							component={Link}
							to="/orders"
						>
							<ListItemIcon>
								<History />
							</ListItemIcon>
							<ListItemText>My Orders</ListItemText>
						</MenuItem>

						{user.roles.includes("Admin") && (
							<MenuItem
								onClick={handleClose}
								disableRipple
								component={Link}
								to="/inventory"
							>
								<ListItemIcon>
									<History />
								</ListItemIcon>
								<ListItemText>Inventory</ListItemText>
							</MenuItem>
						)}
						<Divider />
						<MenuItem
							onClick={(e) => {
								logout(e.currentTarget.value);
								handleClose();
							}}
						>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</MenuItem>
					</StyledMenu>
				</>
			) : (
				<>
					<Button
						size="large"
						sx={navLinkStyleLight}
						id="demo-customized-button"
						aria-controls={open ? "demo-customized-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open}
						disableElevation
						onClick={handleClick}
						endIcon={<KeyboardArrowDownIcon />}
					>
						{user.email}
					</Button>

					<StyledMenu
						id="demo-customized-menu"
						slotProps={{
							list: {
								"aria-labelledby": "demo-customized-button",
							},
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						sx={navLinkStyleLight}
					>
						<MenuItem onClick={handleClose} disableRipple>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText>My Profile</ListItemText>
						</MenuItem>
						<MenuItem
							onClick={handleClose}
							disableRipple
							component={Link}
							to="/orders"
						>
							<ListItemIcon>
								<History />
							</ListItemIcon>
							<ListItemText>My Orders</ListItemText>
						</MenuItem>

						{user.roles.includes("Admin") && (
							<MenuItem
								onClick={handleClose}
								disableRipple
								component={Link}
								to="/inventory"
							>
								<ListItemIcon>
									<Inventory />
								</ListItemIcon>
								<ListItemText>Inventory</ListItemText>
							</MenuItem>
						)}
						<Divider />

						<MenuItem
							onClick={(e) => {
								logout(e.currentTarget.value);
								handleClose();
							}}
						>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</MenuItem>
					</StyledMenu>
				</>
			)}
		</div>
	);
}

type UserMenuProps = {
	user: User;
};

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
