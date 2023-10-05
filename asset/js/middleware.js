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