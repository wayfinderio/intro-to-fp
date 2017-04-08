const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { sep } = require('path');

if (!existsSync('node_modules')) {
  console.log('Installing dependencies');
  console.log(execSync('npm i', { cwd: __dirname}).toString());
  console.log('Done installing dependencies\n-------------\n');
}

try {
  console.log(execSync(`${__dirname}${sep}node_modules${sep}.bin${sep}babel src --out-dir lib`).toString());
  console.log("Done compiling\n---------------------------\n");
  console.log(execSync("node lib/index.js").toString());
} catch(e) {}
