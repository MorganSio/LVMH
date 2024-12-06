document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 600;

  // Variables de jeu
  let diver = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5,
    oxygen: 1000,
    points: 0,
    direction: 'right'
  };

  let pollutants = [];
  let year = 2000;
  let totalPollutants = 0;
  const debrisElements = ['debrisArmLeft', 'debrisArmRight', 'debrisLegLeft', 'debrisLegRight', 'debrisHead', 'debrisHeart'];
  let isCtrlPressed = false;

  // Charger les images
  const backgroundImage = new Image();
  backgroundImage.src = 'https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?cs=srgb&dl=abysses-aquatique-bleu-brouiller-932638.jpg&fm=jpg';
  const diverImage = new Image();
  diverImage.src = 'https://cdn.pixabay.com/photo/2013/07/12/13/58/scuba-diving-147683_960_720.png';
  const plasticImage = new Image();
  plasticImage.src = 'https://cdn.pixabay.com/photo/2018/04/18/16/03/plastic-3330759_640.png';
  const metalImage = new Image();
  metalImage.src = 'https://cdn.pixabay.com/photo/2018/04/16/09/12/trash-3323974_960_720.png';

  // Fonction pour générer des polluants de manière aléatoire
  function generatePollutants() {
    pollutants = [];
    totalPollutants = (year - 1999) * 10;
    for (let i = 0; i < totalPollutants; i++) {
      let x = Math.random() * (canvas.width - 20);
      let y = Math.random() * (canvas.height - 20);
      let type = ['plastic', 'metal'][Math.floor(Math.random() * 2)];
      pollutants.push({ x, y, width: 20, height: 20, type });
    }
  }

  // Fonction de dessin du plongeur
  function drawDiver() {
    ctx.save();
    if (diver.direction === 'left') {
      ctx.scale(-1, 1);
      ctx.drawImage(diverImage, -diver.x - diver.width, diver.y, diver.width, diver.height);
    } else {
      ctx.drawImage(diverImage, diver.x, diver.y, diver.width, diver.height);
    }
    ctx.restore();
  }

  // Fonction de dessin des polluants
  function drawPollutants() {
    pollutants.forEach(pollutant => {
      if (pollutant.type === 'plastic') {
        ctx.drawImage(plasticImage, pollutant.x, pollutant.y, pollutant.width, pollutant.height);
      } else if (pollutant.type === 'metal') {
        ctx.drawImage(metalImage, pollutant.x, pollutant.y, pollutant.width, pollutant.height);
      }
    });
  }

  // Fonction de mise à jour du jeu
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    drawDiver();
    drawPollutants();
    updateInfoPanel();
    checkCollisions();
    requestAnimationFrame(update);
  }

  // Mise à jour du panneau d'information
  function updateInfoPanel() {
    document.getElementById('oxygen').textContent = diver.oxygen;
    document.getElementById('points').textContent = diver.points;
    document.getElementById('level').textContent = year;
  }

  // Contrôles du plongeur
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Control') {
      isCtrlPressed = true;
    }
    let speed = isCtrlPressed ? diver.speed * 2 : diver.speed;
    let oxygenConsumption = isCtrlPressed ? 2 : 1;

    if (e.key === 'ArrowUp' && diver.y > 0) {
      diver.y -= speed;
      diver.oxygen -= oxygenConsumption;
    }
    if (e.key === 'ArrowDown' && diver.y < canvas.height - diver.height) {
      diver.y += speed;
      diver.oxygen -= oxygenConsumption;
    }
    if (e.key === 'ArrowLeft' && diver.x > 0) {
      diver.x -= speed;
      diver.oxygen -= oxygenConsumption;
      diver.direction = 'left';
    }
    if (e.key === 'ArrowRight' && diver.x < canvas.width - diver.width) {
      diver.x += speed;
      diver.oxygen -= oxygenConsumption;
      diver.direction = 'right';
    }

    // Vérifier si l'oxygène est épuisé
    if (diver.oxygen <= 0) {
      alert("Game Over! Vous avez manqué d'oxygène.");
      resetGame();
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
      isCtrlPressed = false;
    }
  });

  // Vérifier les collisions entre le plongeur et les polluants
  function checkCollisions() {
    pollutants = pollutants.filter(pollutant => {
      if (
        diver.x < pollutant.x + pollutant.width &&
        diver.x + diver.width > pollutant.x &&
        diver.y < pollutant.y + pollutant.height &&
        diver.y + diver.height > pollutant.y
      ) {
        // Collision détectée, ramasser le polluant et gagner des points et de l'oxygène
        diver.points += 1;
        diver.oxygen += 20; // Gagner de l'oxygène en ramassant un déchet
        return false;
      }
      return true;
    });

    // Passer à l'année suivante si tous les polluants sont ramassés
    if (pollutants.length === 0) {
      year++;
      alert(`1 an plus tard, nous sommes en ${year} !`);
      resetLevel();
      removeDebris();
    }
  }

  // Fonction de mise à jour de l'overlay des déchets
  function removeDebris() {
    if (year - 2000 < debrisElements.length) {
      const debrisToRemove = document.getElementById(debrisElements[year - 2000]);
      if (debrisToRemove) {
        debrisToRemove.style.display = 'none';
      }
    }
  }

  // Réinitialiser le niveau
  function resetLevel() {
    diver.x = canvas.width / 2;
    diver.y = canvas.height / 2;
    generatePollutants();
  }

  // Réinitialiser le jeu
  function resetGame() {
    year = 2000;
    diver.x = canvas.width / 2;
    diver.y = canvas.height / 2;
    diver.oxygen = 100;
    diver.points = 0;
    generatePollutants();
    debrisElements.forEach(id => {
      const debris = document.getElementById(id);
      if (debris) {
        debris.style.display = 'block';
      }
    });
  }

  // Générer les polluants au démarrage du jeu
  generatePollutants();

  // Démarrer le jeu une fois les images chargées
  backgroundImage.onload = () => {
    update();
  };
  diverImage.onload = () => {
    update();
  };
  plasticImage.onload = () => {
    update();
  };
  metalImage.onload = () => {
    update();
  };

  // Konami Code
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiCodePosition = 0;

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiCodePosition]) {
      konamiCodePosition++;
      if (konamiCodePosition === konamiCode.length) {
        window.location.href = 'nouveau-jeu.html';
      }
    } else {
      konamiCodePosition = 0;
    }
  });
});