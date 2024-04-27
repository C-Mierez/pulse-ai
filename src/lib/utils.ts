import { type Client, type Content } from "@prismicio/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function getLocales(
    doc: Content.AllDocumentTypes,
    client: Client<Content.AllDocumentTypes>,
) {
    // Get the repository
    // If doc has alternate languages, fetch them
    const [repository, altDocs] = await Promise.all([
        client.getRepository(),
        doc.alternate_languages.length > 0
            ? client.getAllByIDs(
                  doc.alternate_languages.map((altLang) => {
                      return altLang.id;
                  }),
                  { lang: "*", fetch: [`${doc.type}.__nonexistent-field__`] },
              )
            : Promise.resolve([]),
    ]);

    // Map the alternate languages to their respective URLs
    return [doc, ...altDocs].map((page) => {
        const lang = repository?.languages.find(
            (language) => language.id === page.lang,
        );

        return {
            lang: lang?.id ?? "",
            url: page?.url ?? "",
            lang_name: lang?.name ?? "",
        };
    });
}

export type Locales = Awaited<ReturnType<typeof getLocales>>;

export const localeLabels = {
    "en-us": "EN",
    "es-ar": "AR",
};
