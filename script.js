// The following variables below are all the sound variables and mute/unmute fucntions 
let backgroundMusic = new Audio();
let portalEnterSound = new Audio();
let portalExitSound = new Audio();

backgroundMusic.src = "sounds/bg-music.mp3";
portalEnterSound.src = "sounds/warp-entrance.mp3";
portalExitSound.src = "sounds/warp-exit.mp3";
let backgroundMusicStatus = 0;
let backgroundMusicInterval;

function playBackgroundMusic() {
    backgroundMusic.play();
    if (backgroundMusicStatus == 1) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 1;
    }
}

function muteBackgroundMusic() {
    const muteBtnImg = document.getElementById("mute-btn-img");
    if (backgroundMusicStatus == 0) {
        muteBtnImg.setAttribute("src", "assets/header/mute.png");
        backgroundMusic.volume = 0;
        backgroundMusicStatus++;
    } else {
        muteBtnImg.setAttribute("src", "assets/header/unmute.png");
        backgroundMusic.volume = 0.5;
        backgroundMusicStatus--;
    }
}

document.getElementById("mute-header-btn").addEventListener("click", muteBackgroundMusic)
//END HERE

// The following lines of codes are for the start animation (click to start)
document.addEventListener('click', () => {
    const portal = document.getElementById('portal');
    const burst = document.getElementById('portal-burst');

    void burst.offsetWidth;
    
    burst.classList.add('expand');
    portal.classList.add('show');

    setTimeout(() => {
    portalEnterSound.play();
    document.getElementById('start-title').style.opacity = '0';
    document.getElementById('start-header').style.opacity = '0';
    document.getElementById('bottom-ct').style.bottom = '-80px';
    document.getElementById('top-ct').style.top = '-80px';
    }, 0);

    setTimeout(() => {
        portal.classList.add('zoom');
    }, 600);

    setTimeout(() => {
        portalExitSound.play();
        document.getElementById('background-img').style.opacity = '0';
        document.getElementById('bottom-ct').style.bottom = '-480px';
        document.getElementById('top-ct').style.top = '-480px';
        portal.classList.add('shrink');
    }, 1900);

    setTimeout(() => {
        document.getElementById('background-img').style.opacity = '0';
    }, 2600);

    setTimeout(() => {
        hideStartScreen();
        burst.classList.remove('expand');
        portal.classList.remove('show', 'zoom', 'shrink');
    }, 2600);
}, { once: true });
//END HERE


// The following lines of codes include all of the functions and variables needed for you to transition from the start screen to the game board
let startScreenTimer;

function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    playBackgroundMusic();
    backgroundMusicInterval = setInterval(playBackgroundMusic, 120000);
    clearInterval(startScreenTimer);
}
//END HERE

// The following lines of codes hides all the header and gameboard elements, and shows the end message
function endGame() {
    const portal = document.getElementById('portal2');
    if (portal) {
        portal.classList.add('show');
    }

    // Hide game UI
    document.getElementById("game-board").style.display = "none";
    document.getElementById("header").style.display = "none";
    clearInterval(backgroundMusicInterval);
    backgroundMusic.volume = 0;

    if (roundIndex >= 7) { 
        document.getElementById("pass-end-screen").style.display = "flex";

        const scrambled = "RkFURQ==";
        const secretCode = atob(scrambled);

        const secretMessage = document.getElementById("secret-message");
        if (secretMessage) {
            secretMessage.innerHTML = "SECRET MESSAGE: <b>" + secretCode + "</b>.";
        }

    } else {
        document.getElementById("fail-end-screen").style.display = "flex";
    }
}

// FAIL SCREEN PORTAL RESET
document.addEventListener("DOMContentLoaded", () => {
    const resetPortal = document.getElementById("portal-reset");
    if (resetPortal) {
        resetPortal.addEventListener("click", () => {
            location.reload();
        });
    }
});

// END HERE

let inputBox = document.getElementById("input-box")
let promptText = document.getElementById("prompt-text")
let promptQuestion = document.getElementById("prompt-question")
let submitBtn = document.getElementById("submit-btn")

let roundIndex = 0

let questionBank = [
    [
        "RLC",
        "Multimedia library",
        "CLR"
    ],
    [
        "CWB",
        "Offers counseling and emotional support.",
        "BWC"
    ],
    [
        "SHMC",
        "For medical consultations, dental, and health talks.",
        "CHMS"
    ],
    [
        "MCL",
        "Leads retreats, recollections, and BeniRE.",
        "CLM"
    ],
    [
        "ECNANIF EFCIFO",
        "Handles payments and financial transactions.",
        "FINANCE OFFICE"
    ],
    [
        "EFCIFO FO HET RARTSIERG",
        "Keeps academic records and student data.",
        "OFFICE OF THE REGISTRAR"
    ],
    [
        "EIC",
        " Promotes equity and support for students with disabilities.",
        "CIE"
    ],
    [
        "EADSS",
        "Focused on Deaf education and accessibility.",
        "SDEAS"
    ],
    [
        "ICH",
        "Go-to for all school-related questions. ",
        "CIH"
    ],
    [
        "EMSCS",
        "Ensures safety, security, and emergency management on campus.",
        "CEMSS"
    ]
]

function startGame(){
    hideStartScreen()
    promptText.innerHTML = questionBank[roundIndex][0]
    promptQuestion.innerHTML = questionBank[roundIndex][1]
}

function checkAnswer(){
    var inputValue = inputBox.value

    if (inputValue.toUpperCase() == questionBank[roundIndex][2]){
        roundIndex++
        if (roundIndex >= 10) {
            endGame()
        } else {
            promptText.innerHTML = questionBank[roundIndex][0]
            promptQuestion.innerHTML = questionBank[roundIndex][1]
            inputBox.value = ""
        }
    } else {
        alert("PLEASE TRY AGAIN! Your answer is incorrect.")
    }
}

//BUTTONS AND EVENT LISTENERS
submitBtn.addEventListener("click", checkAnswer)

addEventListener('keypress', function (e){
    if (e.key === 'Enter') {
        checkAnswer()
    }
})
