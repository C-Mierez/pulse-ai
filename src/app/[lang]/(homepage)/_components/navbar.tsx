import { PrismicNextLink } from "@prismicio/next";
import Branding from "~/components/shared/branding";
import ButtonCTA from "~/components/shared/button-cta";
import type { Locales } from "~/lib/utils";

import Menu from "./menu";

import type { Content } from "@prismicio/client";
import { CurrentLang } from "~/components/shared/current-lang";
import { LangSwitcher } from "~/components/shared/lang-switcher";
interface NavbarProps {
    settings: Content.SettingsDocument;
    locales: Locales;
}

export default async function Navbar(props: NavbarProps) {
    return (
        <nav
            className="mx-auto flex max-w-7xl items-center justify-between gap-2 font-medium"
            aria-label="Main Navigation"
        >
            {/* /* -------------------------------- Branding -------------------------------- */}
            <div className="flex flex-1 items-center">
                {/* Homepage Link */}
                <PrismicNextLink
                    className="z-50 flex"
                    field={props.settings.data.root}
                >
                    <span className="sr-only">Pulse.AI Home Page</span>
                    <Branding />
                    <CurrentLang locales={props.locales} />
                </PrismicNextLink>

                {/* Mobile Menu */}
                <Menu settings={props.settings} locales={props.locales} />
            </div>

            {/* /* -------------------------------- Navigation -------------------------------- */}
            <ul className="flex items-stretch gap-4 max-md:hidden max-md:flex-col">
                {props.settings.data.navigation.map((item) => {
                    // Return a CTA styled button if the item is marked as CTA
                    if (item.cta_button)
                        return (
                            <ButtonCTA
                                key={item.label}
                                prismic={{ field: item.link }}
                                size={"stretchMd"}
                            >
                                {item.label}
                            </ButtonCTA>
                        );

                    return (
                        <li key={item.label}>
                            <PrismicNextLink
                                field={item.link}
                                className="hover-glow inline-flex min-h-11 items-center opacity-90"
                            >
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    );
                })}

                {/* /* -------------------------------- Language -------------------------------- */}
                <div className="w-[1px] bg-accent-light/50"></div>
                <LangSwitcher locales={props.locales} />
            </ul>
        </nav>
    );
}
