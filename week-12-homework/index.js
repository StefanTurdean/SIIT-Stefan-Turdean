console.log("this is local storage");
console.log(localStorage);

if (!localStorage.length) {
  window.location = "/login.html";
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  window.location = "index.html";
});
