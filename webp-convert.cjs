"use strict";

const sharp = require("sharp");
const fs = require("fs");

const convert = (path) => {
    console.log(`Converting ${path}...`);

    const outputPath = path.replace(/\..+$/, ".webp");

    sharp(path).webp().toFile(outputPath);
};

const imagePaths = ["/static/img/main.png", "/static/img/portfolio", "/static/icons"];

imagePaths.forEach((path) => {
    const targetPath = `${__dirname}${path}`;

    const stat = fs.lstatSync(targetPath);

    if (stat.isFile()) {
        convert(targetPath);
    } else if (stat.isDirectory()) {
        fs.readdirSync(targetPath).forEach((path) => {
            if (fs.lstatSync(`${targetPath}/${path}`).isFile() && !/\.webp$/.test(path)) {
                convert(`${targetPath}/${path}`);
            }
        });
    }
});
