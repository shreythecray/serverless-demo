const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let resp = await fetch("https://cataas.com/cat/cute/says/Serverless", {
        method: 'GET'
    });
    
    let data = await resp.arrayBuffer();

    let base64data = Buffer.from(data).toString('base64')

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: base64data
    };
}