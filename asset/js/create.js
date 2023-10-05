
const btnPublish = document.querySelector(".btn-publish");

btnPublish.addEventListener("click",function(){
    const title = document.getElementById("titleInput").value;
    const image = document.getElementById("imageInput").value;
    const content = document.getElementById("contentInput").value;

    // Read data length for id 
    fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(function(data) {
        const id = getMaxId(data)  + 1;
        const date = new Date();
        const formattedDate = date.toISOString();
        const post = {
                    "id": id,
                    "title": title,
                    "image_url": image,
                    "content": content,
                    "created_at": formattedDate,
                    "created_by": "User",
                    "view_count": null
                };
        createPost(post);
    });
})

// create post to json 
function createPost(post){
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => console.log('Created:', data));
}

// get max id for id 
function getMaxId(data){
      const maxId = data.reduce((max, post) => (post.id > max ? post.id : max), 0);
      return maxId; 
}
