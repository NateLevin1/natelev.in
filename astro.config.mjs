// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://natelev.in/",
    vite: {
        plugins: [tailwindcss()],
    },
    output: "static",
    redirects: {
        "/portfolio": "/#my-work",
        "/gh": "https://github.com/NateLevin1/",
        "/github": "https://github.com/NateLevin1/",
    },
});
