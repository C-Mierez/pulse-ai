import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { GearIcon, SymbolIcon } from "@radix-ui/react-icons";
import Bounded from "~/components/layout/bounded";
import ButtonCTA from "~/components/shared/button-cta";
import { cn } from "~/lib/utils";

const icons = {
    gear: <GearIcon className="size-8" />,
    cycle: <SymbolIcon className="size-8" />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
    const isHeadingFilled = isFilled.richText(slice.primary.heading);

    return (
        <Bounded
            className={cn(
                "flex flex-col items-center gap-6",
                isHeadingFilled ? "" : "pt-0",
            )}
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            {isHeadingFilled && (
                <>
                    <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-accent/20 blur-3xl filter"></div>
                    <span>
                        <PrismicRichText
                            field={slice.primary.heading}
                            components={{
                                heading2: ({ children }) => (
                                    <h2 className="text-balance text-center text-7xl max-md:text-5xl">
                                        {children}
                                    </h2>
                                ),
                            }}
                        />
                    </span>
                </>
            )}

            {slice.items.map((item) => {
                return (
                    <div className="mt-12 grid grid-cols-3 items-center gap-6 rounded-lg border border-border bg-gradient-to-tr from-primary-800/15 to-primary-300/25 p-8 backdrop-blur-md max-md:grid-cols-1">
                        <div className="flex flex-col gap-4">
                            <div className="aspect-square w-fit rounded-lg bg-accent/75 p-4">
                                {item.icon && icons[item.icon]}
                            </div>

                            <div className=" text-2xl">
                                <PrismicRichText field={item.title} />
                            </div>

                            <div className="prose prose-invert max-w-xl">
                                <PrismicRichText field={item.body} />
                            </div>

                            <ButtonCTA
                                field={item.button_link}
                                className="mt-2"
                            >
                                {item.button_label || "Learn More"}
                            </ButtonCTA>
                        </div>
                        <PrismicNextImage
                            field={item.image}
                            className={cn(
                                // Make the image black adn white
                                "col-span-2 rounded-lg opacity-85 shadow-2xl grayscale filter hover:grayscale-0",
                                slice.variation === "reverse"
                                    ? "lg:order-1 lg:translate-x-[15%]"
                                    : "lg:-order-1 lg:translate-x-[-15%]",
                            )}
                        />
                    </div>
                );
            })}
        </Bounded>
    );
};

export default Showcase;