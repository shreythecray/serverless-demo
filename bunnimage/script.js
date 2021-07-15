function getImage(event) {
    event.preventDefault()
    var myform = document.getElementById("myform")
    //get image and filename uploaded by user via the form
    let nameInput = document.getElementById("username");
    let fileInput = document.getElementById("image");
    let file = fileInput.files[0]; //get image data

    var payload = new FormData(myform);
    console.log(payload)
    payload.append("file", file);
    $('#output').text("Thanks!")
    
    if (document.getElementById("username").value != '') {

        try {
            let url = "https://priscool.azurewebsites.net/api/w3s3?code=WXnJgVXmLh1VRmcNyZhyr9yy5GSu94iTuEsvSI0chEoHmWazwBK/dg=="
            console.log("Image was uploaded, making POST request to Azure function")
            //create request to Azure function
            const resp = fetch(url, {
                method: 'POST',
                headers: {
                    'codename': nameInput.value
                },
                body: payload
            })
            console.log("resp:" + resp)

            console.log("POST request was made successfully")
            $('#output').text("Your image has been stored successfully!")
        } catch(err) {
            $('#output').text(err)
        }

    } else {
        alert("No name error.")
    }

}

async function downloadImage() {
  let username = document.getElementById("downloadusername").value
  console.log("username:" + username)
  
  if(username != '') {

    try {
      let url = "https://priscool.azurewebsites.net/api/w3s5?code=RMTTWo00OUflS8k//7LR0i4GBLLG88HTf5AFjTXfqYlAZzdHlFC7cQ=="

      console.log("Got file name, making GET request to download image")

      const resp = await fetch(url, {
        method: 'GET',
        header: {
          'username': username
        }
      })
      
      console.log("Made GET request successfully")

      console.log("resp:" + resp)

      let data = await resp.json()

      console.log("data:" + data)

      let imageUrl = data.downloadUri

      window.open(imageUrl, "_self")

      console.log("window.open ran. imageUrl= " + imageUrl)

    } catch(err) {
      alert(err)
    }

  } else {
     alert("No name error.")
  }
}