import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Branding from "~/components/shared/branding";
import ButtonCTA from "~/components/shared/button-cta";

interface NavbarProps {
    settings: Content.SettingsDocument;
}

export default function Navbar(props: NavbarProps) {
    return (
        <nav
            className="mx-auto flex max-w-7xl items-center justify-between gap-2 font-medium max-md:flex-col"
            aria-label="Main Navigation"
        >
            <Link className="flex gap-2" href={"/"}>
                <Branding />
                <span className="sr-only">Pulse.AI Home Page</span>
            </Link>
            <ul className="flex items-center gap-4 max-md:flex-col">
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
