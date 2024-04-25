"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "~/lib/gsap";
import usePrefersReducedMotion from "~/hooks/use-prefers-reduced-motion";

export default function PulseGrid() {
    const svgRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    const grid = [14, 30] as const;

    useGSAP(
        () => {
            if (prefersReducedMotion) {
                gsap.set(".pulse-grid-item", { opacity: 0.3, scale: 1 });
                gsap.set(svgRef.current, { opacity: 1 });
                return;
            }

            gsap.set(".pulse-grid-item", {
                opacity: 0,
                transformOrigin: "center",
                color: "#fff",
            });
            gsap.set(svgRef.current, { opacity: 1 });

            const t1 = gsap.timeline();

            // Enter animation
            t1.to(".pulse-grid-item", {
                keyframes: [
                    { opacity: 0, duration: 0 },
                    {
                        opacity: 0.25,
                        rotate: "+=180",
                        color: "#FFC400",
                        scale: 2.4,
                        duration: 0.6,
                        stagger: {
                            amount: 1.8,
                            grid: grid,
                            from: "center",
                        },
                    },
                    {
                        opacity: 0.3,
                        rotate: "+=180",
                        scale: 1,
                        color: "#fff",
                        delay: -1.8,
                        duration: 0.6,
                        stagger: {
                            amount: 2,
                            grid: grid,
                            from: "center",
                        },
                    },
                ],
            });

            // Loop animation
            t1.to(".pulse-grid-item", {
                keyframes: [
                    {
                        opacity: 0.3,
                        rotate: "+=180",
                        color: "#FFC400",
                        scale: 2.4,
                        duration: 0.6,
                        stagger: {
                            amount: 1.8,
                            grid: grid,
                            from: "center",
                        },
                    },
                    {
                        opacity: 0.3,
                        rotate: "+=180",
                        scale: 1,
                        color: "#fff",
                        delay: -1.8,
                        duration: 0.6,
                        stagger: {
                            amount: 2,
                            grid: grid,
                            from: "center",
                        },
                    },
                ],
                repeat: -1,
                repeatDelay: 8,
                delay: 8,
            });
        },
        { scope: svgRef },
    );

    return (
        <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 935 425"
            className="absolute -z-10"
            id="pulse-grid"
            opacity={0}
            style={{
                maskImage:
                    "linear-gradient(transparent 1%, black,  black, transparent)",
            }}
        >
            <g className="pulse-grid-group">
                {[...Array(grid[0])].map((_, i) => {
                    return [...Array(grid[1])].map((_, j) => {
                        return (
                            <path
                                key={i + j}
                                fill="currentColor"
                                opacity="0.3"
                                className="pulse-grid-item"
                                d={`M${j * 32},${i * 32 + 10}a0.14,0.14,0,0,1,0.26,0l0.14,0.36a2.132,2.132,0,0,0,1.27,1.27l0.37,0.14a0.14,0.14,0,0,1,0,0.26l-0.37,0.14a2.132,2.132,0,0,0,-1.27,1.27l-0.14,0.37a0.14,0.14,0,0,1,-0.26,0l-0.14,-0.37a2.132,2.132,0,0,0,-1.27,-1.27l-0.36,-0.14a0.14,0.14,0,0,1,0,-0.26l0.37,-0.14a2.132,2.132,0,0,0,1.26,-1.27l0.14,-0.36z`}
                            />
                        );
                    });
                })}
            </g>
        </svg>
    );
}
