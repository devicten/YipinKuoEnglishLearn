import { loadNuxt, build } from "nuxt";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { execa } from "execa";

const isDev = process.env.NODE_ENV !== "production";

// Define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const options = {
  rootDir: resolve(__dirname, "./"), // Adjust based on your project structure
  dev: isDev, // Use the isDev flag
};

async function main() {
  const nuxt = await loadNuxt(options);
  if (isDev) {
    // Start the development server with hot reloading using nuxt dev
    const nuxtDevProcess = execa("nuxt", ["dev"], {
      stdio: "inherit",
    });

    nuxtDevProcess.on("error", (error) => {
      console.error("Error starting Nuxt development server:", error);
      process.exit(1);
    });

    nuxtDevProcess.on("exit", (code) => {
      if (code !== 0) {
        console.error(`Nuxt development server exited with code ${code}`);
        process.exit(code);
      }
    });
  } else {
    await build(nuxt); // Build the application in production mode
    const { handler } = await import("./.output/server/index.mjs");
    const server = createServer(handler);

    server.listen(3000, () => {
      console.log("Production server started on http://localhost:3000");
    });
  }
}

main().catch((error) => {
  console.error("Error starting Nuxt:", error);
  process.exit(1);
});
