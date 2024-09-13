const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Set homepage for GitHub Pages
packageJson.homepage = "https://ajay-hum.github.io/blogsite/";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Updated homepage for GitHub Pages build.');
