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
