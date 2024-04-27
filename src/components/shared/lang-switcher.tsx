import { PrismicNextLink } from "@prismicio/next";
import type { Locales } from "~/lib/utils";

interface LangSwitcherProps {
    locales: Locales;
}

const localeLabels = {
    "en-us": "EN",
    "es-ar": "AR",
};

export const LangSwitcher = ({ locales }: LangSwitcherProps) => (
    <div className="flex flex-wrap gap-3">
        <span aria-hidden>🌐</span>
        <ul className="flex flex-wrap gap-3">
            {locales.map((locale) => (
                <li key={locale.lang} className="first:font-semibold">
                    <PrismicNextLink
                        href={locale.url}
                        locale={locale.lang}
                        aria-label={`Change language to ${locale.lang_name}`}
                    >
                        {localeLabels[
                            locale.lang as keyof typeof localeLabels
                        ] || locale.lang}
                    </PrismicNextLink>
                </li>
            ))}
        </ul>
    </div>
);
