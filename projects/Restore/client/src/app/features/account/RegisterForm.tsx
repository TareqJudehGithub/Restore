import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useRegisterMutation } from "./accountApi";
import {
	registerSchema,
	type RegisterSchema,
} from "../../../lib/Schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { getErrorMessage } from "../../errors/ToastErrors";
import { toast } from "react-toastify";
import {
	Container,
	Paper,
	Box,
	Typography,
	TextField,
	Button,
	InputAdornment,
	IconButton,
} from "@mui/material";

export default function RegisterForm() {
	const [registerUser, { isLoading }] = useRegisterMutation();
	const [showPassword, setShowPassword] = useState(false);
	//const [submitError, setSubmitError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm<RegisterSchema>({
		mode: "onSubmit",
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterSchema) => {
		// setSubmitError(null);
		// if (!isValid) {
		// 	return;
		// }
		try {
			await registerUser(data).unwrap();
		} catch (error) {
			const message = getErrorMessage(error);
			//		setSubmitError(message);
			setError("email", { message: message });
		}
	};

	return (
		<Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: 8,
				}}
			>
				<LockOutlined
					sx={{
						mt: 3,
						fontSize: 40,
					}}
					color="secondary"
				/>
				<Typography variant="h5" sx={{ mt: 2 }}>
					Sign Up
				</Typography>
				<Box
					component="form"
					sx={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						gap: 3,
						marginY: 3,
					}}
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						fullWidth
						label="Email"
						defaultValue=""
						placeholder="john.smith@example.com"
						autoFocus
						{...register("email")}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						fullWidth
						label="Password"
						type={showPassword ? "text" : "password"}
						autoComplete="on"
						{...register("password")}
						error={!!errors.password}
						helperText={
							errors.password
								? errors.password?.message
								: "At least must contain: 8 characters, one lowercase letter (a-z), one uppercase letter (A-Z), one number (0-9), and one special symbol (!@#$)"
						}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											onClick={() => setShowPassword((prev) => !prev)}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
						//helperText={errors.password?.message}
					/>
					<TextField
						fullWidth
						label="Confirm Password"
						type={showPassword ? "text" : "password"}
						autoComplete="on"
						{...register("confirmPassword")}
						error={!!errors.confirmPassword}
						helperText={errors.confirmPassword?.message}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
											onClick={() => setShowPassword((prev) => !prev)}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							},
						}}
					/>
					<Button disabled={isLoading} variant="contained" type="submit">
						Sign Up
					</Button>
					<Typography sx={{ textAlign: "center" }}>
						Already have an account?
						<Typography
							sx={{ ml: 2 }}
							component={Link}
							to="/login"
							color="primary"
						>
							Sign In
						</Typography>
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}
