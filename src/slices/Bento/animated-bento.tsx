"use client";

import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { useRef } from "react";
import { gsap, useGSAP } from "~/lib/gsap";
import { cn } from "~/lib/utils";

interface AnimatedBentoProps {
    slice: Content.BentoSlice;
}

export default function AnimatedBento({ slice }: AnimatedBentoProps) {
    const bentoRef = useRef(null);
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", (ctx) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        toggleActions: "play reverse play reverse",
                        trigger: bentoRef.current,
                        start: "top 70%",
                        end: "bottom 50%",
                    },
                    defaults: {
                        duration: 0.6,
                    },
                });

                const animations: Array<{
                    to: gsap.TweenVars;
                    from: gsap.TweenVars;
                }> = [
                    {
                        from: {
                            y: -50,
                        },
                        to: {
                            y: 0,
                        },
                    },
                    {
                        from: {
                            x: 100,
                        },
                        to: {
                            x: 0,
                        },
                    },
                    {
                        from: {
                            y: 100,
                        },
                        to: {
                            y: 0,
                        },
                    },
                    {
                        from: {
                            x: 100,
                        },
                        to: {
                            x: 0,
                        },
                    },
                ];

                for (let i = 0; i < slice.items.length; i++) {
                    tl.fromTo(
                        `#box${i}`,
                        animations[i % animations.length]!.from,
                        animations[i % animations.length]!.to,
                        `<+0.2`,
                    );
                }
            });
        },
        { scope: bentoRef },
    );

    return (
        <ul
            ref={bentoRef}
            className="max-md:grid-rows-[auto, auto, auto] mt-8 grid max-w-5xl gap-8 p-3 max-md:gap-4 md:grid-cols-3"
        >
            {slice.items.map((item, index) => (
                <div
                    key={asText(item.title)}
                    id={`box${index}`}
                    className={cn(
                        "glass-surface row-span-3 grid-rows-subgrid rounded-lg text-left transition-colors duration-300 ease-in-out hover:bg-accent/15 max-md:place-items-center max-md:text-center",
                        item.wide ? "md:col-span-2" : "md:col-span-1",
                    )}
                >
                    <div className="flex h-full flex-col rounded-lg bg-background p-4">
                        <h3 className="text-3xl">
                            <PrismicText field={item.title} />
                        </h3>
                        <p className="prose prose-invert mb-4 mt-2 max-md:text-balance">
                            <PrismicText field={item.content} />
                        </p>
                        <PrismicNextImage
                            field={item.image}
                            className="w-auto flex-1 max-md:mx-auto"
                        />
                    </div>
                </div>
            ))}
        </ul>
    );
}
