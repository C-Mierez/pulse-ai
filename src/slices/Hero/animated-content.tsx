"use client";

import { isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText } from "@prismicio/react";
import { useRef } from "react";
import Bounded from "~/components/layout/bounded";
import ButtonCTA from "~/components/shared/button-cta";
import { gsap, useGSAP } from "~/lib/gsap";
import usePrefersReducedMotion from "~/hooks/use-prefers-reduced-motion";

import type { Content } from "@prismicio/client";
export default function AnimatedHeroContent({
    slice,
}: {
    slice: Content.HeroSlice;
}) {
    const boundedRef = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (prefersReducedMotion) {
                gsap.set(
                    ".hero__heading, .hero__subheading, .hero__cta, .hero__image, .hero__glow",
                    {
                        opacity: 1,
                        translateY: "0%",
                        scale: 1,
                    },
                );
                return;
            }

            const t1 = gsap.timeline();

            t1.fromTo(
                ".hero__heading",
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.4 },
            );

            t1.fromTo(
                ".hero__subheading",
                { translateY: "15%", opacity: 0 },
                { translateY: "0%", opacity: 1, duration: 1 },
                "-=0.6",
            );

            t1.fromTo(
                ".hero__cta",
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.2 },
                "-=0.4",
            );

            t1.fromTo(
                ".hero__image",
                { translateY: "15%", opacity: 0 },
                { translateY: "0%", opacity: 1, duration: 1 },
            );

            t1.fromTo(
                ".hero__glow",
                { scale: 0.5, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.6 },
                "-=0.6",
            );
        },
        { scope: boundedRef },
    );

    return (
        <Bounded
            as="div"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <span
                ref={boundedRef}
                className="flex w-full flex-col items-center gap-8 text-center"
            >
                {isFilled.richText(slice.primary.heading) && (
                    <h1 className="hero__heading text-balance text-7xl opacity-0 max-md:text-4xl">
                        <PrismicText field={slice.primary.heading} />
                    </h1>
                )}
                {isFilled.richText(slice.primary.subheading) && (
                    <p className="hero__subheading max-w-md text-xl text-muted opacity-0 max-md:text-lg">
                        <PrismicText field={slice.primary.subheading} />
                    </p>
                )}
                {isFilled.link(slice.primary.button_link) &&
                    isFilled.keyText(slice.primary.button_label) && (
                        <ButtonCTA
                            field={slice.primary.button_link}
                            className="hero__cta text-xl opacity-0"
                        >
                            {slice.primary.button_label}
                        </ButtonCTA>
                    )}
                {isFilled.image(slice.primary.image) && (
                    <div className="hero__image glass-surface mt-8 opacity-0">
                        <div className="hero__glow absolute inset-0 z-[-11] bg-accent/45 blur-2xl filter max-md:blur-lg"></div>
                        <PrismicNextImage
                            field={slice.primary.image}
                            className="rounded-lg"
                        />
                    </div>
                )}
            </span>
        </Bounded>
    );
}
