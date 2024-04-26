import { PrismicText } from "@prismicio/react";
import Image from "next/image";
import React from "react";
import StarBackground from "~/app/(homepage)/_components/start-background";
import Bounded from "~/components/layout/bounded";

import AnimatedIntegrationsContent from "./animated-content";
import background from "./background.jpg";

import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
    return (
        <section className="relative overflow-clip">
            <Image
                className="absolute h-full w-full object-cover hue-rotate-[185deg] filter"
                src={background}
                alt="background"
                quality={90}
            ></Image>

            <StarBackground />

            <Bounded
                as={"div"}
                className="relative flex flex-col items-center gap-8"
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
            >
                <div className="relative flex flex-col items-center gap-8">
                    <h2 className="max-w-2xl text-balance text-center text-7xl max-md:text-4xl">
                        <PrismicText field={slice.primary.heading} />
                    </h2>

                    <p className="max-w-lg text-balance text-center text-lg text-muted">
                        <PrismicText field={slice.primary.subheading} />
                    </p>

                    <AnimatedIntegrationsContent slice={slice} />
                </div>
            </Bounded>
        </section>
    );
};

export default Integrations;
