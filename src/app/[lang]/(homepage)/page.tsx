import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { createClient } from "~/prismicio";
import { components } from "~/slices";

import type { Metadata } from "next";
type Params = { uid: string; lang: string };
// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const home = await client.getByUID("page", "home", { lang: params.lang });

    return {
        title: prismic.asText(home.data.title),
        description: home.data.meta_description,
        openGraph: {
            title: home.data.meta_title ?? undefined,
            images: [{ url: home.data.meta_image.url ?? "" }],
        },
    };
}

export default async function Index({ params }: { params: { lang: string } }) {
    // The client queries content from the Prismic API
    const client = createClient();
    const home = await client.getByUID("page", "home", { lang: params.lang });

    return (
        <>
            <SliceZone slices={home.data.slices} components={components} />
        </>
    );
}
