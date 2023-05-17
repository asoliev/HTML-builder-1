const { readdir, mkdir, stat, copyFile, unlink } = require('fs/promises');
const { pipeline } = require('stream/promises');
const { createReadStream, createWriteStream } = require('fs');
const path = require('path');

const destinationFolder = path.join(__dirname, project_dist);

async function copyFiles() {
    const currentFolder = path.join(__dirname, 'files');
    const files = await readdir(currentFolder);
    for (const file of files) {
        const srcPath = path.join(currentFolder, file);
        const destPath = path.join(destinationFolder, file);
        await copyFile(srcPath, destPath);
    }
}
async function clearFolder() {
    const files = await readdir(destinationFolder);
    for (const file of files) {
        const destPath = path.join(destinationFolder, file);
        await unlink(destPath);
    }
}
async function copyDirectory(){
    try {
        await stat(destinationFolder);
        await clearFolder();
    } catch {
        await mkdir(destinationFolder, { recursive: true });
    } finally {
        await copyFiles();
    }
}
copyDirectory();


async function createBundle() {
    const stylesFolder = path.join(__dirname, 'styles');
    const files = await readdir(stylesFolder, {withFileTypes: true});
    const cssFilePathes = files
        .filter(file => !file.isDirectory())
        .map((file) => file.name)
        .filter(fileName => path.extname(fileName) === '.css')
        .map(file => path.join(stylesFolder, file));
    await  mergeFiles(cssFilePathes);
}
async function mergeFiles(cssFilePathes) {
    const dist_path = path.join(__dirname, 'project-dist', 'bundle.css');
    for (const filePath of cssFilePathes) {
        const readStream = createReadStream(filePath, "utf8");
        const writeStream = createWriteStream(dist_path, {flags: 'a'} , "utf8");
        await pipeline(readStream, writeStream);
    }
}
createBundle();