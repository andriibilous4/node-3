const fs = require('node:fs');
const csv = require('csvtojson');

const readStream = fs.createReadStream('./files/input.csv');
const writeStream = fs.createWriteStream('./files.output.txt');

readStream.on('error', () => {
  console.error('Error reading of file')
}).
  pipe(csv())
  .on('data', (row) => {
    const jsonobj = JSON.parse(row);
    writeStream.write(JSON.stringify(jsonobj, null, 2) + '\n');
  }).on('error', (error) => {
    console.error('Error in JSON conversion'.error);
  }).on('end', () => {
    console.log('End of writing csv file')
  })

writeStream.on('error', (error)=>{
  console.error('Error of writing file',error)
})