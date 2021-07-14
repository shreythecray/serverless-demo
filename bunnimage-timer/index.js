const { BlobServiceClient } = require("@azure/storage-blob");
const connectionstring = process.env["AZURE_STORAGE_CONNECTION_STRING"];
const account = "whateveriwant";

module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "images";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);
    
    for await (const blob of deletecontainerClient.listBlobsFlat()) {
        context.log('\t', blob.name);
        await deleteBlob(blob.name)
        // access the blob's name and call deleteBlob to delete it!
    }

    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   
};

async function deleteBlob(filename) {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "images";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);

    const deleteblockBlobClient = deletecontainerClient.getBlockBlobClient(filename);
    const downloadBlockBlobResponse = await deleteblockBlobClient.download(0); // 0 refers to the position of the blob to download
    const blobDeleteResponse = deleteblockBlobClient.delete();

    result = {
        body : {
            deletename: filename,
            success: true
        }
    };
    return result;    
}