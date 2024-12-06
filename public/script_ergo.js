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
    const randomX = Math.random() * 200 - 10; 
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
        }, 1000); 
    }
    lastClickTime = currentTime;
}

// Ajouter les événements pour les touches virtuelles
keys.forEach(key => {
    key.addEventListener('mouseover', () => {
        moveKeyRandomly(key); 
    });

    key.addEventListener('click', () => {
        checkClickSpeed(); 

        const keyValue = key.dataset.key;
        const lowerCaseValue = keyValue.toLowerCase(); 
        field.value += lowerCaseValue;

        moveKeyRandomly(key);
    });
});

// Désactiver complètement le clavier physique
document.addEventListener('keydown', (event) => {
    event.preventDefault(); 
});

const message = document.getElementById('chaotic-message');
const validateBtn = document.getElementById('validate-btn');

let buffer = ''; 
let shakeCount = 0; 

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
    const char = e.data; 
    buffer += char;
    field.value = ''; 
    const delay = Math.random() * 2000 + 500; 

    setTimeout(() => {
        field.value += char; 
    }, delay);

    showRandomMessage(); 
});

// Secouer la souris pour afficher immédiatement le texte
let lastMouseMove = { x: 0, y: 0 };
document.addEventListener('mousemove', (e) => {
    const dx = Math.abs(e.clientX - lastMouseMove.x);
    const dy = Math.abs(e.clientY - lastMouseMove.y);

    if (dx > 50 || dy > 50) { 
        shakeCount++;
        if (shakeCount >= 3) { 
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
        validateBtn.classList.add('hidden'); 
        setTimeout(() => {
            validateBtn.classList.remove('hidden');
        }, 2000); 
    }, 1000);
});

// Affiche un message contextuel initial
showRandomMessage();

// si la souris bouge épileptie
document.addEventListener('mousemove', () => {
    const keys = document.querySelectorAll('.key'); 

    keys.forEach(key => {
        // document.body.style.backgroundColor = #${randomColor};
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        key.style.backgroundColor = `#${randomColor}`;
    });
});

// si la souris bouge, change la couleur de fond de manière épileptique
document.addEventListener('mousemove', () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`; // Change le fond
});
let lastChangeTime = 0; 
const changeInterval = 300; // Intervalle en millisecondes

document.addEventListener('mousemove', () => {
    const currentTime = Date.now();

    // Vérifie si le délai est écoulé
    if (currentTime - lastChangeTime >= changeInterval) {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        document.body.style.backgroundColor = `#${randomColor}`; 

        lastChangeTime = currentTime; 
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
    const newWidth = getRandomSize(10, 500); 
    const newHeight = getRandomSize(30, 80); 
    field.style.width = `${newWidth}px`;
    field.style.height = `${newHeight}px`;
}

// Change la taille toutes les 800ms
setInterval(changeFieldSize, 800);

