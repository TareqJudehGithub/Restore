import {
	Button,
	Menu,
	Fade,
	MenuItem,
	ListItemIcon,
	ListItemText,
	Divider,
} from "@mui/material";
import { useState } from "react";
import type { User } from "../models/User";
import { Person, History, Logout } from "@mui/icons-material";
import {
	useLoginMutation,
	useLogoutMutation,
} from "../features/account/accountApi";

export default function UserMenu({ user }: UserMenuProps) {
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
			<Button onClick={handleClick}>{user.email}</Button>
			<Menu
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
		</div>
	);
}

type UserMenuProps = {
	user: User;
};
