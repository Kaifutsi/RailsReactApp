import React, { useEffect, useRef } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    const mouse = {
      x: null,
      y: null,
      radius: (canvas.height / 80) * (canvas.width / 80)
    };

    window.addEventListener('mousemove', event => {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 10;
          }
        }
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
    }

    init();
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.radius = ((canvas.height / 80) * (canvas.width / 80));
      init();
    });

    window.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

  }, []);

  return (
    <div className="homepage">
      <h1>Добро пожаловать на наш новостной сайт!</h1>
      <p>Здесь вы найдете самые интересные новости.</p>
      <Link to="/news">Перейти к списку новостей</Link>
      <Link to="/admin">Вход в админ панель</Link>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default HomePage;
