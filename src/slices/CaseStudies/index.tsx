import Bounded from "~/components/layout/bounded";
import { createClient } from "~/prismicio";

import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicText } from "@prismicio/react";

import AnimatedHeading from "../Bento/animated-heading";
import AnimatedCards from "./animated-cards";

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

    const caseStudies: Array<Content.CaseStudyDocument | undefined> =
        await Promise.all(
            slice.items.map(async (item) => {
                if (isFilled.contentRelationship(item.case_study)) {
                    return await client.getByUID<Content.CaseStudyDocument>(
                        "case_study",
                        item.case_study.uid!,
                        { lang: item.case_study.lang },
                    );
                }
            }),
        );

    return (
        <section className="overflow-hidden">
            <Bounded
                as={"div"}
                className="flex flex-col items-center gap-8"
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
            >
                <h2 className="max-w-2xl text-balance text-center text-7xl max-md:text-4xl">
                    <PrismicText field={slice.primary.heading} />
                </h2>

                <AnimatedHeading>
                    <p className="max-w-lg text-balance text-center text-lg text-muted">
                        <PrismicText field={slice.primary.subheading} />
                    </p>
                </AnimatedHeading>

                <div className="mt-12 grid gap-16">
                    {caseStudies.map((caseStudy, index) => {
                        if (caseStudy) {
                            return (
                                <AnimatedCards
                                    key={caseStudy.id}
                                    slice={slice}
                                    index={index}
                                    caseStudy={caseStudy}
                                />
                            );
                        }
                    })}
                </div>
            </Bounded>
        </section>
    );
};

export default CaseStudies;
