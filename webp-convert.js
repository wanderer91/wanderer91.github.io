'use strict';

const webp = require('webp-converter');
const fs = require('fs');

const convert = (path) => {

    console.log(`Converting ${path}...`);

    const outputPath = path.replace(/\..+$/, '.webp');

    webp.cwebp(path, outputPath, '-q 80', (status, error) => {

        if (error) {

            console.error(error);

            return;

        }

        console.log(`Converting ${path} status: ${status}`);

    });

};

const imagePaths = ['/src/img/main.png', '/src/img/portfolio', '/src/img/icons'];

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

        })

    }

});