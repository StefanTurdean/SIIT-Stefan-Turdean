
const backBtn = document.querySelector("#backBtn");
const nextBtn = document.querySelector("#nextBtn");
const imgContainer = document.querySelector(".imgContainer");
const dogoImg = document.querySelector(".dogoImg");
const btnContainer = document.querySelector("#btnContainer");
const titleDogo = document.querySelector("#titleDogo");

let index = 0;

let dogoList = [];

backBtn.addEventListener("click", backDogo);
nextBtn.addEventListener("click", nextDogo);
getDogo();

function getDogo() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(processFetchResponse)
    .then(useDogData);


}


function processFetchResponse(response) {
    if (response.status === 404) {
        throw new Error('404 error');
    }

    return response.json();
}

function useDogData(data) {
    console.log(data);
    for (const key in data.message) {
        let dogoBtn = document.createElement("button");
        dogoBtn.innerHTML = `${key}`;
        dogoBtn.classList.add("getDogoBtn")

        btnContainer.append(dogoBtn);
        dogoBtn.addEventListener("click", getBreedDogo);

        if (key == Object.keys(data.message)[0]) {
            dogoBtn.click()
        }
    }
}

function getBreedDogo(e) {
    fetch("https://dog.ceo/api/breed/" + e.currentTarget.innerHTML + "/images")
    .then(processFetchResponse)
    .then(useBreedDogoData);

    index = 0
    
    titleDogo.innerHTML = e.currentTarget.innerHTML.toUpperCase()
}

function useBreedDogoData(data) {
    console.log(data);

    dogoImg.src = data.message[0];

    dogoList = data.message;
}


function nextDogo() {
    if (!dogoList[index + 1]) {
        return;
    }
    else{
        index++;
        dogoImg.src = dogoList[index];
    }

}


function backDogo() {
    if (index < 1) {
        return;
    }

    index--;
    dogoImg.src = dogoList[index];
}

