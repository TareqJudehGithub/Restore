import { useLocation, Navigate, Outlet } from "react-router";
import { useUserInfoQuery } from "../features/account/accountApi";
import { Box } from "@mui/material";

export default function RequireAuth() {
	const { data: user, isLoading } = useUserInfoQuery();

	const location = useLocation();

	if (isLoading) return <Box>Loading...</Box>;
	if (!user) {
		return <Navigate to="login" state={{ from: location }} />;
	}
	return <Outlet />;
}
