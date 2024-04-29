import { asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import Bounded from "~/components/layout/bounded";
import { cn } from "~/lib/utils";

import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import AnimatedBento from "./animated-bento";
import AnimatedHeading from "./animated-heading";
import AnimatedShine from "./animated-shine";

/**
 * Props for `Bento`.
 */
export type BentoProps = SliceComponentProps<Content.BentoSlice>;

/**
 * Component for "Bento" Slices.
 */
const Bento = ({ slice }: BentoProps): JSX.Element => {
    return (
        <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="flex flex-col items-center gap-8 text-center">
                <AnimatedHeading>
                    <PrismicRichText
                        field={slice.primary.heading}
                        components={{
                            heading2: ({ children }) => {
                                return (
                                    <h2 className="text-balanced text-7xl max-md:text-4xl">
                                        {children}
                                    </h2>
                                );
                            },
                            em: ({ children }) => {
                                return (
                                    <AnimatedShine>{children}</AnimatedShine>
                                );
                            },
                        }}
                    />
                </AnimatedHeading>

                <AnimatedHeading parallaxFactor={0.5}>
                    <div className="mx-auto max-w-md text-balance text-xl text-muted">
                        <PrismicRichText field={slice.primary.body} />
                    </div>
                </AnimatedHeading>

                <AnimatedBento slice={slice} />
            </div>
        </Bounded>
    );
};

export default Bento;
