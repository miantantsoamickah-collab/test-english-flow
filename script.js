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
        { question: "2. The student said, 'I was ready.' -> He said that he _______ ready.", a: "is", b: "was", c: "had been", correct: "c" },
        { question: "3. If I _______ more free time, I would learn three different languages.", a: "have", b: "had", c: "would have", correct: "b" },
        { question: "4. I wish I _______ speak English as fluently as a native speaker today.", a: "can", b: "could", c: "will", correct: "b" },
        { question: "5. This is the candidate _______ won the Voice Note Challenge last week.", a: "which", b: "who", c: "whose", correct: "b" },
        { question: "6. This time tomorrow, all the students _______ the final English exam.", a: "will take", b: "will be taking", c: "are taking", correct: "b" },
        { question: "7. She asked me, 'Where do you live?' -> She asked me where I _______.", a: "lived", b: "lives", c: "live", correct: "a" },
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

window.onload = () => {
    const status = localStorage.getItem("examStatus");
    if (status === "completed") {
        quiz.innerHTML = `<div style="text-align:center; padding:40px;"><h2 style="color:#e74c3c;">Access Denied</h2><p>You have already completed this exam.</p></div>`;
    }
};

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
    if(currentData.c) { li_c.style.display = "block"; c_text.innerText = currentData.c; } 
    else { li_c.style.display = "none"; }
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
        if(currentQuiz < quizData.length) { loadQuiz(); } 
        else { showResults(); }
    } else { alert("Please select an answer!"); }
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
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
    
    // SEND DATA
    const p1 = "xlgo", p2 = "jjqq"; 
    fetch("https://formspree.io/f/" + p1 + p2, {
        method: "POST",
        body: JSON.stringify({ name: studentName, level: studentLevel, score: score + "/" + totalQuestions, percent: percentage + "%", mention: status }),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    if (typeof confetti === 'function') { confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } }); }

    quiz.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <h1 style="color: #27ae60; font-size: 3rem;">🎉</h1>
            <h2>Congratulations, ${studentName}!</h2>
            <h3>Score: ${score}/${totalQuestions} (${percentage}%)</h3>
            <p>IT IS FINISHED.</p>
            <button onclick="localStorage.clear(); location.reload();" style="margin-top: 20px;">Exit Exam</button>
        </div>`;
}

// Security (Anti-copy/Inspect)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && (e.keyCode == 85 || e.keyCode == 67 || e.keyCode == 86))) return false;
};
