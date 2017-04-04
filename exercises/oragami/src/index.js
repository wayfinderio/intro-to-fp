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
// We want: ["#f00", "#0f0"]
const convertFile = (fileName) => {
  const fileContents = fs.readFileSync(fileName);
  const json = JSON.parse(fileContents);

  return fold(extractColor, [], json.colors);
}

const extractColor = (element, colors) => [...colors, element.hexValue]

const fold = (fn, init, array) => {
  // implement fold here
}

const colors = convertFile('colors.json');

expect(colors).to.contain('#f00');
expect(colors).to.contain('#0f0');
