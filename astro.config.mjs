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
        "/portfolio/takuan/slides":
            "https://docs.google.com/presentation/d/1cc79qzBIWZDFOE1Q0r_E7gS4jlnT_G0ALNRHSyBSiWw/view",
        "/gh": "https://github.com/NateLevin1/",
        "/github": "https://github.com/NateLevin1/",
    },
});
