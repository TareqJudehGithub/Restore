import { z } from "zod";

export const registerSchema = z
	.object({
		email: z
			.string()
			.email({ message: "Invalid email address" })
			.min(1, { message: "Email is required(Zod)" }),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
			.regex(/[a-z]/, "Password must contain at least one lowercase letter")
			.regex(/[0-9]/, "Password must contain at least one number")
			.regex(
				/[^A-Za-z0-9]/,
				"Password must contain at least one special character",
			),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.superRefine(({ password, confirmPassword }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "Password and Confirm Password must match",
				path: ["confirmPassword"], // Sets the error specifically on the confirmPassword field in RegisterForm
			});
		}
	});
export type RegisterSchema = z.infer<typeof registerSchema>;
