import {generate} from 'critical';

/**
 * @see: https://github.com/addyosmani/critical
 */
console.log();
generate({
    // Your base directory
    base: `${process.env.PWD}/dist`,

    // HTML source file
    src: '../critical.html',

    // Your CSS Files (optional)
    css: [`${process.env.PWD}/dist/main.css`],

    target: {
        css: `${process.env.PWD}/dist/critical.css`,
        uncritical: 'uncritical.css'
    },
}, (err, res) => {
    if (err) {
        console.error(err);

        return;
    }

    console.log(res);
});