#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the version from the command line arguments
const version = process.argv[2];

if (!version) {
  console.error('Please provide a version number as an argument');
  process.exit(1);
}

// Path to package.json
const packageJsonPath = path.join(__dirname, 'package.json');

try {
  // Read the package.json file
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');

  // Parse the JSON content
  const packageJson = JSON.parse(packageJsonContent);

  // Update the version
  packageJson.version = version;

  // Write the updated package.json back to the file
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf8'
  );

  console.log(`Successfully updated version to ${version}`);
} catch (error) {
  console.error(`Error updating package.json: ${error.message}`);
  process.exit(1);
}
