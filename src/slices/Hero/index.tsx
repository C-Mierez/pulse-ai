import PulseGrid from "~/app/(homepage)/_components/pulse-grid";

import AnimatedHeroContent from "./animated-content";

import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
    return (
        <section className="relative">
            <PulseGrid />

            <AnimatedHeroContent slice={slice} />
        </section>
    );
};

export default Hero;
