import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "~/prismicio";
import { components } from "~/slices";
import Bounded from "~/components/layout/bounded";
import PulseGrid from "../../_components/pulse-grid";
import { asText } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export default async function CompanyPage({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
        .getByUID("case_study", params.uid)
        .catch(() => notFound());

    return (
        <article className="relative">
            <PulseGrid />
            <Bounded as={"div"} className="flex flex-col items-center gap-6">
                <div className="grid place-items-center gap-8">
                    <h1 className="text-center text-7xl max-md:text-5xl">
                        <PrismicText field={page.data.company}></PrismicText>
                        <p className="text-lg text-accent">
                            {page.data.article_type}
                        </p>
                    </h1>
                    <p className="max-w-xl text-balance text-center text-xl text-muted">
                        <PrismicText
                            field={page.data.description}
                        ></PrismicText>
                    </p>
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
        .getByUID("case_study", params.uid)
        .catch(() => notFound());

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("case_study");

    return pages.map((page) => {
        return { uid: page.uid };
    });
}