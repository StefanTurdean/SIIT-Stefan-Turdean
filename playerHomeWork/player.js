
const gameArea = document.querySelector("#gameArea");
const player = document.createElement("div");
const lifeContainer = document.querySelector("#lifeContainer")
const msgContainer = document.querySelector("#msg")


const gameUnit = "rem";

// creating the game area
let gameAreaDimension = 50;

Object.assign(gameArea.style, {
    width: gameAreaDimension + gameUnit,
    height: gameAreaDimension + gameUnit,
    backgroundColor: "grey",

    position: "relative",
})
// creating player
gameArea.append(player);

let playerDimension = 1;

let playerTop = gameAreaDimension / 2 - playerDimension;
let playerLeft = gameAreaDimension / 2 - playerDimension;

Object.assign(player.style, {
    width: playerDimension + gameUnit,
    height: playerDimension + gameUnit,

    position: "absolute",

    backgroundColor: "black",
    borderRadius: "50%",

    top: playerTop + gameUnit,
    left: playerLeft + gameUnit,
})

// creating lifes
let lifeBar = 2;

function CreateLifeHtml(numberOflives) {
    for (let index = 0; index < numberOflives; index++) {
        let lifeHtml = document.createElement("div");
        lifeHtml.id = ("lifeHtml" + index);

        Object.assign(lifeHtml.style, {
            width: 1 + gameUnit,
            height: 1 + gameUnit,

            display: "inline-block",

            backgroundColor: "red",
            borderRadius: "50%",
        });

        lifeContainer.append(lifeHtml);
    }
}
CreateLifeHtml(lifeBar);

// removing lives
let lifeCount = lifeBar -1

function removeLife(text) {
    let tobedeleted = document.querySelector("#lifeHtml" + lifeCount);
    lifeContainer.removeChild(tobedeleted);

    lifeCount = lifeCount -1;

    console.log(lifeCount);
    msgContainer.innerHTML = text;
}


// reset if the player lost
function resetGameOrLoseLife() {
    if (lifeCount < 1) {
        playerTop = gameAreaDimension / 2 - playerDimension;
        playerLeft = gameAreaDimension / 2 - playerDimension;

        CreateLifeHtml(lifeBar);

        removeLife("you lost and now the game is going to reset (the player will move back to middle on key press)");
        
        lifeCount = lifeBar -1;
    }
    else {
        removeLife("you hit a wall! Because you hit the wall you lose a life");
    }
}

// move player
document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    // console.log(e.key);
    switch (e.key) {
        case "w":
        case "ArrowUp":
            if (playerTop > 0) {
                playerTop -= 1;
                player.style.top = playerTop + gameUnit;
            }
            else {
                resetGameOrLoseLife()
            }
            break;

        case "a":
        case "ArrowLeft":
            if (playerLeft > 0) {
                playerLeft -= 1;
                player.style.left = playerLeft + gameUnit;
            }
            else {
                resetGameOrLoseLife();
            }
            break;

        case "s":
        case "ArrowDown":
            if (playerTop < gameAreaDimension - playerDimension) {
                playerTop += 1;
                player.style.top = playerTop + gameUnit;
            }
            else {
                resetGameOrLoseLife()
            }
            break;

        case "d":
        case "ArrowRight":
            if (playerLeft < gameAreaDimension - playerDimension) {
                playerLeft += 1;
                player.style.left = playerLeft + gameUnit;
            }
            else {
                resetGameOrLoseLife();
            }
            break;

        default:
            break;
    }
}
