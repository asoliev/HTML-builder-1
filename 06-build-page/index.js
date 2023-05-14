const fs = require('fs');
const path = require('path');
const project_dist = 'project-dist';
const dist_path = path.join(__dirname, project_dist);

buildPage();

function copyAssets() {
    const assets = 'project-assets';
    const srcPath = path.join(__dirname, assets);
    const destPath = path.join(dist_path, assets);

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
}
function mergeStyles() {
    const styles_folder = path.join(__dirname, 'styles');
    fs.readdir(styles_folder, (err, files) => {
        if (err) throw err;

        const dist_style_path = path.join(dist_path, 'style.css');
        const output = fs.createWriteStream(dist_style_path, "utf8");

        for (const file of files) {
            const file_path = path.join(styles_folder, file);

            fs.stat(file_path, (err_stat, stats) => {
                if (err_stat) throw err_stat;

                if(stats.isDirectory()) return;
                if(path.extname(file) != '.css') return;

                const input = fs.createReadStream(file_path, "utf8");
                input.on("data", chunk => output.write(chunk));
            });
        }
    });
}
function buildPage() {
    let template_html = "";
    const template_path = path.join(__dirname, 'template.html');

    //TODO: it is better to use streamReader, but not found replace inside a stream
    const template = fs.createReadStream(template_path, "utf8");
    console.log(template.read(1000));
    // template.on("data", (chunk) => {
    //     setTimeout(() => {console.log('test')}, 1000);
    //     console.log(chunk);
    //     // template_html = chunk;
    //     // return;
    //     //output.write(chunk);
    // });

    // console.log(template_html);

    // fs.readFile(template_path, 'utf8', (err, template_data) => {
    //     if (err) throw err;
    //     template_html = template_data;
    // });
    
    // const components_path = path.join(__dirname, 'components');
    // fs.readdir(components_path, (err, files) => {
    //     if (err) throw err;

    //     for (const file of files) {
    //         const file_path = path.join(components_path, file);

    //         fs.stat(file_path, (err_stat, stats) => {
    //             if (err_stat) throw err_stat;

    //             if(stats.isDirectory()) return;

    //             const ext = path.extname(file);
    //             //if(ext != '.html') return; //TODO: extra check for extension if necessary
    //             const name = path.basename(file, ext);
    //             if (template_html.includes(name)) {

    //                 // const component_file_stream = fs.createReadStream(file_path, "utf8");
    //                 // component_file_stream.on("data", (chunk) => {
    //                 //     chunk;
    //                 //     //output.write(chunk);
    //                 // });
    //                 fs.readFile(file_path, 'utf8', (err_readFile, template_data) => {
    //                     if (err_readFile) throw err_readFile;
    //                     //template_html = template_data;
    //                 });

    //             }

    //             // const index_path = path.join(dist_path, 'index.html');
    //             // const output = fs.createWriteStream(index_path, "utf8");
    //         });
    //     }
    // });
}