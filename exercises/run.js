const { execSync } = require('child_process');
const { existsSync } = require('fs');

if (!existsSync('node_modules')) {
  console.log('Installing dependencies');
  console.log(execSync('npm i', { cwd: __dirname}).toString());
  console.log('Done installing dependencies\n-------------\n');
}

try {
  console.log(execSync("babel src --out-dir lib").toString());
  console.log("Done compiling\n---------------------------\n");
  console.log(execSync("node lib/index.js").toString());
} catch(e) {}
