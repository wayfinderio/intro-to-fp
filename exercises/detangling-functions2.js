const sinon = require('sinon');
const assert = require('power-assert');
const fs = require('fs');
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

// This is the function to detangle
const convertFile = (fileName) => {
  const fileContents = fs.readFileSync(fileName);
  const json = JSON.parse(fileContents);

  const colorMap = {}

  for (const entry of json.colors) {
    const hexParts = entry.hexValue.split('');
    const hexColor = hexParts[0] + hexParts[1].repeat(2) + hexParts[2].repeat(2) + hexParts[3].repeat(2);
    colorMap[hexColor] = entry.colorName;
  }

  if (!fs.existsSync('processed')) {
    fs.mkdirSync('processed');
  }

  const fileNameParts = fileName.split('.');
  fs.writeFileSync(
    'processed' + sep + fileNameParts[0] + '_processed.' + fileNameParts[1],
    JSON.stringify(colorMap, null, 2)
  );
}


describe('Detangling an effectful function', () => {
  it('should be able to test the pure parts of the function here once it is detangled', () => {

    sinon.stub(fs, 'existsSync').returns(true);
    sinon.stub(fs, 'readFileSync').returns('\
      {\
        "colors": [\
            { "colorName":"red", "hexValue":"#f00" },\
            { "colorName":"green", "hexValue":"#0f0" }\
        ]\
      }');
    sinon.stub(fs, 'writeFileSync');

    convertFile('colors.json');

    assert.deepEqual(
      fs.writeFileSync.getCall(0).args[1],
`{\n\
  "#ff0000": "red",\n\
  "#00ff00": "green"\n\
}`
    );
  });
});
