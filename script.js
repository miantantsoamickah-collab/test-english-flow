const allQuestions = {
    "Level 1": [
        { question: "1. I don't have _______ questions about the Elite Pillars.", a: "some", b: "any", correct: "b" },
        { question: "2. Administrator Mickah is _______ expert in communication.", a: "a", b: "an", correct: "b" },
        { question: "3. Next Monday, the students _______ their English exam.", a: "will take", b: "took", correct: "a" },
        { question: "4. Yesterday, I _______ my 'Voice Note Challenge' on Dolby On.", a: "finish", b: "finished", correct: "b" },
        { question: "5. English Flow is _______ great community for global leaders.", a: "a", b: "an", correct: "a" }
    ],
    "Level 2": [
        { question: "1. Do you have _______ ideas for the new school project?", a: "some", b: "any", c: "no", correct: "b" },
        { question: "2. Look! The children _______ a bridge to the future right now.", a: "builds", b: "are building", c: "built", correct: "b" },
        { question: "3. It takes _______ village to raise a child.", a: "an", b: "a", c: "any", correct: "b" },
        { question: "4. Last year, he _______ a student, but today he is a Manager.", a: "was", b: "is", c: "will be", correct: "a" },
        { question: "5. Is there _______ here who speaks English fluently?", a: "someone", b: "anyone", c: "something", correct: "b" },
        { question: "6. I believe that you _______ a great leader in the global world.", a: "are", b: "were", c: "will be", correct: "c" },
        { question: "7. I have _______ apple, and I want to share it with the team.", a: "an", b: "a", c: "any", correct: "a" }
    ],
    "Level 3": [
        { question: "1. (Offer) Would you like _______ coffee before we start?", a: "any", b: "some", c: "no", correct: "b" },
        { question: "2. The CEO _______ to the office very late yesterday.", a: "comed", b: "came", c: "come", correct: "b" },
        { question: "3. I have _______ to say to people who don't believe in growth.", a: "anything", b: "something", c: "nothing", correct: "c" },
        { question: "4. By this time next year, I _______ my degree at CNTEMAD.", a: "will start", b: "started", c: "start", correct: "a" },
        { question: "5. It is _______ honor to meet an international judge like Chrissy.", a: "a", b: "an", c: "any", correct: "b" },
        { question: "6. There was hardly _______ in the room when the session began.", a: "anyone", b: "someone", c: "everyone", correct: "a" },
        { question: "7. We _______ English Flow for three months now and we love it!", a: "joined", b: "have joined", c: "join", correct: "b" },
        { question: "8. You can take _______ seat you like; they are all free.", a: "some", b: "any", c: "no", correct: "b" },
        { question: "9. (Passive) The 'Voice Challenge' _______ by Administrator Mickah every week.", a: "is managed", b: "manages", c: "managed", correct: "a" },
        { question: "10. (Passive) The exam results _______ to the students next Tuesday morning.", a: "will send", b: "were sent", c: "will be sent", correct: "c" }
    ]
};

let quizData = [], currentQuiz = 0, score = 0, timeLeft = 300, studentName = "", studentLevel = "", timerInterval;

const quiz = document.getElementById('quiz'), regSection = document.getElementById('registration-section'), quizSection = document.getElementById('quiz-section');
const startBtn = document.getElementById('start_btn'), nameInput = document.getElementById('student_name'), levelChoice = document.getElementById('student_level_choice');
const questionEl = document.getElementById('question'), a_text = document.getElementById('a_text'), b_text = document.getElementById('b_text'), c_text = document.getElementById('c_text'), li_c = document.getElementById('li_c');
const submitBtn = document.getElementById('submit'), timerDisplay = document.getElementById('timer'), answerEls = document.querySelectorAll('.answer');

// 1. CHECK STATUS ON PAGE LOAD
window.onload = () => {
    const status = localStorage.getItem("examStatus");
    
    if (status === "completed") {
        quiz.innerHTML = `<div style="text-align:center; padding:40px;"><h2 style="color:#e74c3c;">Access Denied</h2><p>You have already completed this exam.</p></div>`;
    } 
    else if (status === "in_progress") {
        studentName = localStorage.getItem("tempName");
        studentLevel = localStorage.getItem("tempLevel");
        currentQuiz = parseInt(localStorage.getItem("tempIndex")) || 0;
        score = parseInt(localStorage.getItem("tempScore")) || 0;
        timeLeft = parseInt(localStorage.getItem("tempTime")) || 300;

        regSection.innerHTML = `
            <h1 style="color:#2c3e50;">Welcome back, ${studentName}</h1>
            <p>Your exam for <b>${studentLevel}</b> is still in progress.</p>
            <button id="continue_btn" style="background:#27ae60; color:white; padding:15px; border:none; border-radius:5px; cursor:pointer; width:100%; font-weight:bold; font-size:1.1rem;">Continue My Exam</button>
        `;

        document.getElementById('continue_btn').onclick = () => {
            quizData = allQuestions[studentLevel];
            regSection.style.display = "none";
            quizSection.style.display = "block";
            loadQuiz();
            startTimer();
        };
    }
};

