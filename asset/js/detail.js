
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');


const detailPost = document.querySelector("#detail-post");

const getDetailPost = async (postId) => {
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`);
    const post = await response.json();

    if (post) {
      renderPost(post);
    } else {
      console.error(`Post with ID ${postId} not found.`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getDetailPost(postId);

function renderPost(post){
  detailPost.innerHTML = `
  <div class="row justify-content-center px-3 py-2">
  <div class="col-md-6 p-3 detail-post z-1">
      <div class=" d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
              <div class="img-container">
                  <img class="rounded-circle" width="70" src="https://ui-avatars.com/api/?name=${post.created_by}&background=0D8ABC&color=fff" alt="">
              </div>
              <div class=" ms-2">
                  <p class="name m-0">${post.created_by}</p>
                  <p class="date m-0">${getFormatDate(post.created_at)}</p>
              </div>
          </div>
          <div class="dropdown">
              <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"/></svg>
              </a>
  
              <ul class="dropdown-menu">
                  <li><a href="../view/edit.html?id=${post.id}" class="dropdown-item" ><svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v3.1l-8 7.975V22H6Zm8 0v-2.125l5.15-5.175l2.15 2.1l-5.175 5.2H14Zm8.025-5.9L19.9 13.975l.7-.7q.3-.3.725-.3t.7.3l.7.725q.275.3.275.713t-.275.687l-.7.7ZM13 9h5l-5-5v5Z"/></svg><span class="fw-semibold">Edit</span></a></li>
                  <li><button onclick="deletePost(${post.id})" class="dropdown-item" ><svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9 17h2V8H9v9Zm4 0h2V8h-2v9Zm-8 4V6H4V4h5V3h6v1h5v2h-1v15H5Z"/></svg><span class="fw-semibold">Delete</span></button></li>
              </ul>
          </div>
      </div>
      
  
      <div class="post-img mt-3 mb-2 rounded">
          <img class="img-thumbnail rounded" src="${post.image_url}" alt="">
      </div>
      <h4>${post.title}</h4>
      <p class="m-0">${post.content}</p>
      <button onclick="backToHome()" class="btn-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12zm10-1h4v2h-4v3l-4-4l4-4v3z"/></svg>Back</button>
  </div>
  </div>
  `;
}

//   go to home page 
  function backToHome(){
    const authToken = localStorage.getItem('authToken');
    if(authToken== null){
        window.location = "../index.html"
    }else {
        window.location = "./home.html";
    }
  }

//   convert date to formatted date 
  function getFormatDate(date){
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }

//   delete post with post id 
    function deletePost(id){
      if(checkAuthToken()){
        Swal.fire({
          imageUrl: '../asset/images/login-astro.png',
              title: 'Are you sure?',
              imageHeight : 200,
              text : "You won't be able to revert this!",
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes Delete it',
              cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
           // Delete with id
          fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE'
          })
        .then(function(){
          window.location = "./home.html"
        });
          }
        })
        
      }else {
        Swal.fire({
          imageUrl: '../asset/images/login-astro.png',
              title: 'Login Required',
              imageHeight : 200,
              text : 'Please login first to use this feature.',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Go to Login'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = "./login.html"
          }
        })
      }

    }


      // check auth token from localStorage 
      function checkAuthToken(){
        const authToken = localStorage.getItem('authToken');
        if(authToken){
          return true;
        }
        return false;
      }
      
    
      