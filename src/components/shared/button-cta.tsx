"use client";

import { PrismicNextLink } from "@prismicio/next";
import { cva, type VariantProps } from "class-variance-authority";
import { useRef } from "react";
import { gsap, useGSAP } from "~/lib/gsap";
import { cn } from "~/lib/utils";

import type { PrismicNextLinkProps } from "@prismicio/next";
export interface ButtonCTAProps extends VariantProps<typeof variants> {
    prismic: PrismicNextLinkProps;
    asChild?: boolean;
    children: React.ReactNode;
}

const variants = cva(
    "radial-bg hover-glow relative flex max-w-fit items-center rounded-lg text-center font-light text-primary-200",
    {
        variants: {
            variant: {
                default: "",
            },
            size: {
                default: "px-6 py-2 text-lg",
                md: "px-4 py-1 text-base",
                xl: "px-6 py-2 text-xl",
                stretch: "px-6 py-2 text-lg",
                stretchMd: "px-4 py-1 text-base",
            },
        },
        compoundVariants: [
            {
                size: ["default", "md", "xl"],
                className: "h-fit",
            },
        ],
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export default function ButtonCTA({
    children,
    size,
    variant,
    ...props
}: ButtonCTAProps) {
    const buttonRef = useRef(null);
    gsap.registerPlugin(useGSAP);
    const { contextSafe } = useGSAP(
        () => {
            const t1 = gsap.timeline({
                repeat: -1,
                repeatDelay: 5 + Math.random() * 7,
                delay: 1 + Math.random() * 3,
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
            {...props.prismic}
            className={cn(
                variants({ variant, size, className: props.prismic.className }),
            )}
            onPointerDown={animOnTapDown}
            onPointerUp={animOnTapUp}
            onPointerOut={animOnTapUp}
        >
            <span className="linear-mask">{children}</span>
            <span className="linear-overlay absolute inset-0 block rounded-lg p-px"></span>
        </PrismicNextLink>
    );
}
