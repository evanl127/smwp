

async function displayImage(count){
    const response = await fetch("https://unsplash.it/500/250?random")
    const blob = await response.blob()
    const img = document.createElement("img")


    const id = "post" + count
    document.getElementById(id).src = URL.createObjectURL(blob)
    img.src = URL.createObjectURL(blob)
    return img
}


function createElementPlus(element, text, id){
    const x = document.createElement(element)
    if (text.length != 0){
       x.innerText = text
    }
    x.id = id
    return x
}


async function getPostInfo(postId, count){
    var postJSON
    var userJSON
    const post = await fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
    .then(response => response.json())
    .then(response => postJSON = response)
    const user = await fetch('https://jsonplaceholder.typicode.com/users/' + postJSON.userId)
    .then(response => response.json())
    .then(response => userJSON = response)


    const newDiv = document.createElement("div")
    newDiv.id = "post"
    newDiv.appendChild(createElementPlus("p", removeQuotes(JSON.stringify(postJSON.title)), "title"))
    newDiv.appendChild(createElementPlus("p", "/u/" + removeQuotes(JSON.stringify(userJSON.username)), "username"))
    newDiv.appendChild(createElementPlus("p", removeQuotes(JSON.stringify(postJSON.body)), "body"))
    const id = "post" + postId
    newDiv.appendChild(createElementPlus("img", "", id))


    document.getElementById("grid").appendChild(newDiv)
}


function removeQuotes(str){
    return str.substring(1, str.length - 1)
}


for (i = 0; i < 100; i++){
    getPostInfo(i)
    displayImage(i)
}
