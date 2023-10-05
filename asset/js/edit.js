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

    if(validateCreateForm(title,image,content)){
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

