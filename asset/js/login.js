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

function requestLogin(userEmail,userPassword){
    fetch(".././userData.json")
  .then((response) => response.json())
  .then((data) => {
        if(userEmail == data[0].email && userPassword == data[0].password) {
            localStorage.setItem('authToken', data[0].token);
            Swal.fire({
                icon: 'success',
                title: 'Login Success',
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location = "./home.html";
                }
              })
        }else {
            let errorMsg = '';
            if(userEmail !== data[0].email) {
                errorMsg += 'Email is incorrect! ';
            }
            if(userPassword !== data[0].password){
                errorMsg += 'Password is incorrect! ';
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${errorMsg}`,
                // footer: '<a href="">Why do I have this issue?</a>'
              })
        }

    })
    .catch(error => console.error('Error:', error));
    
}