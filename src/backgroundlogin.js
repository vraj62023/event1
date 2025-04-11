// blackhole.js
import React, { useEffect, useRef } from 'react';

const BlackHoleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create stars
    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * (canvas.width / 2) + 100
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;
      
      // Dark space background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Center of canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw accretion disk
      const diskGradient = ctx.createRadialGradient(
        centerX, centerY, 50, 
        centerX, centerY, 300
      );
      
      diskGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      diskGradient.addColorStop(0.2, 'rgba(30, 0, 40, 0.8)');
      diskGradient.addColorStop(0.4, 'rgba(80, 20, 100, 0.6)');
      diskGradient.addColorStop(0.6, 'rgba(120, 60, 180, 0.4)');
      diskGradient.addColorStop(0.8, 'rgba(170, 90, 220, 0.2)');
      diskGradient.addColorStop(1, 'rgba(220, 120, 255, 0)');
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time / 5);
      ctx.translate(-centerX, -centerY);
      
      ctx.fillStyle = diskGradient;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 300, 100, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      
      // Draw the black hole
      const blackHoleGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 60
      );
      
      blackHoleGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      blackHoleGradient.addColorStop(0.7, 'rgba(0, 0, 0, 1)');
      blackHoleGradient.addColorStop(1, 'rgba(20, 0, 40, 0)');
      
      ctx.fillStyle = blackHoleGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw light bending effect
      ctx.save();
      ctx.translate(centerX, centerY);
      
      // Draw "gravity well" effect
      for (let r = 250; r > 60; r -= 15) {
        const opacity = (250 - r) / 190 * 0.15;
        ctx.strokeStyle = `rgba(180, 120, 250, ${opacity})`;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      ctx.restore();
      
      // Draw stars with gravity effect
      stars.forEach((star, i) => {
        // Calculate star position based on angle and distance
        const distanceToCenter = Math.sqrt(
          Math.pow(star.x - centerX, 2) + 
          Math.pow(star.y - centerY, 2)
        );
        
        // Make stars orbit around the black hole
        star.angle += 0.001 / (star.distance / 300);
        
        // Calculate new position
        star.x = centerX + Math.cos(star.angle) * star.distance;
        star.y = centerY + Math.sin(star.angle) * star.distance;
        
        // "Gravity well" effect - stars move faster when closer to black hole
        if (distanceToCenter < 300) {
          const pullFactor = 1 - (distanceToCenter / 300);
          const pullDirection = Math.atan2(centerY - star.y, centerX - star.x);
          
          star.x += Math.cos(pullDirection) * pullFactor * 2;
          star.y += Math.sin(pullDirection) * pullFactor * 2;
          
          // Make stars disappear when too close to black hole
          if (distanceToCenter < 70) {
            star.brightness = (distanceToCenter - 30) / 40;
            if (star.brightness < 0) star.brightness = 0;
          }
        }
        
        // Draw the star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset stars that go behind the black hole
        if (star.brightness <= 0) {
          stars[i] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            brightness: Math.random() * 0.5 + 0.5,
            angle: Math.random() * Math.PI * 2,
            distance: Math.random() * (canvas.width / 2) + 300
          };
        }
      });
      
      // Draw occasional energy bursts from black hole
      if (Math.random() < 0.02) {
        const burstAngle = Math.random() * Math.PI * 2;
        const burstLength = Math.random() * 100 + 100;
        
        const gradient = ctx.createLinearGradient(
          centerX, centerY,
          centerX + Math.cos(burstAngle) * burstLength,
          centerY + Math.sin(burstAngle) * burstLength
        );
        
        gradient.addColorStop(0, 'rgba(200, 100, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(200, 100, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.random() * 5 + 2;
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(burstAngle) * 60,
          centerY + Math.sin(burstAngle) * 60
        );
        ctx.lineTo(
          centerX + Math.cos(burstAngle) * burstLength,
          centerY + Math.sin(burstAngle) * burstLength
        );
        ctx.stroke();
      }
      
      // Occasional distant galaxies
      if (Math.random() < 0.001) {
        const galaxyX = Math.random() * canvas.width;
        const galaxyY = Math.random() * canvas.height;
        const galaxySize = Math.random() * 30 + 20;
        
        const galaxyGradient = ctx.createRadialGradient(
          galaxyX, galaxyY, 0,
          galaxyX, galaxyY, galaxySize
        );
        
        galaxyGradient.addColorStop(0, 'rgba(180, 100, 220, 0.3)');
        galaxyGradient.addColorStop(1, 'rgba(180, 100, 220, 0)');
        
        ctx.fillStyle = galaxyGradient;
        ctx.beginPath();
        ctx.ellipse(
          galaxyX, galaxyY, 
          galaxySize, galaxySize / 3, 
          Math.random() * Math.PI, 
          0, Math.PI * 2
        );
        ctx.fill();
      }
      
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

export default BlackHoleBackground;