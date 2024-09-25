'use strict';

const webp = require('webp-converter');
const fs = require('fs');

const convert = (path) => {

    console.log(`Converting ${path}...`);

    const outputPath = path.replace(/\..+$/, '.webp');

    const result = webp.cwebp(path, outputPath, '-q 80', "-v");
    result.then(function(res) {
        console.log(res);
    });

};

const imagePaths = ['/static/img/main.png', '/static/img/portfolio', '/static/icons'];

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