"use client";

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import { useRef } from "react";
import { useGSAP, gsap } from "~/lib/gsap";
import { cn } from "~/lib/utils";

export default function ButtonCTA({
    className,
    ...props
}: PrismicNextLinkProps) {
    const buttonRef = useRef(null);
    gsap.registerPlugin(useGSAP);
    const { contextSafe } = useGSAP(
        () => {
            const t1 = gsap.timeline({
                repeat: -1,
                repeatDelay: 5,
                defaults: {
                    duration: 2,
                    ease: "power2.out",
                },
            });

            t1.fromTo(buttonRef.current, { "--x": "100%" }, { "--x": "-100%" });
        },
        { scope: buttonRef },
    );

    const animOnTapDown = contextSafe(() => {
        gsap.to(buttonRef.current, {
            scale: 0.97,
            duration: 0.1,
        });
    });

    const animOnTapUp = contextSafe(() => {
        gsap.to(buttonRef.current, {
            scale: 1,
            duration: 0.1,
        });
    });

    return (
        <PrismicNextLink
            ref={buttonRef}
            {...props}
            className={cn(
                "radial-bg hover-glow relative block max-w-fit rounded-lg px-6 py-2 text-center font-light",
                className,
            )}
            onPointerDown={animOnTapDown}
            onPointerUp={animOnTapUp}
            onPointerOut={animOnTapUp}
        >
            <span className="linear-mask">{props.children}</span>
            <span className="linear-overlay absolute inset-0 block rounded-lg p-px"></span>
        </PrismicNextLink>
    );
}
