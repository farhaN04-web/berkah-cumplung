const fs = require("fs");
const path = require("path");

const aliases = {
  "@config": "config",
  "@constants": "constants",
  "@controllers": "controllers",
  "@docs": "docs",
  "@dto": "dto",
  "@interfaces": "interfaces",
  "@middlewares": "middlewares",
  "@routes": "routes",
  "@services": "services",
  "@templates": "templates",
  "@utils": "utils",
  "@validation": "validation",
};

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

function convertImports(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  for (const [alias, actualPath] of Object.entries(aliases)) {
    const regex = new RegExp(`(['"])${alias}/`, "g");
    const match = content.match(regex);
    if (match) {
      const relativePath = path.relative(
        path.dirname(filePath),
        path.join(__dirname, "src", actualPath)
      );
      const fixedRelative = "./" + relativePath.replace(/\\/g, "/"); // Windows support
      content = content.replace(regex, `$1${fixedRelative}/`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

const srcDir = path.join(__dirname, "src");
walk(srcDir, (filePath) => {
  if (filePath.endsWith(".ts")) {
    convertImports(filePath);
  }
});
