const fs = require('fs');
const path = require('path');

const styles_path = path.join(__dirname, 'styles');
fs.readdir(styles_path, (err, files) => {
    if (err) throw err;

    const dist_path = path.join(__dirname, 'project-dist', 'bundle.css');
    const output = fs.createWriteStream(dist_path, "utf8");

    for (const file of files) {
        const file_path = path.join(styles_path, file);

        fs.stat(file_path, (err_stat, stats) => {
            if (err_stat) throw err_stat;

            if(stats.isDirectory()) return;
            if(path.extname(file) != '.css') return;

            const input = fs.createReadStream(file_path, "utf8");
            input.on("data", chunk => output.write(chunk));
        });
    }
});
