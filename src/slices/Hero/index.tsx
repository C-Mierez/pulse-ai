import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
    PrismicRichText,
    PrismicText,
    SliceComponentProps,
} from "@prismicio/react";
import PulseGrid from "~/app/(homepage)/_components/pulse-grid";
import Bounded from "~/components/layout/bounded";
import ButtonCTA from "~/components/shared/button-cta";

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
            <Bounded
                as="div"
                className="flex flex-col items-center gap-8 text-center"
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
            >
                {isFilled.richText(slice.primary.heading) && (
                    <h1 className="text-balance text-7xl max-md:text-5xl">
                        <PrismicText field={slice.primary.heading} />
                    </h1>
                )}
                {isFilled.richText(slice.primary.subheading) && (
                    <p className="max-w-md text-xl text-muted max-md:text-lg">
                        <PrismicText field={slice.primary.subheading} />
                    </p>
                )}
                {isFilled.link(slice.primary.button_link) &&
                    isFilled.keyText(slice.primary.button_label) && (
                        <ButtonCTA
                            field={slice.primary.button_link}
                            className="text-xl"
                        >
                            {slice.primary.button_label}
                        </ButtonCTA>
                    )}
                {isFilled.image(slice.primary.image) && (
                    <div className="glass-surface mt-8 w-fit">
                        <div className="absolute inset-0 -z-10 bg-accent/30 blur-2xl filter"></div>
                        <PrismicNextImage
                            field={slice.primary.image}
                            className="
                         rounded-lg"
                        />
                    </div>
                )}
            </Bounded>
        </section>
    );
};

export default Hero;
