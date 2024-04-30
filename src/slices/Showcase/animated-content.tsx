"use client";

import { useRef } from "react";

import usePrefersReducedMotion from "~/hooks/use-prefers-reduced-motion";
import { gsap, useGSAP } from "~/lib/gsap";

import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";

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

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: boundedRef.current,
                    start: "top 85%",
                    end: "bottom 50%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.fromTo(
                "#container > *",
                {
                    y: "150%",
                },
                {
                    y: "0%",

                    stagger: {
                        each: 0.2,
                    },
                },
            );

            tl.fromTo(
                "#container > :last-child",
                {
                    backgroundSize: "0%",
                },
                {
                    backgroundSize: "100%",
                    color: "#0A0A0A",
                    fontWeight: "700",
                },
            );
        },
        { scope: boundedRef },
    );

    return (
        <div ref={boundedRef} id="container">
            <PrismicRichText
                field={slice.primary.heading}
                components={{
                    heading2: ({ children }) => (
                        <h2 className="mx-auto w-fit text-balance text-center text-7xl leading-tight last:bg-gradient-to-tr last:from-accent last:to-accent-light last:bg-no-repeat  max-md:text-4xl md:px-[0.5ch]">
                            {children}
                        </h2>
                    ),
                }}
            />
        </div>
    );
}
