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
// We want: [ "#f00", "#0f0" ]
const convertFile = (fileName) => {
  const fileContents = fs.readFileSync(fileName);
  const json = JSON.parse(fileContents);

  return fold(extractColor, [], json.colors);
}

const extractColor = (element, colors) => [...colors, element.hexValue];

// const fold = (fn, init, array) => 
//   array.length > 0
//     ? fold(fn, fn(array[0], init, init.slice(1)))
//     : init;

const fold = (fn, init, array) => {
  let collection = [...init];
  for (var i = 0; i < array.length; i++) {
    collection = fn(array[i], collection)
  }
  return collection;
}

const colors = convertFile('colors.json');

expect(colors).to.contain('#f00');
expect(colors).to.contain('#0f0');
expect(colors).to.contain('#00f');
expect(colors).to.contain('#0ff');
expect(colors).to.contain('#f0f');
expect(colors).to.contain('#ff0');
expect(colors).to.contain('#000');
