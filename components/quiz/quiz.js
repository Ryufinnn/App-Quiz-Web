//Bagian Pemangilan dan penambahan Kelas 
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


// 10 questions with options and answer array
const quizArray = [
    {
        id: "0",
        question: "Siapa Presiden Pertama Indonesia?",
        options: [
            "Soekarno",
            "Soeharto",
            "Prabowo",
            "Joko Widodo",
        ],
        correct: "Soekarno",
    },
    {
        id: "1",
        question: "Apa Warna Bendera Indonesia?",
        options: [
            "Biru dan Putih",
            "Hijau dan Biru",
            "Putih dan Merah",
            "Merah dan Putih",
        ],
        correct: "Merah dan Putih",
    },
    {
        id: "2",
        question: "Kelelawar tidur pada Waktu?",
        options: [
            "Siang hari",
            "Pagi hari",
            "Malam hari",
            "Sore hari",
        ],
        correct: "Siang hari",
    },
    {
        id: "3",
        question: "Monyet suka makan?",
        options: [
            "Pisang",
            "Durian",
            "Rambutan",
            "Semangka",
        ],
        correct: "Pisang",
    },
    {
        id: "4",
        question: "15 + 20 x 2 - 5 : 5 =?",
        options: [
            "37",
            "40",
            "25",
            "54",
        ],
        correct: "54",
    },
    {
        id: "5",
        question:
        "Bangun pagi ku terus mandi tidak lupa mengosok_______?",
        options: [
            "Mata",
            "Tangan",
            "Gigi",
            "Kaki",
        ],
        correct: "Gigi",
    },
    {
        id: "6",
        question: "2 + 5 =?",
        options: [
            "4",
            "11",
            "8",
            "7",
        ],
        correct: "7",
    },
    {
        id: "7",
        question: "20 - 7 =?",
        options: [
            "8",
            "11",
            "13",
            "17",
        ],
        correct: "13",
    },
    {
        id: "8",
        question: "10 x 5 =?",
        options: [
            "30",
            "50",
            "60",
            "25",
        ],
        correct: "50",
    },
    {
        id: "9",
        question: "5 + 5 =?",
        options: [
            "10",
            "7",
            "9",
            "15",
        ],
        correct: "10",
    },

];


//Penambahan Fungsi dan Interktif
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", (displayNext = () => {
        questionCount += 1;

        if (questionCount == quizArray.length){
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML = " Nilai Kamu Adalah " +
            scoreCount + " Dari " + questionCount;
        } else {
            countOfQuestion.innerHTML = 
            questionCount + 1 + " dari " + quizArray.length + 
            " Pertanyaan";

            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    
    })
);


const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreater() {
    quizArray.sort(() => Math.random() - 0.5);

    for (let i of quizArray) {
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " Dari " + quizArray.length + " Pertanyaan";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">
        ${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">
        ${i.options[3]}</button>
        `;


        quizContainer.appendChild(div);
    }
}

function checker(userOption){
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}

function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
