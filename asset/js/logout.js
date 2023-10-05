//logout and remove authToken from local storage
function logout(){
    localStorage.removeItem("authToken");
    window.location = '../index.html';
}