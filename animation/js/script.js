const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.querySelector('#startBtn')
const stopBtn = document.querySelector('#stopBtn')
const resetBtn = document.querySelector('#resetBtn')

let position = canvas.width / 2;
let direction = 1;
let isAnimating = false;
let animationId = null;

const img = new Image();
img.src = "./img/Mushroom.png";

const squareSize = 50;

// Отрисовка локации и круга (заменить)
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Круг
    ctx.beginPath();
    ctx.drawImage(img, position - 50 / 2, (canvas.height / 2) - 50 / 2, 50, 50);
    ctx.fillStyle = '#764ba2';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
};

const newDraw = () => {
    ctx.beginPath();
    ctx.drawImage(img, position - 50 / 2, (canvas.height / 2) - 50 / 2, 50, 50);
    ctx.fillStyle = '#764ba2';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = '#ddd';
    ctx.stroke();
}

// Обновление анимации
const update = () => {
    position += 5 * direction;
    if (position + 25 > canvas.width) {
        position = canvas.width - 25;
        direction = -1;
    } else if (position < 25) {
        position = 25;
        direction = 1;
    }
};

// Проигрывание анимации
const animate = () => {
    if (!isAnimating) return;

    update();
    draw();

    animationId = requestAnimationFrame(animate);
};

// Кнопка начала анимации
const startAnimation = () => {
    if (!isAnimating) {
        isAnimating = true;
        animate();
    }
};

// Кнопка остановки анимации
const stopAnimation = () => {
    if (isAnimating) {
        isAnimating = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
};

// Кнопка, выполняющая сброс
const resetAnimation = () => {
    if (!isAnimating) {
        direction = 1;
        position = canvas.width / 2;
        newDraw();
        resetAnimation.removeEventListener('click', draw());
    }
    else {
        stopAnimation();
        direction = -1;
        position = canvas.width / 2;
        newDraw();
        resetAnimation.removeEventListener('click', draw());
    }
}

startBtn.addEventListener('click', startAnimation)
stopBtn.addEventListener('click', stopAnimation)
resetBtn.addEventListener('click', resetAnimation)