// 2. START NEW EXAM
startBtn.addEventListener('click', () => {
    studentName = nameInput.value.trim();
    studentLevel = levelChoice.value; 
    if(studentName) {
        localStorage.setItem("examStatus", "in_progress");
        localStorage.setItem("tempName", studentName);
        localStorage.setItem("tempLevel", studentLevel);
        
        quizData = allQuestions[studentLevel]; 
        regSection.style.display = "none";
        quizSection.style.display = "block";
        loadQuiz();
        startTimer();
    } else { alert("Please enter your name!"); }
});

function loadQuiz() {
    deselectAnswers();
    const currentData = quizData[currentQuiz];
    questionEl.innerText = currentData.question;
    a_text.innerText = currentData.a;
    b_text.innerText = currentData.b;

    if(currentData.c) {
        li_c.style.display = "block";
        c_text.innerText = currentData.c;
    } else {
        li_c.style.display = "none";
    }

    localStorage.setItem("tempIndex", currentQuiz);
    localStorage.setItem("tempScore", score);
}

function deselectAnswers() { answerEls.forEach(el => el.checked = false); }

function getSelected() {
    let answer;
    answerEls.forEach(el => { if(el.checked) answer = el.id; });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if(answer) {
        if(answer === quizData[currentQuiz].correct) score++;
        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    } else { alert("Please select an answer!"); }
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        localStorage.setItem("tempTime", timeLeft);
        let mins = Math.floor(timeLeft / 60), secs = timeLeft % 60;
        timerDisplay.innerText = `Time left: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (timeLeft <= 0) showResults();
    }, 1000);
}

function showResults() {
    clearInterval(timerInterval);
    localStorage.setItem("examStatus", "completed");
    
    const totalQuestions = quizData.length;
    const percentage = ((score / totalQuestions) * 100).toFixed(0);
    let status = (percentage >= 90) ? "TRES BIEN" : (percentage >= 70) ? "BIEN" : (percentage >= 50) ? "PASSABLE" : "REPEAT NEEDED";

    const p1 = "xlgo", p2 = "jjqq"; 

    fetch("https://formspree.io/f/" + p1 + p2, {
        method: "POST",
        body: JSON.stringify({ 
            name: studentName, 
            level: studentLevel, 
            score: score + "/" + totalQuestions, 
            percent: percentage + "%", 
            mention: status
        }),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    // CONFETTI BURST
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }

    quiz.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <h1 style="color: #27ae60; font-size: 3rem;">🎉</h1>
            <h2 style="color: #2c3e50;">Congratulations, ${studentName}!</h2>
            <p style="font-size: 1.1rem;">Your exam for <strong>${studentLevel}</strong> has been successfully submitted.</p>
            <h3 style="color: #2980b9; font-weight: bold; margin-top: 20px;">IT IS FINISHED</h3>
            <p>Your results will be reviewed by the English Flow team.</p>
            <button onclick="localStorage.clear(); location.reload();" 
                style="margin-top: 30px; padding: 15px 30px; cursor: pointer; background:#2c3e50; color:white; border:none; border-radius:8px; font-weight:bold;">
                Exit Exam
            </button>
        </div>`;
}

// 3. EMERGENCY DATA SEND (IF CLOSED SUDDENLY)
window.addEventListener('pagehide', function() {
    if (localStorage.getItem("examStatus") === "in_progress") {
        const sName = localStorage.getItem("tempName");
        const sLevel = localStorage.getItem("tempLevel");
        const sScore = localStorage.getItem("tempScore") || 0;
        const p1 = "xlgo", p2 = "jjqq";

        const data = JSON.stringify({
            name: sName + " (INTERRUPTED)",
            level: sLevel,
            score: sScore + " (Incomplete/Closed)",
            status: "User left page before finishing"
        });

        navigator.sendBeacon("https://formspree.io/f/" + p1 + p2, data);
    }
});

window.onbeforeunload = function() {
    if (quizSection.style.display === "block") {
        return "Your progress is saved, but the timer keeps running!";
    }
};
