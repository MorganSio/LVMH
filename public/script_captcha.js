const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

let diver = { x: 200, y: 150, width: 20, height: 50 };
let pearls = [];
let obstacles = [];
let code = '';
let collectedCode = '';

// Initialisation du jeu
function initGame() {
    generatePearls();
    generateObstacles();
    requestAnimationFrame(updateGame);
}

// Générer les bulles
function generatePearls() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 8; i++) {
        let char = characters.charAt(Math.floor(Math.random() * characters.length));
        code += char;
        pearls.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, char });
    }
}

// Générer les obstacles
function generateObstacles() {
    for (let i = 0; i < 8; i++) {
        obstacles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: 20,
            height: 20,
        });
    }
}

// Mettre à jour l'affichage du jeu
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDiver();
    drawPearls();
    drawObstacles();
    checkCollisions();
    requestAnimationFrame(updateGame);
}

// Dessiner le plongeur
function drawDiver() {
    // Corps du plongeur
    ctx.fillStyle = '#1E90FF'; // Bleu océan
    ctx.fillRect(diver.x, diver.y, diver.width, diver.height);

    // Tête du plongeur
    ctx.beginPath();
    ctx.arc(diver.x + diver.width / 2, diver.y - 10, 10, 0, Math.PI * 2); // Tête ronde
    ctx.fillStyle = '#FFD700'; // Jaune pour le casque
    ctx.fill();

    // Masque
    ctx.fillStyle = '#000000'; // Masque noir
    ctx.fillRect(diver.x + diver.width / 4, diver.y - 14, diver.width / 2, 6);

    // Bras gauche
    ctx.beginPath();
    ctx.moveTo(diver.x, diver.y + 10);
    ctx.lineTo(diver.x - 15, diver.y + 25);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1E90FF';
    ctx.stroke();

    // Bras droit
    ctx.beginPath();
    ctx.moveTo(diver.x + diver.width, diver.y + 10);
    ctx.lineTo(diver.x + diver.width + 15, diver.y + 25);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1E90FF';
    ctx.stroke();

    // Palmes
    ctx.fillStyle = '#8B0000'; // Rouge sombre pour les palmes
    ctx.fillRect(diver.x - 5, diver.y + diver.height, 10, 10);
    ctx.fillRect(diver.x + diver.width - 5, diver.y + diver.height, 10, 10);
}

// Dessiner les bulles
function drawPearls() {
    pearls.forEach(pearl => {
        ctx.fillStyle = '#1E90FF'; // Couleur bleue
        ctx.beginPath();
        ctx.arc(pearl.x, pearl.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Dessiner les obstacles
function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Vérifier les collisions
function checkCollisions() {
    pearls = pearls.filter(pearl => {
        if (
            diver.x < pearl.x + 10 &&
            diver.x + diver.width > pearl.x - 10 &&
            diver.y < pearl.y + 10 &&
            diver.y + diver.height > pearl.y - 10
        ) {
            collectedCode += pearl.char; // Conserve le code en arrière-plan
            return false; // Retire la bulle collectée
        }
        return true;
    });

    obstacles.forEach(obstacle => {
        if (
            diver.x < obstacle.x + obstacle.width &&
            diver.x + diver.width > obstacle.x &&
            diver.y < obstacle.y + obstacle.height &&
            diver.y + diver.height > obstacle.y
        ) {
            alert('Vous avez touché un obstacle !');
            resetGame();
        }
    });

    // Fin de la collecte
    if (pearls.length === 0) {
        document.getElementById('captcha-code').value = collectedCode;
    }
}

// Réinitialiser le jeu
function resetGame() {
    diver = { x: 200, y: 150, width: 20, height: 50 };
    pearls = [];
    obstacles = [];
    code = '';
    collectedCode = '';
    initGame();
}

// Validation du CAPTCHA
function validateCaptcha() {
    const userCode = document.getElementById('captcha-code').value;
    if (userCode === collectedCode) {
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        startFireworks();
    } else {
        alert('Code incorrect. Veuillez réessayer.');
    }
}

// Gestion des touches pour déplacer le plongeur
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            diver.y -= 10;
            break;
        case 'ArrowDown':
            diver.y += 10;
            break;
        case 'ArrowLeft':
            diver.x -= 10;
            break;
        case 'ArrowRight':
            diver.x += 10;
            break;
    }
});

// Validation du CAPTCHA au clic
document.getElementById('validate-button').addEventListener('click', validateCaptcha);

// Lancer les feux d'artifice
function startFireworks() {
    const fireworksCanvas = document.getElementById('fireworksCanvas');
    const fireworksCtx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = 300;

    const bubbles = Array.from({ length: 70 }, () => ({
        x: Math.random() * fireworksCanvas.width,
        y: fireworksCanvas.height,
        speedY: Math.random() * 2 + 1,
        size: Math.random() * 10 + 5,
    }));

    function animateBubbles() {
        fireworksCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        bubbles.forEach((bubble, index) => {
            bubble.y -= bubble.speedY;
            if (bubble.y + bubble.size < 0) {
                bubbles[index] = {
                    x: Math.random() * fireworksCanvas.width,
                    y: fireworksCanvas.height,
                    speedY: Math.random() * 2 + 1,
                    size: Math.random() * 10 + 5,
                };
            }
            drawBubble(bubble);
        });
        requestAnimationFrame(animateBubbles);
    }

    function drawBubble(bubble) {
        fireworksCtx.beginPath();
        fireworksCtx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        fireworksCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        fireworksCtx.fill();
        fireworksCtx.closePath();
    }

    animateBubbles();
}

initGame();
