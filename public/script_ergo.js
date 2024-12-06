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

        // Ajouter la valeur de la touche cliquée au champ en minuscule
        const keyValue = key.dataset.key;
        const lowerCaseValue = keyValue.toLowerCase(); // Conversion en minuscule
        field.value += lowerCaseValue;

        // Déplacer la touche après chaque utilisation
        moveKeyRandomly(key);
    });
});

// Désactiver complètement le clavier physique
document.addEventListener('keydown', (event) => {
    event.preventDefault(); // Empêche toute action liée à une pression de touche
});

const message = document.getElementById('chaotic-message');
const validateBtn = document.getElementById('validate-btn');

let buffer = ''; // Stocke les caractères saisis avant de les afficher
let shakeCount = 0; // Compteur de "secousses" de souris

const languages = {
    en: "Please wait a moment before typing the next letter.",
    fr: "Veuillez attendre quelques instants avant de taper la lettre suivante.",
    sv: "Vänligen vänta lite innan du skriver nästa bokstav.",
    ja: "次の文字を入力する前に少しお待ちください。",
    zh: "请稍等片刻再输入下一个字母。",
    tlh: "tlhIngan Hol Dalo'meH Qapla'."
};

// Fonction pour afficher un message dans une langue aléatoire
function showRandomMessage() {
    const langKeys = Object.keys(languages);
    const randomLang = langKeys[Math.floor(Math.random() * langKeys.length)];
    message.textContent = languages[randomLang];
}

// Fonction pour rendre les caractères invisibles, puis visibles après un délai aléatoire
field.addEventListener('input', (e) => {
    const char = e.data; // Dernier caractère saisi
    buffer += char;
    field.value = ''; // Efface immédiatement le champ
    const delay = Math.random() * 2000 + 500; // Délai aléatoire entre 500 ms et 2500 ms

    setTimeout(() => {
        field.value += char; // Affiche le caractère après le délai
    }, delay);

    showRandomMessage(); // Affiche un message contextuel
});

// Secouer la souris pour afficher immédiatement le texte
let lastMouseMove = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
    const dx = Math.abs(e.clientX - lastMouseMove.x);
    const dy = Math.abs(e.clientY - lastMouseMove.y);

    if (dx > 50 || dy > 50) { // Si la souris a été secouée
        shakeCount++;
        if (shakeCount >= 3) { // Affiche tout le texte après 3 secousses
            field.value = buffer;
            shakeCount = 0;
        }
    }

    lastMouseMove = { x: e.clientX, y: e.clientY };
});

// Fonction pour rendre le bouton de validation évasif
validateBtn.addEventListener('click', () => {
    validateBtn.textContent = "Traitement...";
    validateBtn.classList.add('disabled');
    validateBtn.classList.remove('hidden');
    setTimeout(() => {
        validateBtn.textContent = "Valider";
        validateBtn.classList.remove('disabled');
        validateBtn.classList.add('hidden'); // Cache le bouton pendant un moment
        setTimeout(() => {
            validateBtn.classList.remove('hidden');
        }, 2000); // Réapparaît après 2 secondes
    }, 1000);
});

// Affiche un message contextuel initial
showRandomMessage();

// si la souris bouge épileptie
document.addEventListener('mousemove', () => {
    const keys = document.querySelectorAll('.key'); // Sélectionne toutes les touches

    keys.forEach(key => {
        // document.body.style.backgroundColor = #${randomColor};
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        key.style.backgroundColor = `#${randomColor}`;
    });
});

/*// si la souris bouge, change la couleur de fond de manière épileptique
document.addEventListener('mousemove', () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`; // Change le fond
});*/
let lastChangeTime = 0; // Stocke le moment du dernier changement
const changeInterval = 300; // Intervalle en millisecondes

document.addEventListener('mousemove', () => {
    const currentTime = Date.now();

    // Vérifie si le délai est écoulé
    if (currentTime - lastChangeTime >= changeInterval) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = `#${randomColor}`; // Change le fond

        lastChangeTime = currentTime; // Met à jour le moment du dernier changement
    }
});
//Alerte épilepsie
window.onload = function () {
     alert("Warning: This page may cause seizures due to its dynamic and unpredictable content.");
};

// Taille dynamique du champ
function getRandomSize(min, max) {
    return Math.random() * (max - min) + min;
}

function changeFieldSize() {
    const newWidth = getRandomSize(10, 500); // Largeur entre 10px et 500px
    const newHeight = getRandomSize(30, 80); // Hauteur entre 30px et 80px
    field.style.width = `${newWidth}px`;
    field.style.height = `${newHeight}px`;
}

// Change la taille toutes les 800ms
setInterval(changeFieldSize, 800);

// Les bubules
const canvas = document.createElement('canvas');
canvas.style = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = Array.from({ length: 70 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  speedX: Math.random() * 2 - 1,
  speedY: Math.random() * 2 - 1,
  size: Math.random() * 50 + 20,
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fill();
    circle.x += circle.speedX;
    circle.y += circle.speedY;
    if (circle.x < 0 || circle.x > canvas.width) circle.speedX *= -1;
    if (circle.y < 0 || circle.y > canvas.height) circle.speedY *= -1;
  });
  requestAnimationFrame(animate);
}

animate();
