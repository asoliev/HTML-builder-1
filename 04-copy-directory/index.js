const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files-copy');

//TODO: file refresh is not occuring:
// when the file removes from 'files' folder, it is not removing from files-copy
//fs.rm(destPath, { recursive: true, force: true }, callback);

fs.mkdir(destPath, { recursive: true }, callback);

fs.readdir(srcPath, (err, files) => {
    callback(err);
    for (const file of files) {
        const src = path.join(srcPath, file);
        const dest = path.join(destPath, file);
        fs.copyFile(src, dest, callback);
        //TODO: file refresh is not occuring:
        // when the file removes from 'files' folder, it is not removing from files-copy
    }
});

function callback (err) {
    if (err) throw err;
}