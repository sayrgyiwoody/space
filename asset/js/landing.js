// fetch all posts from data.json
const getPosts = async () => {
  try {
    const response = await fetch(`http://localhost:3000/posts/`);
    const data = await response.json();

    if (data) {
      // render to recommend and latest post containers 
      renderRecommend(data);
      renderLatest(data);
    } else {
      console.error(`Posts not found.`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getPosts();

// render 10 recommend posts with view count most to least
function renderRecommend(data){

  data.sort((a, b) => b.view_count - a.view_count);
    const recommend = data.slice(0, 10);

    // add posts to recommend posts container with foreach
    recommend.forEach((d) => {
      document.getElementById("recommend-posts").innerHTML += `<div class="swiper-slide post-box me-3">
                              <div class="post">
                                  <img src="${d.image_url}" class="card-img-top" alt="...">
                                  <div class="card-body text-center pt-3 pb-4 px-3">
                                      <h5 class="post-title m-0 mb-1">${d.title}</h5>
                                      <p class="post-text">${limitWords(d.content,10)}</p>
                                      <a href="./view/detail.html?id=${d.id}" class="btn-read-more">Read More
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
                              </div>
                          </div>`;
    });
  
}

// render 10 recommend posts with created_at date most to least
function renderLatest(data){
  data.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const latest = data.slice(0, 10);

  // add posts to latest posts container with foreach

  latest.forEach((d) => {
    document.getElementById("latest-posts").innerHTML += `<div class="swiper-slide post-box me-3">
                        <div class="post">
                            <img src="${d.image_url}" class="card-img-top" alt="...">
                            <div class="card-body text-center pt-3 pb-4 px-3">
                                <h5 class="post-title m-0 mb-1">${d.title}</h5>
                                <p class="post-text">${limitWords(d.content,10)}</p>
                                <a href="./view/detail.html?id=${d.id}" class="btn-read-more">Read More
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
                        </div>
                    </div>`;
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
