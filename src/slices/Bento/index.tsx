import { asText, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import {
    PrismicRichText,
    PrismicText,
    SliceComponentProps,
} from "@prismicio/react";
import Bounded from "~/components/layout/bounded";
import { cn } from "~/lib/utils";

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
                                <h2 className="text-balanced text-7xl max-md:text-5xl">
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

                <ul className="max-md:grid-rows-[auto, auto, auto] mt-8 grid max-w-5xl grid-cols-3 gap-10 p-3">
                    {slice.items.map((item) => (
                        <div
                            key={asText(item.title)}
                            className={cn(
                                "glass-surface row-span-3 grid-rows-subgrid gap-4 rounded-lg bg-background p-3 text-left",
                                item.wide ? "md:col-span-2" : "md:col-span-1",
                            )}
                        >
                            <h3 className="text-3xl">
                                <PrismicText field={item.title} />
                            </h3>
                            <p className="mb-4 mt-2 max-w-md text-balance text-muted">
                                <PrismicText field={item.content} />
                            </p>
                            <PrismicNextImage
                                field={item.image}
                                className="max-h-36 w-auto"
                            />
                        </div>
                    ))}
                </ul>
            </div>
        </Bounded>
    );
};

export default Bento;
