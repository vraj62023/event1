import React, { useEffect } from 'react';
import './StarBackground.css';

const StarBackground = () => {
    useEffect(() => {
        const container = document.querySelector('.starry-background');
        if (!container) return;

        // Create regular stars
        const createStars = () => {
            const starCount = 300; // Increased star count
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';

                const size = Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 2}s`;

                // Add occasional colored stars
                if (Math.random() > 0.9) {
                    star.style.backgroundColor = `hsl(${Math.random() * 60 + 200}, 100%, 80%)`;
                }

                container.appendChild(star);
            }
        };

        //constellations
        const createConstellations = () => {
            const constellations = {
                orion: [
                    { x: 20, y: 30 }, { x: 25, y: 35 }, { x: 30, y: 30 }, // Belt
                    { x: 25, y: 25 }, { x: 25, y: 40 } // Body
                ],
                ursaMajor: [
                    { x: 70, y: 20 }, { x: 75, y: 25 }, { x: 80, y: 20 },
                    { x: 85, y: 25 }, { x: 90, y: 20 }, { x: 85, y: 15 }
                ],
                lyra: [
                    { x: 60, y: 60 }, { x: 63, y: 63 }, { x: 66, y: 60 },
                    { x: 63, y: 57 }, { x: 60, y: 60 } // Diamond shape
                ]
            };

            Object.values(constellations).forEach(constellation => {
                constellation.forEach((star, index) => {
                    const constellationStar = document.createElement('div');
                    constellationStar.className = 'constellation-star';

                    // Larger, brighter stars for constellations
                    const size = 4 + Math.random() * 2;
                    constellationStar.style.width = `${size}px`;
                    constellationStar.style.height = `${size}px`;
                    constellationStar.style.left = `${star.x}%`;
                    constellationStar.style.top = `${star.y}%`;

                    constellationStar.style.animation = `constellation-pulse ${3 + Math.random() * 2}s infinite`;

                    container.appendChild(constellationStar);
                });
            });
        };

        //shooting stars        
        const createShootingStar = () => {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';

            const startX = Math.random() * 100;
            shootingStar.style.left = `${startX}%`;
            shootingStar.style.top = '0%';

            // Random width and color
            const width = 50 + Math.random() * 100;
            shootingStar.style.width = `${width}px`;


            // Add curve to path
            const curve = Math.random() * 20 + 200;

            // Add to DOM first to get proper dimensions
            container.appendChild(shootingStar);

            // Animate falling down
            shootingStar.style.animation = `shooting-star-fall 2s linear`;
            shootingStar.style.setProperty('--curve', `${curve}px`);

            // Create impact effect at bottom
            setTimeout(() => {
                const impact = document.createElement('div');
                impact.className = 'shooting-star-impact';
                impact.style.left = `calc(${startX}% + ${width / 2}px)`;
                impact.style.top = '100%';
                container.appendChild(impact);

                // Remove elements after animation
                setTimeout(() => {
                    shootingStar.remove();
                    impact.remove();
                }, 1000);
            }, 2000);
        };

        createStars();
        createConstellations();

        // Shooting star every 3-6 seconds
        const shootingStarInterval = setInterval(() => {
            if (Math.random() > 0.3) { // 70% chance to create
                createShootingStar();
            }
        }, 3000);

        return () => clearInterval(shootingStarInterval);
    }, []);

    return <div className="starry-background"></div>;
};

export default StarBackground;