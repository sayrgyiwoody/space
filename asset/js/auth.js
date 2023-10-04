const btnAuthText = document.querySelector(".btn-auth .text");

const authToken = localStorage.getItem("authToken");

//showing login or logout according to authToken in localStorage
if(authToken){
    btnAuthText.innerHTML ="Logout";
}else {
    btnAuthText.innerHTML ="Login";
}