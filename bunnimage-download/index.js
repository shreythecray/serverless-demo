const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let blogname = "whateveriwant"

    var username = req.headers['username'];
    //initialize download variable
    var download = ""
    //test if it's png
    var downloadpng = "https://" + blogname + ".blob.core.windows.net/images/" + username + ".png";
    //test if it's jpg
    var downloadjpg = "https://" + blogname + ".blob.core.windows.net/images/" + username + ".jpg";
    //we didn't change anything

    let pngresp = await fetch(downloadpng, {
        method: 'GET',
     })
     let pngdata = await pngresp;
     
     let jpgresp = await fetch(downloadjpg, {
        method: 'GET',
     })
     let jpgdata = await jpgresp;

     if (pngdata.statusText == "The specified blob does not exist." && jpgdata.statusText == "The specified blob does not exist." ) {
        success = false;
        context.log("Does not exist: " + pngdata)
        context.log("Does not exist: " + jpgdata)
     } else if (pngdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadpng
        context.log("Does exist: " + pngdata)
     } else if (jpgdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpg
        context.log("Does exist: " + jpgdata)
     }     

    context.res = {
        body: {
                 "downloadUri" : download,
                 "success": success,
        }
    };

    context.log(download);
    context.done();
}