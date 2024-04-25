import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import Bounded from "~/components/layout/bounded";
import ButtonCTA from "~/components/shared/button-cta";
import PlainLogo from "~/components/svg/plain-logo";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction = ({ slice }: CallToActionProps): JSX.Element => {
    return (
        <Bounded
            className="relative flex flex-col items-center gap-6"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-accent-light/25 blur-[160px] filter"></div>

            <div className="glass-surface rounded-lg bg-gradient-to-b from-primary-900 to-accent/15 p-4">
                <PlainLogo />
            </div>

            <h2 className="mt-6 max-w-2xl text-balance text-center text-5xl max-md:text-4xl">
                <PrismicText field={slice.primary.heading} />
            </h2>

            <ButtonCTA field={slice.primary.button_link}>
                {slice.primary.button_label}
            </ButtonCTA>
        </Bounded>
    );
};

export default CallToAction;
