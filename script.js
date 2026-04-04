const allQuestions = {
    const allQuestions = {
    "Level 1": [
        { question: "1. I don't have _______ questions about the lessons.", a: "some", b: "any", correct: "b" },
        { question: "2. The coordinator is _______ expert in communication.", a: "an", b: "a", correct: "a" },
        { question: "3. Last Sunday, the English Flow team _______ a special meeting.", a: "has", b: "had", correct: "b" },
        { question: "4. I believe that I _______ a great speaker very soon.", a: "will be", b: "was", correct: "a" },
        { question: "5. _______ the manager usually coordinate the training sessions?", a: "Does", b: "Do", correct: "a" },
        { question: "6. _______ the students practice their English every day?", a: "Do", b: "Does", correct: "a" }
    ],
    "Level 2": [
        { question: "1. Listen! The teacher _______ to the team about the exam right now.", a: "talks", b: "is talking", c: "talked", correct: "b" },
        { question: "2. I _______ my assignment, so I am ready to join the session.", a: "finished", b: "have finished", c: "finish", correct: "b" },
        { question: "3. We _______ start the final evaluation in five minutes.", a: "are going to", b: "will", c: "go to", correct: "a" },
        { question: "4. I am sorry, but there aren't _______ mistakes in your final writing task.", a: "some", b: "any", c: "no", correct: "b" },
        { question: "5. If you practice every day, you _______ your English skills very fast.", a: "improved", b: "will improve", c: "would improve", correct: "b" },
        { question: "6. _______ you ever participated in a Voice Note Challenge before?", a: "Have", b: "Has", c: "Did", correct: "a" },
        { question: "7. Would you like _______ water before we start the oral exam?", a: "any", b: "some", c: "many", correct: "b" }
    ],
    "Level 3": [
        { question: "1. This advanced educational platform _______ by a self-taught developer in 2026.", a: "is created", b: "was created", c: "creates", correct: "b" },
        { question: "2. The student said, 'I was ready.' -> He said that he _______ ready.", a: "is", b: "was", b: "was", c: "had been", correct: "c" },
        { question: "3. If I _______ more free time, I would learn three different languages.", a: "have", b: "had", c: "would have", correct: "b" },
        { question: "4. I wish I _______ speak English as fluently as a native speaker today.", a: "can", b: "could", c: "will", correct: "b" },
        { question: "5. This is the candidate _______ won the Voice Note Challenge last week.", a: "which", b: "who", c: "whose", correct: "b" },
        { question: "6. This time tomorrow, all the students _______ the final English exam.", a: "will take", b: "will be taking", c: "are taking", correct: "b" },
        { question: "7. She asked me, 'Where do you live?' -> She asked me where I _______.", a: "lived", b: "lives", c: "live", correct: "a" }, // Notsongaina teto ny "a"
        { question: "8. The results _______ to the candidates by email next Tuesday morning.", a: "will send", b: "will be sent", c: "were sent", correct: "b" },
        { question: "9. The laptop _______ I bought for coding is very fast and efficient.", a: "who", b: "whom", c: "which", correct: "c" },
        { question: "10. If she _______ the manager, she would change the communication strategy.", a: "is", b: "was", c: "were", correct: "c" }
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

// --- 4. SECURITY SYSTEM (PC & MOBILE) ---

// 1. Misakana ny "Long Press" amin'ny Phone sy "Right Click" amin'ny PC
document.addEventListener('contextmenu', event => event.preventDefault()); 

// 2. Misakana ny fikasana handika (Copy) ny soratra rehetra
document.addEventListener('copy', event => {
    event.preventDefault();
    alert("Copying is disabled during the exam. Focus on your own work!");
});

// 3. Misakana ny fitambarana fanalahidy (Shortcut keys) amin'ny klavier
document.onkeydown = function(e) {
    // F12 (Inspect Element)
    if(e.keyCode == 123) return false;
    
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (Developer tools)
    if(e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) return false;
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    
    // Ctrl+C (Copy), Ctrl+V (Paste), Ctrl+S (Save)
    if(e.ctrlKey && (e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'V'.charCodeAt(0) || e.keyCode == 'S'.charCodeAt(0))) return false;
};
