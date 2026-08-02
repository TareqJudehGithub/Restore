import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
	build: {
		outDir: "../API/wwwroot",
		chunkSizeWarningLimit: 1024,
		emptyOutDir: true,
	},
	server: {
		port: 3000,
	},
	plugins: [react(), mkcert(), tailwindcss(), flowbiteReact()],
});
