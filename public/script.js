let currentStep = 0;
const steps = document.querySelectorAll('.step');
const correctAnswers = {
    q1: 'b',
    q2: 'c',
    q3: 'b',
    q4: 'b',
    q5: 'a',
    q6: 'c'
    // Ajoutez les autres réponses correctes ici
};




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
let score = 0;

for (let [name, value] of formData.entries()) {
    const question = document.querySelector(`input[name="${name}"][value="${value}"]`);
    const feedback = question.closest('.step').querySelector('.feedback');
    const correctImg = feedback.querySelector('.correct-img');
    const incorrectImg = feedback.querySelector('.incorrect-img');
    

    if (value === correctAnswers[name]) {
        question.parentElement.classList.add('correct');
        correctImg.style.display = 'inline';
        incorrectImg.style.display = 'none';
        score++;
    } else {
        question.parentElement.classList.add('incorrect');
        correctImg.style.display = 'none';
        incorrectImg.style.display = 'inline';
    }

    feedback.style.display = 'block';
}

alert(`Vous avez obtenu ${score} sur ${Object.keys(correctAnswers).length}`);
}

// Charger le fichier header.html et l'insérer dans la page
fetch('header.html')
.then(response => response.text())
.then(data => {
  document.getElementById('header').innerHTML = data;
})
.catch(error => console.error('Erreur lors du chargement du header:', error));