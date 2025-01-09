// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: "https://natelev.in/",
    integrations: [tailwind()],
    output: "static",
    redirects: {
        "/portfolio": "/#my-work",
        "/gh": "https://github.com/NateLevin1/",
        "/github": "https://github.com/NateLevin1/",
    },
});
