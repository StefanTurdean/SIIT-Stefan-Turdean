let userFirstName = document.getElementById("firstName");
let userLastName = document.getElementById("lastName");
let userMobileNumber = document.getElementById("mobileNumber");

let userStreet = document.getElementById("streetInput");
let userNumber = document.getElementById("numberInput");
let userCity = document.getElementById("cityInput");
let userCountry = document.getElementById("countryInput");

let contactListContainer = document.querySelector(".userListContainer");

let sendUpdateBtn = document.getElementById("sendUpdateBtn");
sendUpdateBtn.addEventListener("click",sendNewUser)

let usersStorage = [];

function getUserData() {
    fetch("https://contact-agenda-rest-api.herokuapp.com/users")
        .then(processFetchResponse)
        .then(useUserData);
}

getUserData();

function processFetchResponse(response) {
    if (response.status === 404) {
        throw new Error('404 error');
    };

    return response.json();
}

function useUserData(data) {
    usersStorage = data

    for (const key in data) {
        renderUsers(key, data);
    }
}

function renderUsers(key, data) {
    let userContainer = document.createElement("div")
    userContainer.classList.add("userContainer")

    userList = document.createElement("div")
    userList.classList.add("userList")


    if (data[key].first_name && data[key].last_name) {
        let imgDiv = document.createElement("div")
        imgDiv.classList.add("userImg")

        let userName = document.createElement("div");
        userName.innerText = `${data[key].first_name} ${data[key].last_name}`

        userName.prepend(imgDiv)
        userList.appendChild(userName);
    }

    if (data[key].mobile) {
        let imgdiv = document.createElement("div")
        imgdiv.classList.add("mobileImg")

        let userMobile = document.createElement("div");
        userMobile.innerText = `${data[key].mobile}`;

        userMobile.prepend(imgdiv);
        userList.appendChild(userMobile);
    }

    if (data[key].address) {
        if (data[key].address.street && data[key].address.number && data[key].address.city && data[key].address.country) {
            let userAddress = document.createElement("div");
            userAddress.innerText = `${data[key].address.street}, ${data[key].address.number}, ${data[key].address.city}, ${data[key].address.country}`;

            let imgdiv = document.createElement("div")
            imgdiv.classList.add("addressImg")    

            userAddress.prepend(imgdiv);
            userList.appendChild(userAddress);
        }
    }

    userContainer.appendChild(userList)

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");
    userContainer.appendChild(btnContainer);

    let updateBtn = document.createElement("div");
    updateBtn.classList.add("updateBtn");

    updateBtn.addEventListener("click", function(){
        editUsers(key)
    })

    btnContainer.appendChild(updateBtn);

    contactListContainer.appendChild(userContainer);

    deleteBtn = document.createElement("div");
    deleteBtn.classList.add("deleteBtn");

    deleteBtn.addEventListener("click", function () {
        deleteUser(data[key].id)
    })

    btnContainer.appendChild(deleteBtn)
}

function deleteUser(userId) {
    fetch("https://contact-agenda-rest-api.herokuapp.com/users/" + userId, {
        method: "DELETE",
    }).then(reloadPage)
}

function sendNewUser() {
    let sendUserInput = {};

    if (userFirstName.value && userLastName.value) {
        sendUserInput.first_name = userFirstName.value;
        sendUserInput.last_name = userLastName.value;
    }

    if (userMobileNumber.value) {
        sendUserInput.mobile = userMobileNumber.value;
    }

    if (userStreet.value && userNumber.value && userCity.value && userCountry.value) {
        sendUserInput.address = {}

        sendUserInput.address.street = userStreet.value;
        sendUserInput.address.number = userNumber.value;
        sendUserInput.address.city = userCity.value;
        sendUserInput.address.country = userCountry.value;
    }

    if (Object.keys(sendUserInput).length == 0) {
        console.log("first and last name are needed");
        return
    }

    userFirstName.value = "";
    userLastName.value = "";
    userMobileNumber.value = "";

    userStreet.value = "";
    userNumber.value = "";
    userCity.value = "";
    userCountry.value = "";

    console.log(sendUserInput);

    fetch("https://contact-agenda-rest-api.herokuapp.com/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sendUserInput)
    }).then(res => {
        console.log("Request complete! response:", res);
        reloadPage()
    });
}

function reloadPage() {
    contactListContainer.innerHTML = ""
    getUserData()
}

function editUsers(currentUser) {

    let elementId = Number(currentUser) + 1

    if (usersStorage[currentUser].first_name) {
        userFirstName.value = usersStorage[currentUser].first_name;
    }
    else {
        userFirstName.value = "";
    }

    if (usersStorage[currentUser].last_name) {
        userLastName.value = usersStorage[currentUser].last_name;
    }
    else {
        userLastName.value = "";
    }

    if (usersStorage[currentUser].mobile) {
        userMobileNumber.value = usersStorage[currentUser].mobile;
    }
    else {
        userMobileNumber.value = "";
    }

    if (usersStorage[currentUser].address) {
        userStreet.value = usersStorage[currentUser].address.street;
        userNumber.value = usersStorage[currentUser].address.number;
        userCity.value = usersStorage[currentUser].address.city;
        userCountry.value = usersStorage[currentUser].address.country;
    }
    else {
        userStreet.value = "";
        userNumber.value = "";
        userCity.value = "";
        userCountry.value = "";
    }

    sendUpdateBtn.removeEventListener("click",sendNewUser);
    sendUpdateBtn.innerText = "Update";
    sendUpdateBtn.addEventListener("click",function ano() {
        updateUser(elementId)
        sendUpdateBtn.removeEventListener("click", ano)
    });
}



// i worked with PATCH insted of PUT i want to "do not so nice things to" myself
function updateUser(id) {
    let userInputAddress = {
        street: userStreet.value,
        number: userNumber.value,
        city: userCity.value,
        country: userCountry.value,
    }
    
    let changes = {};

    if (userFirstName.value && userLastName.value) {
        changes.first_name = userFirstName.value;
        changes.last_name = userLastName.value;
    }

    if (userMobileNumber.value) {
        changes.mobile = userMobileNumber.value;
    }

    if (userStreet.value && userNumber.value && userCity.value && userCountry.value) {
        changes.address = userInputAddress;
    }

    if (Object.keys(changes).length == 0) {
        deleteUser(id)

        sendUpdateBtn.innerText = "Send";
        sendUpdateBtn.addEventListener("click",sendNewUser);
        return
    }

    fetch(`https://contact-agenda-rest-api.herokuapp.com/users/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes)
    }).then(res => {
        userFirstName.value = "";
        userLastName.value = "";
        userMobileNumber.value = "";
    
        userStreet.value = "";
        userNumber.value = "";
        userCity.value = "";
        userCountry.value = "";

        console.log("Request complete! response:", res);

        sendUpdateBtn.innerText = "Send";
        sendUpdateBtn.addEventListener("click",sendNewUser);
        reloadPage()
    });
}
