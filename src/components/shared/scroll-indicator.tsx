"use client";

import React, { useCallback, useEffect, useRef } from "react";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "~/lib/gsap";
import { cn } from "~/lib/utils";

import { type Content } from "@prismicio/client";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { useLenis } from "@studio-freight/react-lenis";

interface ScrollIndicatorProps {
    settings: Content.SettingsDocument;
}

export default function ScrollIndicator({ settings }: ScrollIndicatorProps) {
    const containerRef = useRef(null);
    const iDownRef = useRef(null);
    const iUpRef = useRef(null);

    const pathname = usePathname();

    const shouldDelay = useCallback(() => {
        return pathname.length <= 6;
    }, [pathname]);

    useEffect(() => {
        // Refresh ScrollTrigger after the page has loaded to ensure proper positioning if the page has already been scrolled
        ScrollTrigger.refresh();
    }, []);

    useGSAP(
        () => {
            // Enter Animation
            gsap.to(containerRef.current, {
                x: "0rem",
                opacity: 1,
                delay: shouldDelay() ? 4 : 0,
            });

            // Scroll switch animation
            const tlScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: iDownRef.current,
                    toggleActions: "play none none reverse",
                    start: "top 50%",
                },
            });

            tlScroll.to(iDownRef.current, {
                y: "200%",
            });
            tlScroll.fromTo(
                iUpRef.current,
                {
                    y: "-50%",
                    opacity: 0,
                    visibility: "hidden",
                },
                {
                    y: "0%",
                    opacity: 1,
                    visibility: "visible",
                },
                "<+0.2",
            );
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            // Idle animation of arrows
            const tlIdle = gsap.timeline({
                defaults: {
                    duration: 0.5,
                },
                repeat: -1,
                repeatDelay: 3,
            });

            tlIdle.to("#ghostArrowMain", {
                y: "100%",
            });
            tlIdle.to(
                "#ghostArrowAux",
                {
                    y: "100%",
                },
                "<",
            );
        },
        { scope: iDownRef },
    );

    useGSAP(
        () => {
            // Idle animation of arrows
            const tlIdle = gsap.timeline({
                defaults: {
                    duration: 0.5,
                },
                repeat: -1,
                repeatDelay: 3,
            });

            tlIdle.to("#ghostArrowMain", {
                y: "-100%",
            });
            tlIdle.fromTo(
                "#ghostArrowAux",
                {
                    y: "200%",
                },
                {
                    y: "100%",
                },
                "<",
            );
        },
        { scope: iUpRef },
    );

    return (
        <>
            <div
                ref={containerRef}
                className="fixed bottom-0 right-0 translate-x-[5rem] opacity-0"
            >
                <Indicator
                    ref={iDownRef}
                    isPointedUp={false}
                    settings={settings}
                />
                <Indicator
                    ref={iUpRef}
                    isPointedUp={true}
                    settings={settings}
                />
            </div>
        </>
    );
}

interface IndicatorProps extends React.AllHTMLAttributes<HTMLButtonElement> {
    isPointedUp: boolean;
    settings: Content.SettingsDocument;
}

const Indicator = React.forwardRef<HTMLButtonElement, IndicatorProps>(
    ({ isPointedUp, settings }, ref) => {
        const lenis = useLenis();

        const arrows = {
            up: <DoubleArrowUpIcon className="size-4" />,
            down: <DoubleArrowDownIcon className="size-4" />,
        };
        const labels = settings.data.scroll_indicator[0];
        const arrow = isPointedUp ? arrows.up : arrows.down;
        const label = isPointedUp
            ? labels?.up_direction
            : labels?.down_direction;

        return (
            <button
                ref={ref}
                onClick={(e) => {
                    e.currentTarget.blur();
                    if (lenis && isPointedUp) {
                        lenis.scrollTo(0);
                    }
                }}
                className={cn(
                    "fixed bottom-10 right-6 flex flex-col items-center gap-3 rounded-full border border-border bg-background/50 px-1 text-sm text-foreground backdrop-blur-md",
                    isPointedUp ? "pb-4 pt-2 opacity-0" : "pb-2 pt-4",
                    isPointedUp
                        ? "group cursor-pointer transition-colors duration-200 ease-in-out md:hover:border-accent-light md:hover:bg-accent md:hover:text-background"
                        : "cursor-default",
                    !isPointedUp ? "max-md:hidden" : "",
                )}
            >
                {isPointedUp && <ArrowContainer>{arrow}</ArrowContainer>}
                <div className="text-vertical max-md:hidden">{label}</div>
                {!isPointedUp && <ArrowContainer>{arrow}</ArrowContainer>}
            </button>
        );
    },
);
Indicator.displayName = "Indicator";

function ArrowContainer({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div
                className="relative overflow-hidden text-accent-light md:group-hover:text-background"
                aria-hidden
            >
                <div className="invisible">{children}</div>
                <span id="ghostArrowMain" className=" absolute inset-x-0 top-0">
                    {children}
                </span>
                <span
                    id="ghostArrowAux"
                    className=" absolute inset-x-0 bottom-full"
                >
                    {children}
                </span>
            </div>
        </>
    );
}
