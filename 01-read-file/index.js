const fs = require('fs');
const path = require('path');

const fileName = 'text.txt';
const filePath = path.join(__dirname, fileName);

let readableStream = fs.createReadStream(filePath, "utf8");

readableStream.on("data", function(chunk){ 
    console.log(chunk);
});