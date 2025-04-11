import { useEffect } from 'react';

const AlienFlyer = () => {
  useEffect(() => {
    const alien = document.getElementById('alien');

    const moveAlien = () => {
        const alien = document.getElementById('alien');
        const alienSize = 100;
      
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
      
        // Get random coordinates where the alien can fully fit
        const margin = 20;
        const randX = Math.random() * (screenW - alienSize - margin * 2) + margin;
        const randY = Math.random() * (screenH - alienSize - margin * 2) + margin;
    
        const rotate = Math.random() * 180;
        const opacity =Math.random();
      
        if (alien) {
          alien.style.transform = `translate(${randX}px, ${randY}px) rotate(${rotate}deg)`;
          alien.style.opacity = opacity;
        }
      };

    const interval = setInterval(moveAlien, 3000);
    moveAlien();

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default AlienFlyer;
