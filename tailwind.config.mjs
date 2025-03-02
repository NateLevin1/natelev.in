/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                link: "#02375B",
                background: "#FFFDF9",
            },
            fontFamily: {
                title: ["'Crimson Text'", "serif"],
                body: ["'Source Serif 4'", "serif"],
            },
            animation: {
                in: "in 0.4s ease-out forwards",
                "signature-in": "signature-in 1s ease-out forwards",
                "computer-in": "computer-in 1s ease-out forwards",
            },

            keyframes: () => ({
                in: {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(1rem)",
                        filter: "blur(16px)",
                    },
                    "50%": {
                        filter: "blur(0px)",
                    },
                    "100%": { opacity: 1 },
                },
                "signature-in": {
                    "0%": {
                        opacity: 0,
                        filter: "blur(16px)",
                        transform: "scale(1.1)",
                    },
                    "50%": {
                        filter: "blur(0px)",
                    },
                    "100%": { opacity: 1 },
                },
                "computer-in": {
                    "0%": {
                        opacity: 0,
                        filter: "blur(16px)",
                        transform: "translateX(2rem)",
                    },
                    "50%": {
                        filter: "blur(0px)",
                    },
                    "100%": { opacity: 1 },
                },
            }),
        },
    },
    plugins: [require("tailwindcss-animation-delay")],
};
