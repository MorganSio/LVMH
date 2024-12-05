const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

let diver = { x: 200, y: 150, width: 20, height: 20 };
let pearls = [];
let obstacles = [];
let code = '';
let collectedCode = '';

function initGame() {
    generatePearls();
    generateObstacles();
    requestAnimationFrame(updateGame);
}

function generatePearls() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 5; i++) {
        let char = characters.charAt(Math.floor(Math.random() * characters.length));
        code += char;
        pearls.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, char });
    }
}

function generateObstacles() {
    for (let i = 0; i < 5; i++) {
        obstacles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, width: 20, height: 20 });
    }
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDiver();
    drawPearls();
    drawObstacles();
    checkCollisions();
    requestAnimationFrame(updateGame);
}

function drawDiver() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(diver.x, diver.y, diver.width, diver.height);
}

function drawPearls() {
    ctx.fillStyle = 'white';
    pearls.forEach(pearl => {
        ctx.beginPath();
        ctx.arc(pearl.x, pearl.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.fillText(pearl.char, pearl.x - 3, pearl.y + 3);
    });
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function checkCollisions() {
    pearls = pearls.filter(pearl => {
        if (diver.x < pearl.x + 10 && diver.x + diver.width > pearl.x - 10 &&
            diver.y < pearl.y + 10 && diver.y + diver.height > pearl.y - 10) {
            collectedCode += pearl.char;
            return false;
        }
        return true;
    });

    obstacles.forEach(obstacle => {
        if (diver.x < obstacle.x + obstacle.width && diver.x + diver.width > obstacle.x &&
            diver.y < obstacle.y + obstacle.height && diver.y + diver.height > obstacle.y) {
            alert('Vous avez touché un obstacle !');
            resetGame();
        }
    });

    if (pearls.length === 0) {
        const captchaInput = document.getElementById('captcha-code');
        if (captchaInput) {
            captchaInput.value = collectedCode;
        }
    }
}

function resetGame() {
    diver = { x: 200, y: 150, width: 20, height: 20 };
    pearls = [];
    obstacles = [];
    code = '';
    collectedCode = '';
    initGame();
}

function validateCaptcha() {
    const userCode = document.getElementById('captcha-code').value;
    if (userCode === collectedCode) {
        document.body.innerHTML = '<div id="success-message">Vous avez sauvé l\'océan !</div>';
    } else {
        alert('Code incorrect. Veuillez réessayer.');
    }
}

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

document.getElementById('validate-button').addEventListener('click', validateCaptcha);

initGame();