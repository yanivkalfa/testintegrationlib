import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  const nodeModulesPath = path.join(__dirname, "../node_modules");
  const msalPackagePath = path.join(nodeModulesPath, "react-native-msal");

  const sourceFile = path.join(__dirname, "some-gradle");
  const destinationFile = path.join(msalPackagePath, "android", "build.gradle");

  if (fs.existsSync(destinationFile)) {
    fs.copyFileSync(sourceFile, destinationFile);
    console.log("Successfully replaced build.gradle in react-native-msal.");
  } else {
    console.warn("Target file not found. Ensure react-native-msal is installed before running this script.");
  }
} catch (err) {
  console.error("Failed to replace build.gradle:", err);
  process.exit(1);
}
