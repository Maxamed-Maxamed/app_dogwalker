#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /app, /components, /hooks, /scripts, and /constants directories to /app-example based on user input and creates a new /app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
const exampleDir = "app-example";
const newAppDir = "app";
const exampleDirPath = path.join(root, exampleDir);

/**
 * Safely resolves and validates a path to prevent path traversal attacks.
 * Ensures the resolved path stays within the base directory.
 * @param {string} basePath - The base directory path
 * @param {string} targetPath - The target path to validate
 * @returns {string|null} - The normalized path if valid, null if path traversal detected
 */
const safeResolvePath = (basePath, targetPath) => {
  const normalizedBase = path.normalize(basePath);
  const fullPath = path.normalize(path.join(basePath, targetPath));

  // Ensure the resolved path starts with the base path to prevent traversal
  if (!fullPath.startsWith(normalizedBase)) {
    console.error(
      `❌ Security error: Path traversal detected for "${targetPath}"`,
    );
    return null;
  }

  return fullPath;
};

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Moves a directory to the example directory.
 * @param {string} oldDirPath - The source directory path
 * @param {string} dir - The directory name
 */
const moveDirectory = async (oldDirPath, dir) => {
  const newDirPath = safeResolvePath(root, path.join(exampleDir, dir));
  if (!newDirPath) {
    console.log(`⚠️ Skipping move for "${dir}" due to invalid target path.`);
    return;
  }
  await fs.promises.rename(oldDirPath, newDirPath);
  console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
};

/**
 * Deletes a directory.
 * @param {string} oldDirPath - The directory path to delete
 * @param {string} dir - The directory name
 */
const deleteDirectory = async (oldDirPath, dir) => {
  await fs.promises.rm(oldDirPath, { recursive: true, force: true });
  console.log(`❌ /${dir} deleted.`);
};

/**
 * Processes a single directory - either moves or deletes it.
 * @param {string} dir - The directory name
 * @param {boolean} shouldMove - Whether to move (true) or delete (false)
 */
const processDirectory = async (dir, shouldMove) => {
  const oldDirPath = safeResolvePath(root, dir);
  if (!oldDirPath) {
    console.log(`⚠️ Skipping "${dir}" due to invalid path.`);
    return;
  }

  if (!fs.existsSync(oldDirPath)) {
    console.log(`➡️ /${dir} does not exist, skipping.`);
    return;
  }

  if (shouldMove) {
    await moveDirectory(oldDirPath, dir);
  } else {
    await deleteDirectory(oldDirPath, dir);
  }
};

/**
 * Creates the new app directory with starter files.
 */
const createNewAppDirectory = async () => {
  const newAppDirPath = safeResolvePath(root, newAppDir);
  if (!newAppDirPath) {
    throw new Error("Invalid app directory path");
  }
  await fs.promises.mkdir(newAppDirPath, { recursive: true });
  console.log("\n📁 New /app directory created.");

  const indexPath = safeResolvePath(newAppDirPath, "index.tsx");
  if (!indexPath) {
    throw new Error("Invalid index.tsx path");
  }
  await fs.promises.writeFile(indexPath, indexContent);
  console.log("📄 app/index.tsx created.");

  const layoutPath = safeResolvePath(newAppDirPath, "_layout.tsx");
  if (!layoutPath) {
    throw new Error("Invalid _layout.tsx path");
  }
  await fs.promises.writeFile(layoutPath, layoutContent);
  console.log("📄 app/_layout.tsx created.");
};

/**
 * Prints completion message with next steps.
 * @param {boolean} movedFiles - Whether files were moved to example dir
 */
const printCompletionMessage = (movedFiles) => {
  console.log("\n✅ Project reset complete. Next steps:");
  const baseMessage =
    "1. Run `npx expo start` to start a development server.\n2. Edit app/index.tsx to edit the main screen.";
  const moveMessage = movedFiles
    ? `\n3. Delete the /${exampleDir} directory when you're done referencing it.`
    : "";
  console.log(baseMessage + moveMessage);
};

/**
 * Main function to move or delete directories and create new app structure.
 * @param {string} userInput - User's choice ('y' to move, 'n' to delete)
 */
const moveDirectories = async (userInput) => {
  try {
    const shouldMove = userInput === "y";

    if (shouldMove) {
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    for (const dir of oldDirs) {
      await processDirectory(dir, shouldMove);
    }

    await createNewAppDirectory();
    printCompletionMessage(shouldMove);
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  },
);
