const fs = require('fs');
const path = require('path');
const {stdin, stdout, exit } = require('process');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'), "utf8");

stdout.write('Enter the text: ');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        sayBye();
    }
    output.write(data);
});

process.on('SIGINT', sayBye);

function sayBye() {
    stdout.write('Goodbye!');
    exit();
}