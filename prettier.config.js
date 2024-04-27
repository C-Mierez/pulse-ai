/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
    plugins: ["prettier-plugin-tailwindcss"],
    tabWidth: 4,
    tailwindFunctions: ["clsx", "cva"],
};

export default config;
