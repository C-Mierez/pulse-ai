import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Branding from "~/components/shared/branding";
import ButtonCTA from "~/components/shared/button-cta";

import Menu from "./menu";

import type { Content } from "@prismicio/client";
interface NavbarProps {
    settings: Content.SettingsDocument;
}

export default function Navbar(props: NavbarProps) {
    return (
        <nav
            className="mx-auto flex max-w-7xl items-center justify-between gap-2 font-medium"
            aria-label="Main Navigation"
        >
            <div className="flex flex-1 items-center justify-between">
                <Link className="z-50 flex gap-2" href={"/"}>
                    <Branding />
                    <span className="sr-only">Pulse.AI Home Page</span>
                </Link>
                <Menu settings={props.settings} />
            </div>

            <ul className="flex items-center gap-4 max-md:hidden max-md:flex-col">
                {props.settings.data.navigation.map((item) => {
                    // Return a CTA styled button if the item is marked as CTA
                    if (item.cta_button)
                        return (
                            <ButtonCTA key={item.label} field={item.link}>
                                {item.label}
                            </ButtonCTA>
                        );

                    return (
                        <li key={item.label}>
                            <PrismicNextLink
                                field={item.link}
                                className="inline-flex min-h-11 items-center"
                            >
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
