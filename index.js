import { loadNuxt, build } from "nuxt";

const isDev = process.env.NODE_ENV !== "production";

const options = {
  rootDir: "./", // Adjust based on your project structure
  dev: true, // Set to false for production
};

async function main() {
  const nuxt = await loadNuxt(options);
  if (isDev) {
    await build(nuxt);
  }
  import("./.output/server/index.mjs");
}

main().catch((error) => {
  console.error("Error starting Nuxt:", error);
  process.exit(1);
});
