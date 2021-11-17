
const backBtn = document.querySelector("#backBtn");
const nextBtn = document.querySelector("#nextBtn");
const imgContainer = document.querySelector(".imgContainer");
const dogoImg = document.querySelector(".dogoImg");

let imgStorage = [];
let index = 0;

function getDogo() {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(processFetchResponse)
    .then(useDogData);
}

getDogo();

function processFetchResponse(response) {
    if (response.status === 404) {
        throw new Error('404 error');
    }

    return response.json();
}

function useDogData(data) {
    imgStorage.push(data.message);

    dogoImg.src = imgStorage[index];

    nextBtn.disabled = false;
}


function nextDogo() {
    if (!imgStorage[index + 1]) {
        index++

        nextBtn.disabled = true;
        getDogo()
    }
    else{
        index++
        dogoImg.src = imgStorage[index];
    }

}

nextBtn.addEventListener("click", nextDogo);

function backDogo() {
    if (index < 1) {
        return
    }

    index--
    dogoImg.src = imgStorage[index];
}

backBtn.addEventListener("click", backDogo)