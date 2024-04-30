"use client";

import React, { useCallback, useRef } from "react";

import Bounded from "~/components/layout/bounded";
import ButtonCTA from "~/components/shared/button-cta";
import { gsap, useGSAP } from "~/lib/gsap";
import { cn } from "~/lib/utils";

import type { Content } from "@prismicio/client";
import { asText, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { GearIcon, SymbolIcon } from "@radix-ui/react-icons";

import AnimatedShowcaseContent from "./animated-content";

const icons = {
    gear: <GearIcon className="size-8" />,
    cycle: <SymbolIcon className="size-8" />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
    const isHeadingFilled = isFilled.richText(slice.primary.heading);

    const mouseContainerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const xTo = React.useRef<((value: number) => void) | null>(null);
    const yTo = React.useRef<((value: number) => void) | null>(null);

    const { contextSafe } = useGSAP(
        () => {
            xTo.current = gsap.quickTo(glowRef.current, "x", {
                duration: 0.5,
                ease: "power2.out",
            });
            yTo.current = gsap.quickTo(glowRef.current, "y", {
                duration: 0.5,
                ease: "power2.out",
            });

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                gsap.to(glowRef.current, {
                    scale: 1.5,
                    duration: 10,
                    repeat: -1,
                    repeatDelay: 1.5,
                    yoyo: true,
                    ease: "power2.inOut",
                });

                for (let i = 0; i < slice.items.length; i++) {
                    gsap.fromTo(
                        `#img${i}`,
                        {
                            y: "10%",
                        },
                        {
                            y: "-10%",
                            scrollTrigger: {
                                trigger: `#card${i}`,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        },
                    );
                }
            });
        },
        { scope: mouseContainerRef },
    );

    const areRefsNull = useCallback(() => {
        return mouseContainerRef.current === null || glowRef.current === null;
    }, [mouseContainerRef, glowRef]);

    const onMouseMove = contextSafe((e: React.MouseEvent) => {
        if (areRefsNull()) return;

        const { clientX, clientY } = e;
        const { top, left, width, height } =
            glowRef.current!.getBoundingClientRect();

        // Move exactly centered around the mouse
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        xTo.current!(x);
        yTo.current!(y);
    });
    const onMouseLeave = contextSafe((e: React.MouseEvent) => {
        if (areRefsNull()) return;

        xTo.current!(0);
    });

    return (
        <section
            ref={mouseContainerRef}
            onPointerMove={onMouseMove}
            onPointerLeave={onMouseLeave}
        >
            <Bounded
                as={"div"}
                className={cn(
                    "relative flex flex-col items-center gap-6",
                    !!isHeadingFilled ? "" : "-mt-12",
                )}
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
            >
                {isHeadingFilled && (
                    <>
                        <div className="absolute inset-0 -z-40 flex items-start justify-center">
                            <div
                                ref={glowRef}
                                className="glow mt-[10lvh] aspect-square w-full max-w-xl rounded-full bg-foreground/5 blur-[110px] filter"
                            ></div>
                        </div>

                        <AnimatedShowcaseContent slice={slice} />
                    </>
                )}

                {slice.items.map((item, index) => {
                    return (
                        <div
                            key={asText(item.title)}
                            id={`card${index}`}
                            className={cn(
                                "grid grid-cols-3 items-center rounded-lg border border-border bg-gradient-to-tr from-primary-800/15 to-primary-300/25 p-8 backdrop-blur-md max-2xl:gap-6 max-lg:grid-cols-1 max-md:p-4",
                                !!isHeadingFilled && "mt-12",
                            )}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="aspect-square w-fit rounded-lg bg-accent/75 p-4 max-md:p-2">
                                    {item.icon && icons[item.icon]}
                                </div>

                                <div className=" text-2xl">
                                    <PrismicRichText field={item.title} />
                                </div>

                                <div className="prose prose-invert max-w-xl">
                                    <PrismicRichText field={item.body} />
                                </div>

                                <ButtonCTA
                                    prismic={{
                                        field: item.button_link,
                                        className: "mt-2",
                                    }}
                                >
                                    {item.button_label ?? "Learn More"}
                                </ButtonCTA>
                            </div>
                            <PrismicNextImage
                                field={item.image}
                                id={`img${index}`}
                                className={cn(
                                    "col-span-2 rounded-lg opacity-85 shadow-2xl grayscale filter hover:grayscale-0",
                                    index % 2 === 0
                                        ? "lg:-order-1 2xl:translate-x-[-15%]"
                                        : "lg:order-1 2xl:translate-x-[15%]",
                                )}
                            />
                        </div>
                    );
                })}
            </Bounded>
        </section>
    );
};

export default Showcase;
