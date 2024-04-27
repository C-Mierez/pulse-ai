import { PrismicNextLink } from "@prismicio/next";
import { localeLabels, type Locales } from "~/lib/utils";

interface CurrentLangProps {
    locales: Locales;
}

export const CurrentLang = ({ locales }: CurrentLangProps) => {
    const locale = locales[0];
    return (
        <ul className="flex h-6 gap-3 px-2">
            {locale && (
                <li
                    key={locale.lang}
                    className="flex items-start first:font-semibold"
                >
                    <PrismicNextLink
                        href={locale.url}
                        locale={locale.lang}
                        aria-label={`Change language to ${locale.lang_name}`}
                        className="text-xs"
                    >
                        {localeLabels[
                            locale.lang as keyof typeof localeLabels
                        ] || locale.lang}
                    </PrismicNextLink>
                </li>
            )}
        </ul>
    );
};
