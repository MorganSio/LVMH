document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('newGameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
  
    // Charger les images
    const diverImage = new Image();
    diverImage.src = 'https://cdn.pixabay.com/photo/2013/07/12/13/58/scuba-diving-147683_960_720.png';
  
    const enemyImage = new Image();
    enemyImage.src = 'https://pixabay.com/static/uploads/photo/2012/04/12/22/02/fish-30828_640.png';
  
    const backgroundImage = new Image();
    backgroundImage.src = 'https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?cs=srgb&dl=abysses-aquatique-bleu-brouiller-932638.jpg&fm=jpg';
  
    // Variables de jeu
    let diver = {
      x: 50,
      y: canvas.height / 2,
      width: 50,
      height: 50,
      speed: 5,
      lasers: [],
      lives: 3,
      color: 'blue'
    };
  
    let enemy = {
      x: canvas.width - 150,
      y: canvas.height / 2,
      width: 100,
      height: 100,
      speed: 6, // Augmenté pour rendre le poisson plus fort
      lasers: [],
      direction: 'down',
      lives: 3,
      color: 'red'
    };
  
    let canShoot = true; // Variable pour empêcher le spam de tir
  
    function drawBackground() {
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    }
  
    function drawDiver() {
      ctx.drawImage(diverImage, diver.x, diver.y, diver.width, diver.height);
    }
  
    function drawEnemy() {
      ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
    }
  
    function drawLasers() {
      ctx.fillStyle = 'green';
      diver.lasers.forEach(laser => {
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
      });
  
      ctx.fillStyle = 'orange';
      enemy.lasers.forEach(laser => {
        ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
      });
    }
  
    function updateLasers() {
      diver.lasers = diver.lasers.filter(laser => laser.x < canvas.width);
      diver.lasers.forEach(laser => {
        laser.x += 10;
      });
  
      enemy.lasers = enemy.lasers.filter(laser => laser.x > 0);
      enemy.lasers.forEach(laser => {
        laser.x -= 10;
      });
    }
  
    function moveEnemy() {
      // Esquiver les lasers du plongeur
      let dodge = false;
      diver.lasers.forEach(laser => {
        if (laser.y < enemy.y + enemy.height && laser.y > enemy.y) {
          dodge = true;
          if (enemy.y + enemy.height / 2 < canvas.height / 2) {
            enemy.y += enemy.speed; 
          } else {
            enemy.y -= enemy.speed;
          }
        }
      });
  
      // Si l'ennemi ne doit pas esquiver, il continue son mouvement aléatoire
      if (!dodge) {
        if (Math.random() < 0.02) {
          enemy.direction = enemy.direction === 'down' ? 'up' : 'down';
        }
  
        if (enemy.direction === 'down') {
          enemy.y += enemy.speed;
          if (enemy.y + enemy.height >= canvas.height) {
            enemy.direction = 'up';
          }
        } else {
          enemy.y -= enemy.speed;
          if (enemy.y <= 0) {
            enemy.direction = 'down';
          }
        }
      } else {
        // Continue moving in the current direction while dodging
        if (enemy.direction === 'down' && enemy.y + enemy.height < canvas.height) {
          enemy.y += enemy.speed;
        } else if (enemy.direction === 'up' && enemy.y > 0) {
          enemy.y -= enemy.speed;
        } else {
          // If the enemy is at the edge, change direction
          enemy.direction = enemy.direction === 'down' ? 'up' : 'down';
        }
      }
    }
  
    function shootEnemyLaser() {
      enemy.lasers.push({
        x: enemy.x,
        y: enemy.y + enemy.height / 2,
        width: 10,
        height: 5
      });
    }
  
    function checkCollisions() {
      diver.lasers.forEach((laser, index) => {
        if (
          laser.x < enemy.x + enemy.width &&
          laser.x + laser.width > enemy.x &&
          laser.y < enemy.y + enemy.height &&
          laser.y + laser.height > enemy.y
        ) {
          diver.lasers.splice(index, 1);
          enemy.color = 'yellow';
          enemy.lives -= 1;
          document.getElementById('enemyLives').textContent = enemy.lives;
          setTimeout(() => {
            enemy.color = 'red';
          }, 1000);
  
          if (enemy.lives <= 0) {
            alert('Victoire ! Vous avez vaincu l\'ennemi.');
            resetGame();
          }
        }
      });
  
      enemy.lasers.forEach((laser, index) => {
        if (
          laser.x < diver.x + diver.width &&
          laser.x + laser.width > diver.x &&
          laser.y < diver.y + diver.height &&
          laser.y + laser.height > diver.y
        ) {
          enemy.lasers.splice(index, 1);
          diver.color = 'yellow';
          diver.lives -= 1;
          document.getElementById('lives').textContent = diver.lives;
          setTimeout(() => {
            diver.color = 'blue';
          }, 1000);
  
          if (diver.lives <= 0) {
            alert('Game Over! Vous avez perdu.');
            resetGame();
          }
        }
      });
    }
  
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawDiver();
      drawEnemy();
      drawLasers();
      updateLasers();
      moveEnemy();
      checkCollisions();
      requestAnimationFrame(update);
    }
  
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && diver.y > 0) {
        diver.y -= diver.speed;
      }
      if (e.key === 'ArrowDown' && diver.y < canvas.height - diver.height) {
        diver.y += diver.speed;
      }
      if ((e.key === 'a' || e.key === 'A') && canShoot) {
        diver.lasers.push({
          x: diver.x + diver.width,
          y: diver.y + diver.height / 2,
          width: 10,
          height: 5
        });
        canShoot = false;
        setTimeout(() => {
          canShoot = true;
        }, 500); // Délai de 500ms entre chaque tir
      }
    });
  
    function resetGame() {
      diver.lives = 3;
      diver.color = 'blue';
      diver.lasers = [];
      enemy.lives = 3;
      enemy.color = 'red';
      enemy.lasers = [];
      document.getElementById('lives').textContent = diver.lives;
      document.getElementById('enemyLives').textContent = enemy.lives;
    }
  
    setInterval(shootEnemyLaser, 500); // Augmente la fréquence de tir de l'ennemi à toutes les 500ms
  
    diverImage.onload = () => {
      enemyImage.onload = () => {
        update();
      };
    };
  });
