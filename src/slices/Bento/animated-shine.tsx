"use client";

import { useRef } from "react";
import { useGSAP, gsap } from "~/lib/gsap";

interface AnimatedShineProps {
    children: React.ReactNode;
}

export default function AnimatedShine({ children }: AnimatedShineProps) {
    const containerRef = useRef(null);
    useGSAP(
        () => {
            gsap.to(containerRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                },
                backgroundSize: "100%",
            });
        },
        { scope: containerRef },
    );

    return (
        <em
            ref={containerRef}
            className="bg-gradient-to-br from-accent to-accent-light bg-clip-text bg-no-repeat not-italic text-transparent"
        >
            {children}
        </em>
    );
}
