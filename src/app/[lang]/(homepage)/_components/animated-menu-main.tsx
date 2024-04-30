"use client";

import { useRef } from "react";

import { SheetClose } from "~/components/ui/double-sheet";
import { gsap, useGSAP } from "~/lib/gsap";

import { type Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

interface AnimatedMenuMainProps {
    settings: Content.SettingsDocument;
}

export default function AnimatedMenuMain(props: AnimatedMenuMainProps) {
    const containerRef = useRef(null);

    const cta = props.settings.data.navigation.at(
        props.settings.data.navigation.length - 1,
    );

    useGSAP(
        () => {
            const duration = 0.8;

            const tl = gsap.timeline({
                defaults: {
                    duration: duration,
                    stagger: {
                        amount: duration,
                    },
                },
            });

            tl.from("li", {
                xPercent: 100,
                autoAlpha: 0,
            });

            tl.from(
                "#cta",
                {
                    yPercent: 100,
                },
                // `>${duration * -0.5}`,
            );
        },
        { scope: containerRef },
    );

    return (
        <div
            ref={containerRef}
            className="flex h-full max-h-full flex-col justify-between"
        >
            <ul className="overflow-x-hidden overflow-y-scroll">
                <li>
                    <SheetClose asChild>
                        <PrismicNextLink
                            field={props.settings.data.root}
                            className="block border-b-2 border-b-background/15 p-4 py-3 text-2xl font-bold text-background hover:bg-accent-light active:bg-accent-light"
                        >
                            Home
                        </PrismicNextLink>
                    </SheetClose>
                </li>
                {props.settings.data.navigation.map((item) => {
                    // Skip CTA Button
                    if (item.cta_button) return null;

                    return (
                        <li
                            key={item.label}
                            className="border-b-2 border-b-background/15"
                        >
                            <SheetClose asChild>
                                <PrismicNextLink
                                    field={item.link}
                                    className="block  p-4 py-3 text-2xl font-bold text-background hover:bg-accent-light active:bg-accent-light"
                                >
                                    {item.label}
                                </PrismicNextLink>
                            </SheetClose>
                        </li>
                    );
                })}
            </ul>
            <div id="cta" className="p-4">
                {!!cta && (
                    <PrismicNextLink
                        field={cta.link}
                        className="block rounded-lg bg-background p-4 py-3 text-center text-2xl font-bold text-foreground"
                    >
                        {cta.label}
                    </PrismicNextLink>
                )}
            </div>
        </div>
    );
}
