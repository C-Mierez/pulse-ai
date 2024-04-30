"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "~/lib/gsap";

interface AnimatedHeadingProps {
    children: React.ReactNode;
}

export default function AnimatedHeading({ children }: AnimatedHeadingProps) {
    const containerRef = useRef(null);
    useGSAP(
        () => {
            gsap.to(containerRef.current, {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom top",
                    once: true,
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="translate-y-[50%] opacity-0">
            {children}
        </div>
    );
}
