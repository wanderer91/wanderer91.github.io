const critical = require('critical');

/**
 * @see: https://github.com/addyosmani/critical
 */

critical.generate({
    // Your base directory
    base: __dirname + '/dist',

    // HTML source file
    src: '/../critical.html',

    // Your CSS Files (optional)
    css: [__dirname + '/dist/main.css'],

    target: {
        css: __dirname + '/dist/critical.css',
        uncritical: 'uncritical.css'
    },

    minify: true,
}, (err, res) => {
    if (err) {
        console.error(err);

        return;
    }

    console.log(res);
});