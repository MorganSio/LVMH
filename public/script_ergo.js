const field = document.getElementById('chaotic-field');

// Déplacer le champ quand la souris passe dessus
field.addEventListener('mouseover', () => {
    const container = document.getElementById('chaotic-field-container');
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);
    container.style.position = 'absolute';
    container.style.left = `${randomX}px`;
    container.style.top = `${randomY}px`;
});

// Restreindre les saisies aux chiffres seulement
field.addEventListener('keydown', (e) => {
    if (
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'ArrowLeft' &&
        e.key !== 'ArrowRight' &&
        isNaN(e.key)
    ) {
        e.preventDefault();
    }
});

const keys = document.querySelectorAll('.key');
const errorMessage = document.getElementById('error-message');
let lastClickTime = 0;
const clickThreshold = 300; // Temps entre les clics (en millisecondes)

// Fonction pour déplacer une touche de manière aléatoire
function moveKeyRandomly(key) {
    const randomX = Math.random() * 200 - 10; // Mouvement aléatoire entre -10px et 10px
    const randomY = Math.random() * 200 - 10;
    key.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Fonction pour vérifier si le clic est trop rapide
function checkClickSpeed() {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < clickThreshold) {
        errorMessage.style.visibility = 'visible';
        setTimeout(() => {
            errorMessage.style.visibility = 'hidden';
        }, 1000); // Message d'erreur visible pendant 1 seconde
    }
    lastClickTime = currentTime;
}

// Ajouter les événements pour les touches virtuelles
keys.forEach(key => {
    key.addEventListener('mouseover', () => {
        moveKeyRandomly(key); // Déplacer la touche lorsqu'on la survole
    });

    key.addEventListener('click', () => {
        checkClickSpeed(); // Vérifier la vitesse du clic

        // Ajouter la valeur de la touche cliquée au champ
        const keyValue = key.dataset.key;
        field.value += keyValue;

        // Déplacer la touche après chaque utilisation
        moveKeyRandomly(key);
    });
});

// Désactiver complètement le clavier physique
document.addEventListener('keydown', (event) => {
    event.preventDefault(); // Empêche toute action liée à une pression de touche
});