"use client";

import { gsap, useGSAP } from "~/lib/gsap";

import { type Content } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";

interface AnimatedHeadingProps {
    page: Content.CaseStudyDocument;
}

export default function AnimatedHeading({ page }: AnimatedHeadingProps) {
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from("#header, #header > p", {
            yPercent: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
        });
        tl.from("#subheader", {
            yPercent: 30,
            opacity: 0,
            duration: 1,
        });
    });

    return (
        <>
            <h1 id="header" className="text-center text-7xl max-md:text-5xl">
                <PrismicText field={page.data.company}></PrismicText>
                <p className="text-lg text-accent">{page.data.article_type}</p>
            </h1>
            <p
                id="subheader"
                className="max-w-xl text-balance text-center text-xl text-muted"
            >
                <PrismicText field={page.data.description}></PrismicText>
            </p>
        </>
    );
}
