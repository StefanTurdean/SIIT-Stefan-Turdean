console.log(localStorage);

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

const getUserData = (emailaddress) => {
  fetch(`https://contact-agenda-rest-api.herokuapp.com/users?email=${emailaddress}`)
  .then(processFetchResponse)
  .then(useUserData)
}

const processFetchResponse = (response) => response.json();

const useUserData = (data) => {
  console.log("this is the servar data");
  console.log(data);

  const password = inputPassword.value;
  
  if (!data.length || password != data[0].password) {
    alert("incorrect email or passward")
    inputEmail.value = ""
    inputPassword.value = ""
    return
  }
  
  localStorage.setItem("logged" , "true")
  window.location = "./index.html"
  
}

document.getElementById("login").addEventListener("click", () => {
  const email = inputEmail.value;
  
  getUserData(email);
});