"use client";

import {
    CodeSandboxLogoIcon,
    FigmaLogoIcon,
    FramerLogoIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    ModulzLogoIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { useRef } from "react";
import StylizedLogo from "~/components/svg/stylized-logo";
import usePrefersReducedMotion from "~/hooks/use-prefers-reduced-motion";
import { gsap, useGSAP } from "~/lib/gsap";
import { cn } from "~/lib/utils";

import type { Content } from "@prismicio/client";
export default function AnimatedIntegrationsContent({
    slice,
}: {
    slice: Content.IntegrationsSlice;
}) {
    const icons = {
        linkedin: <LinkedInLogoIcon className="size-6 md:size-9 lg:size-12" />,
        modulz: <ModulzLogoIcon className="size-6 md:size-9 lg:size-12" />,
        github: <GitHubLogoIcon className="size-6 md:size-9 lg:size-12" />,
        figma: <FigmaLogoIcon className="size-6 md:size-9 lg:size-12" />,
        sandbox: (
            <CodeSandboxLogoIcon className="size-6 md:size-9 lg:size-12" />
        ),
        framer: <FramerLogoIcon className="size-6 md:size-9 lg:size-12" />,
    };

    const boundedRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (prefersReducedMotion) {
                return;
            }

            const t1 = gsap.timeline({
                repeat: -1,
            });

            // Animate logo
            t1.to(".pulsing-logo", {
                keyframes: [
                    {
                        filter: "brightness(1.3)",
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.in",
                    },
                    {
                        filter: "brightness(1)",
                        opacity: 0.7,
                        duration: 1,
                        ease: "power2.out",
                    },
                ],
            });

            // Animate signal lines
            t1.to(
                ".signal-line",
                {
                    keyframes: [
                        {
                            backgroundPosition: "0% 0%",
                        },
                        {
                            backgroundPosition: "100% 100%",
                            stagger: { from: "center", each: 0.3 },
                            duration: 1,
                        },
                    ],
                },
                "-=1.8",
            );

            // Animate each icon
            t1.to(
                ".pulsing-icon",
                {
                    keyframes: [
                        {
                            opacity: 1,
                            stagger: {
                                from: "center",
                                each: 0.3,
                            },
                            duration: 0.5,
                        },
                        {
                            opacity: 0.5,
                            stagger: {
                                from: "center",
                                each: 0.3,
                            },
                            ease: "power2.inOut",
                            duration: 0.8,
                        },
                    ],
                },
                "-=1.8",
            );
        },
        { scope: boundedRef },
    );

    return (
        <div
            className="mt-20 flex items-center max-md:flex-col"
            ref={boundedRef}
        >
            {slice.items.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {index === Math.floor(slice.items.length / 2) && (
                            <>
                                <div className="hue-rotate-[185deg] filter">
                                    <StylizedLogo />
                                </div>
                                <div className="signal-line rotate-180"></div>
                            </>
                        )}
                        <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-primary-300/50 bg-primary-300/50 p-3 text-3xl text-foreground opacity-50 md:text-4xl lg:text-5xl">
                            {item.icon && icons[item.icon]}
                        </div>

                        {index !== slice.items.length - 1 && (
                            <div
                                className={cn(
                                    "signal-line",
                                    index >= Math.floor(slice.items.length / 2)
                                        ? "rotate-180"
                                        : "rotate-0",
                                )}
                            ></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
