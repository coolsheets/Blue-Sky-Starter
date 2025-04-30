import fs from "fs";
import path from "path";

// Directories to scan
const SRC_DIR = "./client/src";
const COMPONENT_DIRS = ["component", "components"];

// Helper to recursively find all files in a directory
function getAllFiles(dir, files = []) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  });
  return files;
}

// 1. Find all .jsx files in src and component(s) dirs
const allFiles = getAllFiles(SRC_DIR).filter(f => f.endsWith(".jsx") || f.endsWith(".js"));
const componentFiles = allFiles.filter(f =>
  COMPONENT_DIRS.some(dir => f.includes(path.sep + dir + path.sep))
);

// 2. Find duplicates by filename
const nameMap = {};
componentFiles.forEach(f => {
  const base = path.basename(f);
  if (!nameMap[base]) nameMap[base] = [];
  nameMap[base].push(f);
});

console.log("=== Duplicate Components ===");
Object.entries(nameMap).forEach(([name, files]) => {
  if (files.length > 1) {
    console.log(`\n${name}:`);
    files.forEach(f => console.log("  " + f));
  }
});

// 3. Find usage (import) of each component file in all src files
console.log("\n=== Component Usage ===");
componentFiles.forEach(f => {
  const base = path.basename(f, path.extname(f));
  const importRegex = new RegExp(`import\\s+.*${base}.*from\\s+['"].*${base}['"]`);
  let used = false;
  allFiles.forEach(srcFile => {
    if (srcFile === f) return;
    const content = fs.readFileSync(srcFile, "utf8");
    if (importRegex.test(content)) {
      used = true;
      console.log(`${base} is imported in ${srcFile}`);
    }
  });
  if (!used) {
    console.log(`${base} is NOT imported anywhere.`);
  }
});