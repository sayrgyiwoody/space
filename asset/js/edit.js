var urlParams = new URLSearchParams(window.location.search);
var postId = urlParams.get('id');

const btnBackDetail = document.querySelector(".btn-back-detail");
const btnUpdate = document.querySelector(".btn-update");

const getEditPost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}`);
      const post = await response.json();
  
      if (post) {
        renderInputValue(post);
      } else {
        console.error(`Post with ID ${postId} not found.`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  getEditPost(postId);

// render input value to form 
function renderInputValue(post){
    const title = document.getElementById("titleInput");
    const image = document.getElementById("imageInput");
    const content = document.getElementById("contentInput");
    
    title.value = post.title;
    image.value = post.image_url;
    content.value = post.content;
}

// back to detail page 

btnBackDetail.addEventListener("click",function(){
    window.location = `./detail.html?id=${postId}`;
})


// update new post data

btnUpdate.addEventListener("click",function(){
    const title = document.getElementById("titleInput").value;
    const image = document.getElementById("imageInput").value;
    const content = document.getElementById("contentInput").value;

    const date = new Date();
    const formattedDate = date.toISOString();

    const post = {
        "id": postId,
        "title": title,
        "image_url": image,
        "content": content,
        "created_at": formattedDate,
        "created_by": "User",
        "view_count": null
    };

    updatePost(post);
    
})

// update post to json 
function updatePost(post){
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(function(){
        window.location = `./detail.html?id=${postId}`;
    });
}

// check auth token from localStorage 
function checkAuthToken(){
    const authToken = localStorage.getItem('authToken');
    if(authToken){
      return true;
    }
    return false;
  }

  if(!checkAuthToken()){
    window.location = "../index.html";
  }