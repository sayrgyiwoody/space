const btnPublish = document.querySelector(".btn-publish");

btnPublish.addEventListener("click",function(){
    const title = document.getElementById("titleInput").value;
    const image = document.getElementById("imageInput").value;
    const content = document.getElementById("contentInput").value;

    if(validateCreateForm(title,image,content)){
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
    }
    
})

// checking validation post create form 
function validateCreateForm(title,image,content){
    var validateBox = document.querySelector(".validate-box");
    var titleInvalid = document.querySelector(".title-invalid");
    var imageInvalid = document.querySelector(".image-invalid");
    var contentInvalid = document.querySelector(".content-invalid");   

    if(title && image && content){
        validateBox.classList.add("d-none");
        return true;
    }else {
        validateBox.classList.remove("d-none");
        
        if(title){
            titleInvalid.classList.add("d-none");
        }else {
            titleInvalid.classList.remove("d-none");
        }
        if(image){
            imageInvalid.classList.add("d-none");
        }else {
            imageInvalid.classList.remove("d-none");
        }
        if(content){
            contentInvalid.classList.add("d-none");
        }else {
            contentInvalid.classList.remove("d-none");
        }
        return false;
    }
}

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
    .then(function(data){
        window.location.reload();
    });
}

// get max id for id 
function getMaxId(data){
      const maxId = data.reduce((max, post) => (post.id > max ? post.id : max), 0);
      return maxId; 
}
