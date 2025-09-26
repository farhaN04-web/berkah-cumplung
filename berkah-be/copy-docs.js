const fs = require("fs");
const path = require("path");

// Create directories recursively
function mkdirRecursive(dir) {
	if (fs.existsSync(dir)) return;

	try {
		fs.mkdirSync(dir, { recursive: true });
		console.log(`Created directory: ${dir}`);
	} catch (err) {
		console.error(`Error creating directory ${dir}:`, err);
		throw err;
	}
}

// Copy file from source to destination
function copyFile(source, destination) {
	try {
		fs.copyFileSync(source, destination);
		console.log(`Copied: ${source} -> ${destination}`);
	} catch (err) {
		console.error(`Error copying ${source} to ${destination}:`, err);
		throw err;
	}
}

// Copy all files from source directory to destination directory recursively
function copyDirectoryRecursive(source, destination) {
	// Create destination directory if it doesn't exist
	mkdirRecursive(destination);

	// Get all files and directories in the source directory
	const entries = fs.readdirSync(source, { withFileTypes: true });

	for (const entry of entries) {
		const sourcePath = path.join(source, entry.name);
		const destPath = path.join(destination, entry.name);

		if (entry.isDirectory()) {
			// Recursively copy subdirectories
			copyDirectoryRecursive(sourcePath, destPath);
		} else {
			// Copy files (only yaml files)
			if (entry.name.endsWith(".yaml")) {
				copyFile(sourcePath, destPath);
			}
		}
	}
}

// Main function
function main() {
	const sourceDir = path.join(__dirname, "src", "docs");
	const destDir = path.join(__dirname, "dist", "docs");

	console.log("Copying Swagger documentation files...");
	console.log(`Source: ${sourceDir}`);
	console.log(`Destination: ${destDir}`);

	try {
		copyDirectoryRecursive(sourceDir, destDir);
		console.log("Documentation files copied successfully!");
	} catch (err) {
		console.error("Failed to copy documentation files:", err);
		process.exit(1);
	}
}

main();
