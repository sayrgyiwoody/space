const posts_container = document.getElementById("posts-container");

var currentPage = 1;

// fetch all posts from data.json
const getHomePosts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/posts/`);
    const data = await response.json();

    if (data) {
      // render to home post containers 
      checkPaginateBtns(data.length);
      renderHomePosts(data);
    } else {
      console.error(`Posts not found.`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const paginateBtns = document.getElementById("paginate-btns");

function checkPaginateBtns(dataLength){
  const postsPerPage = 10;
  const totalPage = Math.ceil(dataLength / postsPerPage);

  paginateBtns.innerHTML = `
    <button style="background-color:#155ccd;" onclick="changePage(${currentPage}-1)" class="btn btn-primary btn-pre">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="white" d="M22 12a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10m-8-5l-5 5l5 5V7Z"/></svg>
    Previous</button>
    <span class="text-white">Showing Page ${currentPage} of ${totalPage}</span>
    <button style="background-color:#155ccd;" onclick="changePage(${currentPage}+1)" class="btn btn-primary btn-next">Next
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="white" d="M2 12A10 10 0 0 1 12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12m8 5l5-5l-5-5v10Z"/></svg></button>
  `;
  
  if(currentPage == 1){
    document.querySelector(".btn-pre").classList.add("d-none");
  }
  if(currentPage == totalPage){
    document.querySelector(".btn-next").classList.add("d-none");
  }
}

function changePage(page){
  currentPage = page;
  getHomePosts();
  document.querySelector(".scroll-container").scrollTop = 0;
}



checkPaginateBtns();

getHomePosts();

function renderHomePosts(data){
  data.sort((a, b) => {
    return new Date(b.id) - new Date(a.id);
  });


  const postsPerPage = 10;
  const totalPage = data.length / postsPerPage;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;


  const latest = data.slice(startIndex, endIndex);

  posts_container.innerHTML = "";

  // add posts to latest posts container with foreach

  latest.forEach((d) => {
      posts_container.innerHTML += `
      <div class="col-12 p-3 pb-4 mb-3 detail-post z-1">
          <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                  <div class="img-container">
                      <img class="rounded-circle" width="60"
                          src="https://ui-avatars.com/api/?name=${d.created_by}&background=0D8ABC&color=fff" alt="">
                  </div>
                  <div class=" ms-2">
                      <p class="name m-0">${d.created_by}</p>
                      <p class="date m-0">${getFormatDate(d.created_at)}</p>
                  </div>
              </div>
          </div>
          <div class="post-img mt-3 mb-2 rounded">
              <img class="img-thumbnail rounded"
                  src="${d.image_url}"
                  alt="">
          </div>
          <h4>${d.title}</h4>
          <p class="mb-3">${limitWords(d.content,20)}</p>
          <a href="../view/detail.html?id=${d.id}" class="btn-read-more">Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <g clip-path="url(#clip0_4_68)">
                                              <path d="M8.75 7.5L11.25 10L8.75 12.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                              <path d="M1.66666 10C1.66666 6.07169 1.66666 4.10752 2.88666 2.88669C4.10832 1.66669 6.07166 1.66669 9.99999 1.66669C13.9283 1.66669 15.8925 1.66669 17.1125 2.88669C18.3333 4.10835 18.3333 6.07169 18.3333 10C18.3333 13.9284 18.3333 15.8925 17.1125 17.1125C15.8933 18.3334 13.9283 18.3334 9.99999 18.3334C6.07166 18.3334 4.10749 18.3334 2.88666 17.1125C1.66666 15.8934 1.66666 13.9284 1.66666 10Z" stroke="white" stroke-width="2"/>
                                            </g>
                                            <defs>
                                              <clipPath id="clip0_4_68">
                                                <rect width="20" height="20" fill="white"/>
                                              </clipPath>
                                            </defs>
                                          </svg>
                                    </a>
      </div>
`;
  });
}


// limit for content word
function limitWords(text, maxWords) {
  let words = text.split(" ");
  if (words.length > maxWords) {
    words = words.slice(0, maxWords);
    return words.join(" ") + " ...";
  }
  return text;
}

//   convert date to formatted date 
function getFormatDate(date){
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  }


//show/hide create form for mobile responsive

function showCreate(){
    const createForm = document.querySelector(".post-create-container");
    const showCreate = document.getElementById("btn-show-create");
    
    // console.log(createForm.classList.contains("d-none"));
    if(createForm.classList.contains("d-none")){
        showCreate.innerHTML = `
        Hide 
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M21 18.15L5.85 3H19q.825 0 1.413.588T21 5v13.15Zm-1.2 4.45L18.2 21H5q-.825 0-1.413-.588T3 19V5.8L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM6 17h8.175l-2.1-2.1l-.825 1.1L9 13l-3 4Z"/></svg>
        `;
        createForm.classList.remove("d-none");
        createForm.classList.add("d-block");
        
    }else {
        showCreate.innerHTML = 
        `Create
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M18 20v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2ZM3 21q-.825 0-1.413-.588T1 19V5q0-.825.588-1.413T3 3h14q.825 0 1.413.588T19 5v5h-2V8H3v11h13v2H3Z"/></svg>`
        ;
        createForm.classList.remove("d-block");
        createForm.classList.add("d-none");
    }
}

