import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

export default function AnimatedSVG() {
    useEffect(() => {
        anime({
            targets: ['#displacementFilter feTurbulence', '#displacementFilter feDisplacementMap'],
            baseFrequency: 0.05,
            scale: 15,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 2000
        });

        anime({
            targets: 'polygon',
            points: [
                { value: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96' },
                { value: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100' }
            ],
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
            duration: 2000
        });
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <svg
                width="128"
                height="128"
                viewBox="0 0 128 128"
                className="text-orange-500"
            >
                <filter id="displacementFilter">
                    <feTurbulence
                        type="turbulence"
                        numOctaves="2"
                        baseFrequency="0"
                        result="turbulence"
                    />
                    <feDisplacementMap
                        in2="turbulence"
                        in="SourceGraphic"
                        scale="1"
                        xChannelSelector="R"
                        yChannelSelector="G"
                    />
                </filter>
                <polygon
                    points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"
                    fill="currentColor"
                    filter="url(#displacementFilter)"
                />
            </svg>
        </div>
    );
}
