/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/app/**/*.{js,ts,jsx,tsx,css}",
    "../../../packages/ui/src/**/*.{js,ts,jsx,tsx,css}",
    "../../../packages/ui/src/components/**/*.{js,ts,jsx,tsx}",
    "../../../packages/ui/src/styles/**/*.css",
  ],
};

export default config;
