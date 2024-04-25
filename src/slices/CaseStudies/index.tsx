import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
    PrismicRichText,
    PrismicText,
    SliceComponentProps,
} from "@prismicio/react";
import Bounded from "~/components/layout/bounded";
import { cn } from "~/lib/utils";
import { createClient } from "~/prismicio";

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies = async ({
    slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
    const client = createClient();

    const caseStudies = await Promise.all(
        slice.items.map((item) => {
            if (isFilled.contentRelationship(item.case_study)) {
                return client.getByID<Content.CaseStudyDocument>(
                    item.case_study.id,
                );
            }
        }),
    );

    return (
        <Bounded
            className="flex flex-col items-center gap-8"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
        >
            <h2 className="max-w-2xl text-balance text-center text-7xl max-md:text-5xl">
                <PrismicText field={slice.primary.heading} />
            </h2>

            <p className="max-w-lg text-balance text-center text-lg text-muted">
                <PrismicText field={slice.primary.subheading} />
            </p>

            <div className="mt-12 grid gap-16">
                {caseStudies.map((caseStudy, index) => {
                    if (caseStudy) {
                        return (
                            <div
                                key={caseStudy.id}
                                className="max-md:grid>-cols-1 relative grid grid-cols-3 gap-6 opacity-85 transition-opacity duration-300 ease-in-out hover:cursor-pointer hover:opacity-100 "
                            >
                                <div className="col-span-1 flex flex-col justify-center gap-6">
                                    <h3 className="text-4xl">
                                        <PrismicText
                                            field={caseStudy.data.company}
                                        ></PrismicText>
                                    </h3>
                                    <div className="max-w-md">
                                        <PrismicRichText
                                            field={caseStudy.data.description}
                                        ></PrismicRichText>
                                    </div>

                                    <PrismicNextLink
                                        document={caseStudy}
                                        className="after:absolute after:inset-0 hover:underline"
                                    >
                                        <span>
                                            {slice.items[index]?.link_text}
                                            &nbsp;
                                        </span>
                                        <PrismicText
                                            field={caseStudy.data.company}
                                        ></PrismicText>
                                    </PrismicNextLink>
                                </div>
                                <PrismicNextImage
                                    className={cn(
                                        "col-span-2 rounded-lg hue-rotate-[185deg] filter",
                                        index % 2 === 1 && "md:-order-1",
                                    )}
                                    quality={100}
                                    field={caseStudy.data.logo_image}
                                ></PrismicNextImage>
                            </div>
                        );
                    }
                })}
            </div>
        </Bounded>
    );
};

export default CaseStudies;
