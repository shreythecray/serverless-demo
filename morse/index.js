const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const plaintext = req.query.plaintext;

    const code = morse.textToMorse(plaintext);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: code
    };
}