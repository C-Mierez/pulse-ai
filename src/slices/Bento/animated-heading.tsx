"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "~/lib/gsap";

interface AnimatedHeadingProps {
    children: React.ReactNode;
    parallaxFactor?: number;
}

export default function AnimatedHeading({
    children,
    parallaxFactor = 1,
}: AnimatedHeadingProps) {
    const containerRef = useRef(null);
    useGSAP(
        () => {
            gsap.to(containerRef.current, {
                y: `-${parallaxFactor * 50}`,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        },
        { scope: containerRef },
    );

    return <div ref={containerRef}>{children}</div>;
}
