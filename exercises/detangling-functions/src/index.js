const fs = require('fs');
const { expect } = require('chai');
const { sep } = require('path');

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
const convertFile = (fileName) => {
  const fileContents = fs.readFileSync(fileName);
  const json = JSON.parse(fileContents);

  const colorMap = {}

  for (const entry of json.colors) {
    const hexParts = entry.hexValue.split('');
    const hexColor = hexParts[0] + hexParts[1].repeat(2) + hexParts[2].repeat(2) + hexParts[3].repeat(2);
    colorMap[hexColor] = entry.colorName;
  }

  // This is simply a convenient way to test
  // expect(colorMap).to.have.property('#ff0000', 'red');
  // expect(colorMap).to.have.property('#00ff00', 'green');
  // expect(colorMap).to.have.property('#0000ff', 'blue');
  // expect(colorMap).to.have.property('#00ffff', 'cyan');
  // expect(colorMap).to.have.property('#ff00ff', 'magenta');
  // expect(colorMap).to.have.property('#ffff00', 'yellow');
  // expect(colorMap).to.have.property('#000000', 'black');

  if (!fs.existsSync('processed')) {
    fs.mkdirSync('processed');
  }

  const fileNameParts = fileName.split('.');
  fs.writeFileSync('processed' + sep + fileNameParts[0] + '_processed.' + fileNameParts[1], JSON.stringify(colorMap, null, 2));
}

convertFile('colors.json');
