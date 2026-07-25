import { z } from "zod";

// PictureUrl file uploaded
const fileSchema = z.instanceof(File).refine((file) => file.size > 0, {
	error: "A file must be uploaded for the product.",
});
export const createProductScheme = z
	.object({
		name: z.string({ error: "Name is required." }),
		description: z
			.string({ error: "Description is required" })
			.min(10, { error: "Description must be at least 10 characters long." }),
		price: z.coerce
			.number<number>({ error: "Price is required" })
			.min(1, { error: "Price must be at least $1.00" }),
		type: z.string({ error: "Type is required" }),
		brand: z.string({ error: "Brand is required" }),
		quantityInStock: z.coerce
			.number<number>({ error: "Quantity is required" })
			.min(1, { error: "Quantity must be at least 1" }),
		pictureUrl: z.string().optional(),
		file: fileSchema.optional(),
	})
	.refine((data) => data.pictureUrl || data.file, {
		error: "Product image is required.",
		path: ["file"],
	});

export type CreateProductScheme = z.infer<typeof createProductScheme>;
