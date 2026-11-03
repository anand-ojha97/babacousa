import { build } from "vite";
import { spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";

// Vite compiles JSX for Node; no browser or development server is needed.
try {
  await build({
    logLevel: "warn",
    build: { ssr: "tests/router.test.jsx", outDir: ".test-build", emptyOutDir: true, minify: false },
  });
  const result = spawnSync(process.execPath, ["--test", ".test-build/router.test.js"], {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: "development" },
  });
  process.exitCode = result.status ?? 1;
} finally {
  await rm(".test-build", { recursive: true, force: true });
}
