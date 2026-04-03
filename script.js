const allQuestions = {
    "Level 1": [
        { question: "1. Past tense of 'Eat'?", a: "Ate", b: "Eaten", correct: "a" },
        { question: "2. 'She ___ happy.'", a: "is", b: "are", correct: "a" },
        { question: "3. Opposite of 'Big'?", a: "Small", b: "Tall", correct: "a" },
        { question: "4. Plural of 'Apple'?", a: "Apples", b: "Applees", correct: "a" },
        { question: "5. 'I ___ to school every day.'", a: "go", b: "goes", correct: "a" },
        { question: "6. Which is a color?", a: "Blue", b: "Car", correct: "a" },
        { question: "7. '___ you like coffee?'", a: "Do", b: "Does", correct: "a" },
        { question: "8. 10 + 5 is...", a: "Fifteen", b: "Fifty", correct: "a" },
        { question: "9. Today is Monday, tomorrow is...", a: "Tuesday", b: "Sunday", correct: "a" },
        { question: "10. 'A' or 'An' Umbrella?", a: "A", b: "An", correct: "b" }
    ],
    "Level 2": [
        { question: "1. 'I have ___ London.'", a: "been to", b: "gone to", correct: "a" },
        { question: "2. If I ___ rich, I would buy a car.", a: "was", b: "were", correct: "b" },
        { question: "3. 'She is interested ___ music.'", a: "in", b: "on", correct: "a" },
        { question: "4. Passive: 'He wrote a book'", a: "A book was written", b: "A book is written", correct: "a" },
        { question: "5. Opposite of 'Generous'?", a: "Mean", b: "Kind", correct: "a" },
        { question: "6. 'I've been working ___ 2 hours.'", a: "for", b: "since", correct: "a" },
        { question: "7. Which is a synonym of 'Quick'?", a: "Fast", b: "Slow", correct: "a" },
        { question: "8. 'You ___ smoke here.' (Prohibition)", a: "mustn't", b: "don't have to", correct: "a" },
        { question: "9. 'Look! The bus ___.'", a: "is coming", b: "comes", correct: "a" },
        { question: "10. 'Despite ___ ill, she came.'", a: "being", b: "she was", correct: "a" }
    ],
    "Level 3": [
        { question: "1. 'Hardly ___ started when it rained.'", a: "had I", b: "I had", correct: "a" },
        { question: "2. Synonym of 'Pragmatic'?", a: "Practical", b: "Theoretical", correct: "a" },
        
        { question: "3. 'I'd rather you ___ here.'", a: "stayed", b: "stay", correct: "a" },
        { question: "4. Meaning of 'To kick the bucket'?", a: "To die", b: "To be angry", correct: "a" },
        { question: "5. 'The ___ of the meeting was...'", a: "outcome", b: "income", correct: "a" },
        { question: "6. 'She is used ___ early.'", a: "to waking up", b: "to wake up", correct: "a" },
        { question: "7. 'He is the man ___ car was stolen.'", a: "whose", b: "whom", correct: "a" },
        { question: "8. Phrasal verb?", a: "Look up", b: "Look beautiful", correct: "a" },
        { question: "9. 'It's high time we ___.'", a: "left", b: "leave", correct: "a" },
        { question: "10. 'I wish I ___ more time yesterday.'", a: "had had", b: "had", correct: "a" }
    ]
};

let quizData = [], currentQuiz = 0, score = 0, timeLeft = 300, studentName = "", studentLevel = "", timerInterval;

const quiz = document.getElementById('quiz'), regSection = document.getElementById('registration-section'), quizSection = document.getElementById('quiz-section');
const startBtn = document.getElementById('start_btn'), nameInput = document.getElementById('student_name'), levelChoice = document.getElementById('student_level_choice');
const questionEl = document.getElementById('question'), a_text = document.getElementById('a_text'), b_text = document.getElementById('b_text'), submitBtn = document.getElementById('submit'), timerDisplay = document.getElementById('timer'), answerEls = document.querySelectorAll('.answer');
const descContainer = document.getElementById('description-container'), descInput = document.getElementById('student_description'), optionsContainer = document.getElementById('options-container');

startBtn.addEventListener('click', () => {
    studentName = nameInput.value.trim();
    studentLevel = levelChoice.value; 
    if(studentName) {
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
}

function deselectAnswers() { answerEls.forEach(el => el.checked = false); }

function getSelected() {
    let answer;
    answerEls.forEach(el => { if(el.checked) answer = el.id; });
    return answer;
}

submitBtn.addEventListener('click', () => {
    if (currentQuiz < quizData.length) {
        const answer = getSelected();
        if(answer) {
            if(answer === quizData[currentQuiz].correct) score++;
            currentQuiz++;
            if(currentQuiz < quizData.length) loadQuiz();
            else {
                questionEl.innerText = "Final Step: Writing Task";
                optionsContainer.style.display = "none";
                descContainer.style.display = "block";
                submitBtn.innerText = "Finish & Send Results";
            }
        } else { alert("Please select an answer!"); }
    } else { showResults(); }
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
    const totalQuestions = quizData.length;
    const percentage = ((score / totalQuestions) * 100).toFixed(0);
    
    // Ireto "status" ireto dia mbola ilaina amin'ny Email fa tsy haseho eo amin'ny écran intsony
    let status = "";
    if (percentage >= 90) status = "TRES BIEN";
    else if (percentage >= 70) status = "BIEN";
    else if (percentage >= 50) status = "PASSABLE";
    else status = "REPEAT NEEDED";

    const writingText = descInput.value.trim();
    const p1 = "xlgo", p2 = "jjqq"; 

    // Ity "fetch" ity no mandefa ny email any aminao
    fetch("https://formspree.io/f/" + p1 + p2, {
        method: "POST",
        body: JSON.stringify({ 
            name: studentName, 
            level: studentLevel, 
            score: score + "/" + totalQuestions, 
            percent: percentage + "%", 
            mention: status, 
            writing: writingText 
        }),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    });

    // ETO NO OVAINA: Ity no hitan'ny mpianatra eo amin'ny écran
    quiz.innerHTML = `
        <div style="text-align:center; padding:40px;">
            <h2 style="color: #2c3e50;">Congratulations, ${studentName}!</h2>
            <p style="font-size: 1.2rem;">Your exam for <strong>${studentLevel}</strong> has been successfully submitted.</p>
            <p>Your results will be released after a final review by our team.</p>
            <p>An administrator will contact you shortly.</p>
            <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">Exit</button>
        </div>`;
}
