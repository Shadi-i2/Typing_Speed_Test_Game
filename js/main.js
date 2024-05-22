const wordsEasy = [
    "Bird",
    "Cake",
    "Blue",
    "Love",
    "Tree",
    "Rain",
    "Snow",
    "Bear",
    "Boat",
    "Fish",
    "Duck",
    "Rose",
    "Star",
    "Book",
    "Moon",
    "Song",
    "Play",
    "Wind",
    "Frog",
    "Gold",
];
const wordsNormal = [
    "Dolphin",
    "Jewelry",
    "Symphony",
    "Bicycle",
    "Universe",
    "Elephant",
    "Geography",
    "Zebra",
    "Calendar",
    "Satellite",
    "Parachute",
    "Navigate",
    "Prototype",
    "Volunteer",
    "Landscape",
    "Hurricane",
    "Adventure",
    "Opposition",
    "Whistle",
    "Fertilizer",
    "Roles",
    "Test",
    "Rust",
    "Playing",
    "Programming",
];
const wordsHard = [
    "Destructuring",
    "Documentation",
    "Dependencies",
    "Javascript",
    "Paradigm",
    "Acquaintance",
    "Anticipation",
    "Celebration",
    "Discontented",
    "Embarrassment",
    "Exaggerate",
    "Fluctuation",
    "Inquisitive",
    "Maintenance",
    "Obnoxious",
    "Perseverance",
    "Quintessential",
    "Refrigerator",
    "Unforgettable",
    "Vulnerability",
    "Accomplish",
    "Boulevard",
    "Catastrophe",
    "Determination",
    "Ebulliently",
    "Flabbergast",
    "Garrulous",
    "Hippopotamus",
    "Indestructible",
    "Judiciously",
];

let select = document.querySelector(".select");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let reloaded = document.querySelector(".reloaded");

const lvls = {
    "Easy": 6,
    "Normal": 5,
    "Hard": 4,
};

let defaultLevelName = `${select.value}`;
let defaultLevelSeconds = lvls[defaultLevelName];
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = wordsEasy.length;

select.onchange = function () {
    defaultLevelName = `${select.value}`;
    defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML =
        select.value == "Hard" ?
        wordsHard.length :
        select.value == "Normal" ?
        wordsNormal.length :
        wordsEasy.length;
};

input.onpaste = function () {
    return false;
};

startButton.onclick = function () {
    this.remove();
    input.focus();
    reloaded.style.display = "block";
    genWords();
};

reloaded.onclick = function () {
    window.location.reload();
};

function genWords() {
    if (lvlNameSpan.innerHTML == "Hard") {
        code(wordsHard);
    } else if (lvlNameSpan.innerHTML == "Normal") {
        code(wordsNormal);
    } else {
        code(wordsEasy);
    }

    function code(level) {
        let randomWord = level[Math.round(Math.random() * level.length)];
        let wordIndex = level.indexOf(randomWord);
        level.splice(wordIndex, 1);
        theWord.innerHTML = randomWord;
        upcomingWords.innerHTML = "";
        for (let i = 0; i < level.length; i++) {
            let div = document.createElement("div");
            let txt = document.createTextNode(level[i]);
            div.appendChild(txt);
            upcomingWords.appendChild(div);
        }
    }
    startPlay();
}

function startPlay() {
    if (scoreGot.innerHTML == 0) {
        timeLeftSpan.innerHTML = defaultLevelSeconds + 2;
    } else {
        timeLeftSpan.innerHTML = defaultLevelSeconds;
    }
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start);
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
                input.value = "";
                scoreGot.innerHTML++;
                if (upcomingWords.innerHTML != "") {
                    genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = "good";
                    let spanText = document.createTextNode("Congratulations !");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    upcomingWords.remove();
                }
            } else {
                input.blur();
                let span = document.createElement("span");
                span.className = "bad";
                let spanText = document.createTextNode("Game Over !");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}