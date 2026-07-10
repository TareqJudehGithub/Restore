import { string, z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email format!" })
		.min(1, { message: "Email is required(Zod)" }),
	password: string().min(6, {
		message: "Password must be at least 6 characters (Zod)",
	}),
});

export type loginSchema = z.infer<typeof loginSchema>;
