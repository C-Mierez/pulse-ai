"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "~/lib/gsap";
import { cn } from "~/lib/utils";

import { type Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";

interface AnimatedCardProps {
    slice: Content.CaseStudiesSlice;
    index: number;
    caseStudy: Content.CaseStudyDocument;
}

export default function AnimatedCards({
    slice,
    index,
    caseStudy,
}: AnimatedCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Animate text content staggered from side
            // Animate image to slide in from the opposite side

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 50%",
                        end: "bottom 50%",
                        toggleActions: "play reverse play reverse",
                    },
                });

                tl.fromTo(
                    "h3, p, #link",
                    {
                        xPercent: index % 2 === 0 ? 100 : -100,
                        x: index % 2 === 0 ? "1.5rem" : "-1.5rem", // grid gap
                    },
                    {
                        xPercent: 0,
                        x: 0,
                        stagger: {
                            each: 0.2,
                        },
                    },
                );

                tl.fromTo(
                    "#image",
                    {
                        xPercent: index % 2 === 0 ? -33 : 33,
                        x: index % 2 === 0 ? "1.5rem" : "-1.5rem", // grid gap
                    },
                    {
                        xPercent: 0,
                        x: 0,
                    },
                    "<",
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <div
            ref={containerRef}
            className="group relative grid grid-cols-3 gap-6 rounded-l p-4 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-100 max-md:grid-cols-1 md:opacity-85  "
        >
            <div
                className={cn(
                    "col-span-1 flex flex-col justify-center gap-6 ",
                    index % 2 === 0 && "md:text-end",
                )}
            >
                <h3 className="text-4xl">
                    <PrismicText field={caseStudy.data.company}></PrismicText>
                </h3>
                <div className="prose prose-invert max-w-md">
                    <PrismicRichText
                        field={caseStudy.data.description}
                    ></PrismicRichText>
                </div>

                <PrismicNextLink
                    document={caseStudy}
                    className="after:absolute after:inset-0  after:z-[1] hover:underline"
                >
                    <div id="link">
                        <span>
                            {slice.items[index]?.link_text}
                            &nbsp;
                        </span>
                        <PrismicText
                            field={caseStudy.data.company}
                        ></PrismicText>
                    </div>
                </PrismicNextLink>
            </div>
            <div
                id="image"
                className={cn(
                    "col-span-2 overflow-hidden rounded-lg transition-[border-radius] duration-300 ease-in-out group-hover:rounded-2xl",
                    index % 2 === 1 ? "mr-auto md:-order-1" : "ml-auto",
                )}
            >
                <PrismicNextImage
                    className={cn(
                        " hue-rotate-[185deg] filter transition-transform duration-300 ease-in-out group-hover:scale-[1.05]",
                    )}
                    quality={100}
                    field={caseStudy.data.logo_image}
                ></PrismicNextImage>
            </div>
        </div>
    );
}
