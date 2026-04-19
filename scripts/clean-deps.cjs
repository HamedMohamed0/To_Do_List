const { execSync } = require("child_process");

try {
  console.log("🔍 Running knip...\n");

  const result = execSync("npx knip --reporter json", {
    encoding: "utf-8",
  });

  const data = JSON.parse(result);

  const unusedDeps = [
    ...(data.dependencies || []),
    ...(data.devDependencies || []),
  ];

  if (!unusedDeps.length) {
    console.log("✅ No unused dependencies found.");
    process.exit(0);
  }

  console.log("🧹 Removing unused dependencies:");
  console.log(unusedDeps.join(", "), "\n");

  execSync(`npm uninstall ${unusedDeps.join(" ")}`, {
    stdio: "inherit",
  });

  console.log("\n✅ Cleanup finished!");
} catch (err) {
  console.error("❌ Error during cleanup:", err.message);
}
