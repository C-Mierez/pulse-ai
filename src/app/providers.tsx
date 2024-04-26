"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis
            root={true}
            options={{
                lerp: 0.2,
                touchMultiplier: 0.05,
            }}
        >
            {children}
        </ReactLenis>
    );
}
