
import React, { useEffect, useRef } from 'react';

const SolarSystemBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create stars
    const stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.05 + 0.01
      });
    }
    
    // Create planets
    const planets = [
      { x: canvas.width * 0.1, y: canvas.height * 0.2, radius: 15, color: '#FFD700', speed: 0.001 },
      { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 25, color: '#5D9EEA', speed: 0.0005 },
      { x: canvas.width * 0.5, y: canvas.height * 0.9, radius: 20, color: '#FF6347', speed: 0.0008 }
    ];
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0B1026');
      gradient.addColorStop(1, '#171F45');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars
        star.y += star.speed;
        
        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Draw planets
      planets.forEach(planet => {
        // Create planet glow effect
        const glow = ctx.createRadialGradient(
          planet.x, planet.y, planet.radius * 0.5,
          planet.x, planet.y, planet.radius * 2
        );
        glow.addColorStop(0, planet.color);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw planet
        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Subtle movement for planets
        planet.x += Math.sin(Date.now() * planet.speed) * 0.5;
        planet.y += Math.cos(Date.now() * planet.speed) * 0.5;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default SolarSystemBackground;