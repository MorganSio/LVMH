let currentStep = 0;
const steps = document.querySelectorAll('.step');
const correctAnswers = {
    q1: 'b',
    q2: 'c',
    q3: 'b',
    q4: 'b',
    q5: 'a',
    q6: 'c'
};
let score = 0; 

function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Score : ${score}`;
}

function nextStep() {
    steps[currentStep].classList.remove('active');
    currentStep++;
    if (currentStep < steps.length) {
        steps[currentStep].classList.add('active');
    }
}

function checkAnswers() {
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);

    for (let [name, value] of formData.entries()) {
        const question = document.querySelector(`input[name="${name}"][value="${value}"]`);
        const feedback = question.closest('.step').querySelector('.feedback');
        const correctImg = feedback.querySelector('.correct-img');
        const incorrectImg = feedback.querySelector('.incorrect-img');

        if (value === correctAnswers[name]) {
            if (!question.parentElement.classList.contains('correct')) {
                score++; 
            }
            question.parentElement.classList.add('correct');
            correctImg.style.display = 'inline';
            incorrectImg.style.display = 'none';
        } else {
            if (question.parentElement.classList.contains('correct')) {
                score--; 
            }
            question.parentElement.classList.add('incorrect');
            correctImg.style.display = 'none';
            incorrectImg.style.display = 'inline';
        }

        feedback.style.display = 'block';
    }

    updateScoreDisplay(); 
}

fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    })
    .catch(error => console.error('Erreur lors du chargement du header:', error));

    function nextStep() {
     
        steps[currentStep].classList.remove('active');
        currentStep++;
    
        if (currentStep === steps.length - 1) {
            displayScore();
        }
    
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
        }
    }
    
    // Fonction pour calculer et afficher le score
    function displayScore() {
        const form = document.getElementById('quizForm');
        const formData = new FormData(form);
        let score = 0;
    
        for (let [name, value] of formData.entries()) {
            if (value === correctAnswers[name]) {
                score++;
            }
        }
    
        document.getElementById('scoreDisplay').textContent = score;
    }
    
    // Fonction pour recommencer le quiz
    function restartQuiz() {
        currentStep = 0;
        steps.forEach(step => step.classList.remove('active'));
        steps[0].classList.add('active');
        document.getElementById('quizForm').reset();
    }