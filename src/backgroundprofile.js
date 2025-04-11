// wormhole.js
import React, { useEffect, useRef } from 'react';

const WormholeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    

    const stars = [];
    const numStars = 500;
    
    for (let i = 0; i < numStars; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.8 + 0.1; // Distance from center (0.1 to 0.9)
      
      stars.push({
        angle,
        radius,
        x: 0,
        y: 0,
        z: Math.random() * 2 - 1, 
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.005 + 0.002,
        color: `hsl(${Math.random() * 60 + 220}, 80%, 70%)` 
      });
    }
    
    // Generate  rings
    const rings = [];
    const numRings = 12;
    
    for (let i = 0; i < numRings; i++) {
      rings.push({
        z: i / numRings * 2 - 1, // -1 to 1
        radius: 0.3 + (i / numRings) * 0.6, // Smaller radius for rings deeper into the wormhole
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.001 + 0.0005) * (Math.random() > 0.5 ? 1 : -1),
        color: `hsl(${260 + i * 5}, 70%, ${40 + i * 3}%)`
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const minDimension = Math.min(canvas.width, canvas.height);
      
      // Draw space background
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, canvas.width
      );
      bgGradient.addColorStop(0, '#000000');
      bgGradient.addColorStop(0.3, '#07072a');
      bgGradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw rings
      rings.forEach(ring => {
        ring.rotation += ring.rotationSpeed;
        
        // Ring pulsation effect
        const pulseFactor = Math.sin(time * 0.5) * 0.05 + 1;
        const displayRadius = ring.radius * pulseFactor;
        
        // Map z from -1,1 to determine ring visual effect
        const z = (ring.z + 1) / 2; // 0 to 1
        
        // Dynamic perspective calculation
        const perspectiveScale = 1 - z * 0.3;
        const visualRadius = displayRadius * minDimension * perspectiveScale * 0.45;
        
        // Draw the ring
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ring.rotation);
        
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 3 * perspectiveScale;
        ctx.globalAlpha = 0.7 - z * 0.3;
        
        // Make rings appear more like an ellipse from perspective
        ctx.beginPath();
        ctx.ellipse(0, 0, visualRadius, visualRadius * 0.6, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Add some visual noise/distortion to the rings
        for (let i = 0; i < 6; i++) {
          const noiseAngle = Math.PI * 2 * (i / 6);
          const noiseRadius = visualRadius + Math.sin(time * 3 + i) * 5;
          
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(
            Math.cos(noiseAngle) * noiseRadius,
            Math.sin(noiseAngle) * noiseRadius * 0.6
          );
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * perspectiveScale})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        ctx.restore();
      });
      
      // Update and draw stars
      stars.forEach(star => {
        // Update z position - move toward viewer
        star.z += star.speed;
        
        // Reset stars that pass through the screen
        if (star.z > 1) {
          star.z = -1;
          star.angle = Math.random() * Math.PI * 2;
          star.radius = Math.random() * 0.8 + 0.1;
        }
        
        // Map z from -1,1 to determine star position and size
        const depth = (star.z + 1) / 2; // 0 to 1
        
        // Calculate screen position
        const perspective = depth * 3 + 0.2;
        const distance = star.radius * minDimension * 0.45;
        
        star.x = centerX + Math.cos(star.angle) * distance * perspective;
        star.y = centerY + Math.sin(star.angle) * distance * 0.6 * perspective;
        
        // Star size increases as it comes toward viewer
        const starSize = star.size * (depth * 2 + 0.5);
        
        // Star only visible when in front 
        if (star.z > -0.5) {
          // Trail effect for stars
          if (depth > 0.5) {
            const trailLength = depth * 20;
            
            const gradient = ctx.createLinearGradient(
              star.x - Math.cos(star.angle) * trailLength,
              star.y - Math.sin(star.angle) * trailLength,
              star.x,
              star.y
            );
            
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(1, star.color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = starSize / 2;
            ctx.beginPath();
            ctx.moveTo(
              star.x - Math.cos(star.angle) * trailLength,
              star.y - Math.sin(star.angle) * trailLength
            );
            ctx.lineTo(star.x, star.y);
            ctx.stroke();
          }
          
          // Draw the star
          ctx.fillStyle = star.color;
          ctx.globalAlpha = depth;
          ctx.beginPath();
          ctx.arc(star.x, star.y, starSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // Draw center  glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, minDimension * 0.2
      );
      
      glowGradient.addColorStop(0, 'rgba(120, 50, 255, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(50, 100, 200, 0.1)');
      glowGradient.addColorStop(1, 'rgba(50, 100, 200, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.globalAlpha = 0.7 + Math.sin(time) * 0.3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, minDimension * 0.2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw energy waves emanating from the center occasionally
      if (Math.random() < 0.05) {
        const waveRadius = Math.random() * minDimension * 0.3;
        const waveGradient = ctx.createRadialGradient(
          centerX, centerY, waveRadius * 0.8,
          centerX, centerY, waveRadius
        );
        
        waveGradient.addColorStop(0, 'rgba(150, 100, 255, 0)');
        waveGradient.addColorStop(1, 'rgba(150, 100, 255, 0.2)');
        
        ctx.fillStyle = waveGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw lens flare effect
      if (Math.random() < 0.01) {
        const flareX = centerX + (Math.random() - 0.5) * 100;
        const flareY = centerY + (Math.random() - 0.5) * 60;
        const flareSize = Math.random() * 50 + 30;
        
        const flareGradient = ctx.createRadialGradient(
          flareX, flareY, 0,
          flareX, flareY, flareSize
        );
        
        flareGradient.addColorStop(0, 'rgba(200, 200, 255, 0.4)');
        flareGradient.addColorStop(1, 'rgba(200, 200, 255, 0)');
        
        ctx.fillStyle = flareGradient;
        ctx.beginPath();
        ctx.arc(flareX, flareY, flareSize, 0, Math.PI * 2);
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

export default WormholeBackground;