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
// We want: [ "#0f0" ]
const convertFile = (fileName) => {
  const fileContents = fs.readFileSync(fileName);
  const json = JSON.parse(fileContents);

  const filteredColors = filter((color) => !color.hexValue.startsWith('#f'), json.colors);
  return map((color) => color.hexValue, filteredColors);
}

const filter = (filterFn, array) => {
  // implement filter here
}

const map = (mapFn, array) => {
  // implement map here
}

const colors = convertFile('colors.json');

expect(colors).to.contain('#0f0');
expect(colors).to.contain('#00f');
expect(colors).to.contain('#0ff');
expect(colors).to.contain('#000');
