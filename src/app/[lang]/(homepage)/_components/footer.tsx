import Link from "next/link";
import Magnetic from "~/components/layout/magnetic";
import Branding from "~/components/shared/branding";
import { LangSwitcher } from "~/components/shared/lang-switcher";
import ScrollIndicator from "~/components/shared/scroll-indicator";
import { getServerContext } from "~/lib/server-context";
import { getLocales, type Locales } from "~/lib/utils";
import { createClient } from "~/prismicio";

import { PrismicNextLink } from "@prismicio/next";
import {
    DesktopIcon,
    GitHubLogoIcon,
    TwitterLogoIcon,
} from "@radix-ui/react-icons";

export default async function Footer() {
    const lang = getServerContext("lang");

    const client = createClient();
    const settings = await client.getSingle("settings", { lang: lang });
    const home = await client.getByUID("page", "home", { lang: lang });

    const locales: Locales = await getLocales(home, client);

    const socials = {
        github: <GitHubLogoIcon className="size-5" />,
        twitter: <TwitterLogoIcon className="size-5" />,
        youtube: <DesktopIcon className="size-5" />,
    };

    return (
        <footer className="relative border-t border-border p-4">
            <nav
                className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-between gap-4 max-md:grid-cols-1"
                aria-label="Footer"
            >
                <Link
                    className="flex flex-col items-start max-md:order-2 max-md:items-center"
                    href={"/"}
                >
                    <Branding />
                    <p className="mt-2 text-center text-xs font-extralight text-muted">
                        © 2024 Pulse.AI, Inc. All rights reserved.
                    </p>
                    <span className="sr-only">Pulse.AI Home Page</span>
                </Link>
                <ul className="flex w-fit justify-self-center max-md:-order-1">
                    {settings.data.socials.map((item) => (
                        <Magnetic key={item.socials} strength={0.5}>
                            <li>
                                <PrismicNextLink
                                    field={item.link}
                                    className="block rounded-lg p-3 transition-colors duration-200 ease-in-out hover:text-accent-light/85"
                                >
                                    <span className="sr-only">
                                        {item.socials}
                                    </span>
                                    {item.socials && socials[item.socials]}
                                </PrismicNextLink>
                            </li>
                        </Magnetic>
                    ))}
                </ul>
                <ul className="flex items-center gap-6 font-medium  max-md:flex-col max-md:gap-2 max-md:rounded-lg max-md:border max-md:border-border max-md:bg-primary-300/5 max-md:py-4 md:justify-self-end">
                    {settings.data.navigation.map((item) => (
                        <li key={item.label}>
                            <PrismicNextLink
                                field={item.link}
                                className="hover-glow inline-flex min-h-8 w-max items-center opacity-80"
                            >
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    ))}
                    <LangSwitcher invert={true} locales={locales} />
                </ul>
            </nav>
            <ScrollIndicator settings={settings} />
        </footer>
    );
}
