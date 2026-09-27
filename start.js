const fan = document.getElementById('fan');
const fanWrapper = document.getElementById('fan-wrapper');

const numberOfCanvases = 12;
const radius = 450;
const anglePerCanvas = 360 / numberOfCanvases;

const images = [
  '/images/3dtests4.webp',
  '/images/3dbook14.webp',
  '/images/materia9.webp',
  '/images/mohawk2.webp',
  '/images/reversible.webp',
  '/images/printjob21.webp',
  '/images/textile2.webp',
  '/images/axelent0.webp',
  '/images/cd9.webp',
  '/images/blade8.webp',
  '/images/imd7.webp',
  '/images/nitro8.webp'
];

// Create canvases
for (let i = 0; i < numberOfCanvases; i++) {
    const angleDeg = anglePerCanvas * i;
    const angleRad = angleDeg * (Math.PI / 180);
  
    const x = radius * Math.sin(angleRad);
    const z = radius * Math.cos(angleRad);
  
    const canvas = document.createElement('div');
    canvas.classList.add('canvas');
  
    canvas.style.backgroundImage = `url(${images[i]})`;
    canvas.style.backgroundSize = 'cover';
    canvas.style.backgroundPosition = 'center';
  
    canvas.style.transform = `
      translateX(${x}px)
      translateZ(${z}px)
      rotateY(${angleDeg}deg)
      rotateY(90deg)
    `;
  
    canvas.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  
    fan.appendChild(canvas);
  }
  
  // Rotation values
  let autoRotateY = 0;
  let mouseRotateX = 0;
  let mouseOffsetY = 0;
  
  // Handle mouse movement
  window.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
  
    const offsetX = (e.clientX - centerX) / centerX;
    const offsetY = (e.clientY - centerY) / centerY;
  
    mouseRotateX = offsetY * 20;
    mouseOffsetY = offsetX * 200;
  });
  
  // Animate
  function animate() {
    autoRotateY += 0.1; // speed of auto-rotation
  
    fanWrapper.style.transform = `
      rotateX(${mouseRotateX}deg)
      rotateY(${autoRotateY + mouseOffsetY}deg)
    `;
  
    requestAnimationFrame(animate);
  }
  
  animate();


