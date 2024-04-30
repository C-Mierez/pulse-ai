import { asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicText, SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import Bounded from "~/components/layout/bounded";
import { createClient } from "~/prismicio";
import { components } from "~/slices";

import PulseGrid from "../../_components/pulse-grid";

import type { Metadata } from "next";
import AnimatedHeading from "./_components/animated-heading";
type Params = { uid: string; lang: string };

export default async function CompanyPage({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
        .getByUID("case_study", params.uid, { lang: params.lang })
        .catch(() => notFound());

    return (
        <article className="relative">
            <PulseGrid />
            <Bounded as={"div"} className="flex flex-col items-center gap-6">
                <div className="grid place-items-center gap-8">
                    <AnimatedHeading page={page} />
                    <PrismicNextImage
                        field={page.data.logo_image}
                        className="rounded-lg hue-rotate-[185deg] filter"
                        quality={100}
                    ></PrismicNextImage>
                </div>
                <div className="mx-auto">
                    <SliceZone
                        slices={page.data.slices}
                        components={components}
                    />
                </div>
            </Bounded>
        </article>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("case_study", params.uid, { lang: params.lang })
        .catch(() => notFound());

    return {
        title: `${page.data.meta_title ?? asText(page.data.company) + " Case Study"}`,
        description: page.data.meta_description,
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("case_study", { lang: "*" });

    return pages.map((page) => {
        return { uid: page.uid };
    });
}
