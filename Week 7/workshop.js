// ## Digital Timer

// 1. Vream sa afisam un timer in browser, va incepe cu 00:00:00
// 2. Sa se faca update in real time ( la fiecare secunda )

// Cum structuam in html timer-ul?
// 00:00:00
// Solutia 1: fiecare grup de 00 intr-un span cu id
//
// Solutia 2: punem totul intr-un div - <div>00:00:00</div>

let hoursHTML = document.getElementById("hours");
let minutesHTML = document.getElementById("minutes");
let secondsHTML = document.getElementById("seconds");

let StartTimerBtn = document.querySelector("#startTimer")
let stopTimerBtn = document.querySelector("#stopTimer")
let resetTimerBtn = document.querySelector("#resetTimer")
let saveTimerBtn = document.querySelector("#saveTimer")

let seconds = 55;
let minutes = 59;
let hours = 0;

/**
 * @param {number} value - numbarul de sec/min/hr
 * @returns {string} adauga 0 daca value este mai mic de 10
 */
function formatTime(value) {
    // console.log(seconds); // putem avem acces aici
    // seconds = 0
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}
// va gasi minutes din scopul local deci nu mai merge la minutes var globala
// function timeLogic(minutes) { 
function timeLogic() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }

    if (minutes === 60) {
        hours++;
        minutes = 0;
    }
    console.log('seconds', seconds)
    console.log('minutes', minutes)
    console.log('hours', hours)
}

// De ce folosim variabile globale?
// Pentru ca vrem sa pastram valorile intre executile date de setInterval


 function startTimer() {
  timeLogic(); // apelam timeLogic cu valorile din variabilele globale

  updateTimeHtml(seconds, minutes, hours);
}



function updateTimeHtml(seconds, minutes, hours) {
    secondsHTML.innerHTML = formatTime(seconds);
    minutesHTML.innerHTML = formatTime(minutes);
    hoursHTML.innerHTML = formatTime(hours);
}

let timeHTML = document.getElementById("time");

/**
 * Face update pe div timeHTML conform valorilor din parametru
 * @param {number} seconds
 * @param {number} minutes
 * @param {number} hours
 */
function updateTimeHtmlV2(seconds, minutes, hours) {
    // 00:00:00
    // timeHTML.innerText =
    //   formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
    //

    timeHTML.innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}


// homeWork
// startTimer
let intervalId

function startInterval() {
if (!intervalId) {
    intervalId = setInterval(startTimer,1000)
}
}


StartTimerBtn.addEventListener("click",startInterval);


// stopTimer

stopTimerBtn.addEventListener("click",stopTimer);

function stopTimer() {
    clearInterval(intervalId)
    intervalId = null
}

// resetTimer

function resetTimer() {
    stopTimer();

    seconds = 0;
    minutes = 0;
    hours = 0;

    updateTimeHtml(seconds, minutes, hours);
}

resetTimerBtn.addEventListener("click",resetTimer);

// save time

let saveContainer = document.querySelector("#saveContainer")

function saveTime() {
    let timeSaved = document.createElement("div");

    timeSaved.innerText =`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`

    saveContainer.prepend(timeSaved);
}

saveTimerBtn.addEventListener("click",saveTime)
