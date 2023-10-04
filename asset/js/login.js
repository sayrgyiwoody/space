// password show and hide eye icon 
const eyeIcon = document.querySelector(".eye-icon");
const passwordInput = document.querySelector("#passwordInput");

eyeIcon.addEventListener("click",function(){
    if(eyeIcon.classList.contains('bi-eye')){
        eyeIcon.classList.add('bi-eye-slash');
        eyeIcon.classList.remove('bi-eye');
        passwordInput.type = 'text';
    }else {
        eyeIcon.classList.add('bi-eye');
        eyeIcon.classList.remove('bi-eye-slash');
        passwordInput.type = 'password';
    }
})

//login 

const btnLogin = document.querySelector(".btn-login");

btnLogin.addEventListener("click",function(){
    const userEmail = document.getElementById('emailInput').value;
    const userPassword = document.getElementById('passwordInput').value;


    requestLogin(userEmail,userPassword);
    
})


const emailInvalid = document.querySelector(".email-invalid");
const passwordInvalid = document.querySelector(".password-invalid");
const invalidBox = document.querySelector(".invalid-box");

function requestLogin(userEmail,userPassword){
    invalidBox.classList.add("d-none");
    emailInvalid.classList.add("d-none");
    passwordInvalid.classList.add("d-none");


    fetch(".././userData.json")
  .then((response) => response.json())
  .then((data) => {
        if(userEmail == data[0].email && userPassword == data[0].password) {
            localStorage.setItem('authToken', data[0].token);
            Swal.fire({
                imageUrl: '../asset/images/login-astro.png',
                title: 'Welcome to SPACE',
                imageHeight : 200,
                text : 'Share your thoughts to the whole universe.',
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location = "./home.html";
                }
              })
        }else {
            invalidBox.classList.remove("d-none");
            if(userEmail !== data[0].email) {
                emailInvalid.classList.remove("d-none");
            }
            if(userPassword !== data[0].password){
                passwordInvalid.classList.remove("d-none");
            }
        }

    })
    .catch(error => console.error('Error:', error));
    
}