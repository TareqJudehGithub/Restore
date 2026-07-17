import {
	Button,
	Menu,
	Fade,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Box,
} from "@mui/material";
import { useState } from "react";
import type { User } from "../models/User";
import { Person, History, Logout } from "@mui/icons-material";
import { useLogoutMutation } from "../features/account/accountApi";
import { useAppSelector } from "../store/store";
import { Link } from "react-router";

export default function UserMenu({ user }: UserMenuProps) {
	const { isLoading, darkMode } = useAppSelector((state) => state.ui);
	const [logout] = useLogoutMutation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			{darkMode ? (
				<>
					<Button size="large" sx={navLinkStyleDark} onClick={handleClick}>
						{user.email}
					</Button>

					<Menu
						sx={navLinkStyleDark}
						id="fade-menu"
						slotProps={{
							list: {
								"aria-labelledby": "fade-button",
							},
						}}
						slots={{ transition: Fade }}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
					>
						<MenuItem>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText>My Profile</ListItemText>
						</MenuItem>
						<MenuItem component={Link} to="/orders">
							<ListItemIcon>
								<History />
							</ListItemIcon>
							<ListItemText>My Orders</ListItemText>
						</MenuItem>
						<Divider />
						<MenuItem onClick={logout}>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</MenuItem>
					</Menu>
				</>
			) : (
				<>
					<Button size="large" sx={navLinkStyleLight} onClick={handleClick}>
						{user.email}
					</Button>

					<Menu
						sx={navLinkStyleLight}
						id="fade-menu"
						slotProps={{
							list: {
								"aria-labelledby": "fade-button",
							},
						}}
						slots={{ transition: Fade }}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
					>
						<MenuItem>
							<ListItemIcon>
								<Person />
							</ListItemIcon>
							<ListItemText>My Profile</ListItemText>
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<History />
							</ListItemIcon>
							<ListItemText>My Orders</ListItemText>
						</MenuItem>
						<Divider />
						<MenuItem onClick={logout}>
							<ListItemIcon>
								<Logout />
							</ListItemIcon>
							<ListItemText>Logout</ListItemText>
						</MenuItem>
					</Menu>
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
