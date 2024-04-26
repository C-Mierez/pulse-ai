"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { gsap, useGSAP } from "~/lib/gsap";

export default function Magnetic({ children }: { children: JSX.Element }) {
    const ref = useRef<HTMLDivElement>(null);
    const xTo = React.useRef<((value: number) => void) | null>(null);
    const yTo = React.useRef<((value: number) => void) | null>(null);

    const { contextSafe } = useGSAP(
        () => {
            xTo.current = gsap.quickTo(ref.current, "x", {
                duration: 1,
                ease: "elastic.out(1, 0.3)",
            });
            yTo.current = gsap.quickTo(ref.current, "y", {
                duration: 1,
                ease: "elastic.out(1, 0.3)",
            });
        },
        { scope: ref },
    );

    const onMouseMove = contextSafe((e: React.PointerEvent<HTMLDivElement>) => {
        if (!xTo.current || !yTo.current) return;

        const { clientX, clientY } = e;
        const { width, height, left, top } =
            ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        xTo.current(x);
        yTo.current(y);
    });

    const onMouseLeave = contextSafe(() => {
        if (!xTo.current || !yTo.current) return;

        xTo.current(0);
        yTo.current(0);
    });

    return (
        <div
            ref={ref}
            onPointerMove={onMouseMove}
            onPointerLeave={onMouseLeave}
        >
            {children}
        </div>
    );
}
