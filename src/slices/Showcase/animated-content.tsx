"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { useRef } from "react";
import usePrefersReducedMotion from "~/hooks/use-prefers-reduced-motion";
import { gsap, useGSAP, ScrollTrigger } from "~/lib/gsap";

export default function AnimatedShowcaseContent({
    slice,
}: {
    slice: Content.ShowcaseSlice;
}) {
    const boundedRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (prefersReducedMotion) {
                gsap.set(boundedRef.current, {
                    y: "0%",
                });
                return;
            }

            gsap.fromTo(
                boundedRef.current,
                {
                    y: "100%",
                },
                {
                    y: "0%",
                    scrollTrigger: {
                        trigger: boundedRef.current,
                        start: "top bottom-=5%",
                        end: "bottom top+=60%",
                        scrub: true,
                        toggleActions: "play pause resume reverse",
                    },
                },
            );
        },
        { scope: boundedRef },
    );

    return (
        <span ref={boundedRef}>
            <PrismicRichText
                field={slice.primary.heading}
                components={{
                    heading2: ({ children }) => (
                        <h2 className="text-balance text-center text-7xl max-md:text-5xl">
                            {children}
                        </h2>
                    ),
                }}
            />
        </span>
    );
}
