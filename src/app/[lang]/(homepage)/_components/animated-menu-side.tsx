"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "~/lib/gsap";
import { socials } from "~/lib/utils";

import { type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface AnimatedMenuSideProps {
    settings: Content.SettingsDocument;
}

export default function AnimatedMenuSide(props: AnimatedMenuSideProps) {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();
            tl.from("a", {
                y: 100,
                autoAlpha: 0,
                duration: 0.6,
                stagger: {
                    each: 0.2,
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <div
            ref={containerRef}
            className="flex h-full flex-col justify-between p-4"
        >
            <div className="text-vertical align-middle">
                <h1 className="text-7xl font-bold uppercase text-accent">
                    Pulse
                    <span className="text-foreground">.Menu</span>
                </h1>
            </div>
            <ul className="flex w-full flex-col items-end justify-center">
                {props.settings.data.socials.map((item) => (
                    <li key={item.socials}>
                        <PrismicNextLink
                            field={item.link}
                            className="block rounded-lg p-3 transition-colors duration-200 ease-in-out hover:text-accent-light/85"
                        >
                            <span className="sr-only">{item.socials}</span>
                            {item.socials && socials[item.socials]}
                        </PrismicNextLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
