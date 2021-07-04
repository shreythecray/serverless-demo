const multipart = require('parse-multipart');
const fetch = require('node-fetch');

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var responseMessage = ""
    try {
        var password = req.headers['codename']// get the header called "codename"
        var boundary = multipart.getBoundary(req.headers['content-type']);
        var body = req.body;
        var parsedBody = multipart.Parse(body, boundary);
        // use parse-multipart to parse the body
        var filetype = parsedBody[0].type;
        if (filetype == "image/png") {
            ext = "png";
        } else if (filetype == "image/jpeg") {
            ext = "jpeg";
        } else if (filetype == "image/jpg") {
            ext = "jpg"
        } else {
            username = "invalidimage"
        }
        // determine the file-type here!
        responseMessage = await uploadFile(parsedBody, ext, password);
        // fill the parameters in!
    } catch(err) {
        context.log("Undefined body image");
        responseMessage = "Sorry! No image attached."
    }


    context.res = {
        body: responseMessage
    };
}

async function uploadFile(parsedBody, ext, password) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "images";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container

    const blobName = password + "." + ext;    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client

    const uploadBlobResponse = await blockBlobClient.upload(parsedBody[0].data, parsedBody[0].data.length);

    return ("Your blob is saved");
}
