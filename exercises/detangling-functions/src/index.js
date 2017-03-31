const fs = require('fs');
const { expect } = require('chai');

// JSON data looks like
//   "colors":[
//       {
//         "colorName":"red",
//         "hexValue":"#f00"
//       },
//       {
//         "colorName":"green",
//         "hexValue":"#0f0"
//       }
//   ]
//
// We want
// {
//   "#ff0000": "red",
//   "#00ff00": "green"
// }
const loadFile = (fileName) => {
  const fileContents = fs.readFileSync(fileName);
  const json = JSON.parse(fileContents);

  const colorMap = {}

  for (const entry of json.colors) {
    const hexParts = entry.hexValue.split('');
    const hexColor = hexParts[0] + hexParts[1].repeat(2) + hexParts[2].repeat(2) + hexParts[3].repeat(2);
    colorMap[hexColor] = entry.colorName;
  }

  return colorMap;
}

const result = loadFile('colors.json');
expect(result).to.have.property('#ff0000', 'red');
expect(result).to.have.property('#00ff00', 'green');
expect(result).to.have.property('#0000ff', 'blue');
expect(result).to.have.property('#00ffff', 'cyan');
expect(result).to.have.property('#ff00ff', 'magenta');
expect(result).to.have.property('#ffff00', 'yellow');
expect(result).to.have.property('#000000', 'black');

console.log('Good job, it works');
