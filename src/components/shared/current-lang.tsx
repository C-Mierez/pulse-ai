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
                    className="flex items-start text-xs first:font-semibold"
                    aria-label={`Language ${locale.lang_name}`}
                >
                    {localeLabels[locale.lang as keyof typeof localeLabels] ||
                        locale.lang}
                </li>
            )}
        </ul>
    );
};
