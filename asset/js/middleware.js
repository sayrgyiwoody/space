// check auth token from localStorage 
//if user direct to authorized pages return back to index.html 
//just for client-side middleware
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