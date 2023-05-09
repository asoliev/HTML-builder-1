const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');
fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
        fs.stat(path.join(folderPath, file), (err2, stats) => {
            if (err2) throw err2;

            if (stats.isDirectory()) return;
            const fileSize = stats.size / 8;

            const ext = path.extname(file);
            const name = path.basename(file, ext);
            const ext2 = ext.replace('.', '');

            console.log(name, ' - ', ext2, ' - ', fileSize, 'kb');
        });
    }
});