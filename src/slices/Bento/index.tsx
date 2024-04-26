import { asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import Bounded from "~/components/layout/bounded";
import { cn } from "~/lib/utils";

import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

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
                                <em className="bg-gradient-to-br from-accent to-accent-light bg-clip-text not-italic text-transparent">
                                    {children}
                                </em>
                            );
                        },
                    }}
                />

                <div className="mx-auto max-w-md text-balance text-xl text-muted">
                    <PrismicRichText field={slice.primary.body} />
                </div>

                <ul className="max-md:grid-rows-[auto, auto, auto] mt-8 grid max-w-5xl gap-8 p-3 max-md:gap-4 md:grid-cols-3">
                    {slice.items.map((item) => (
                        <div
                            key={asText(item.title)}
                            className={cn(
                                "glass-surface row-span-3 grid-rows-subgrid rounded-lg text-left max-md:place-items-center max-md:text-center",
                                item.wide ? "md:col-span-2" : "md:col-span-1",
                            )}
                        >
                            <div className="flex h-full flex-col rounded-lg bg-background p-3">
                                <h3 className="text-3xl">
                                    <PrismicText field={item.title} />
                                </h3>
                                <p className="prose prose-invert mb-4 mt-2 max-md:text-balance">
                                    <PrismicText field={item.content} />
                                </p>
                                <PrismicNextImage
                                    field={item.image}
                                    className="w-auto flex-1 max-md:mx-auto"
                                />
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </Bounded>
    );
};

export default Bento;
