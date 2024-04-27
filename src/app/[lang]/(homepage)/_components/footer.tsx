import { PrismicNextLink } from "@prismicio/next";
import {
    DesktopIcon,
    GitHubLogoIcon,
    TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import Magnetic from "~/components/layout/magnetic";
import Branding from "~/components/shared/branding";
import { createClient } from "~/prismicio";
import { getServerContext } from "~/lib/server-context";

export default async function Footer() {
    const lang = getServerContext("lang");

    const prismicClient = createClient();
    const settings = await prismicClient.getSingle("settings", { lang: lang });

    const socials = {
        github: <GitHubLogoIcon className="size-7" />,
        twitter: <TwitterLogoIcon className="size-7" />,
        youtube: <DesktopIcon className="size-7" />,
    };

    return (
        <footer className="border-t border-border p-4">
            <nav
                className="mx-auto grid max-w-7xl grid-cols-3 items-center justify-between gap-4 max-md:grid-cols-1"
                aria-label="Footer"
            >
                <Link className="flex flex-col items-start" href={"/"}>
                    <Branding />
                    <p className="mt-2 text-center text-xs font-extralight text-muted">
                        © 2024 Pulse.AI, Inc. All rights reserved.
                    </p>
                    <span className="sr-only">Pulse.AI Home Page</span>
                </Link>
                <ul className="flex w-fit gap-1 justify-self-center">
                    {settings.data.socials.map((item) => (
                        <Magnetic key={item.socials}>
                            <li className="rounded-lg p-4 transition-colors duration-200 ease-in-out hover:text-accent-light/85">
                                <PrismicNextLink field={item.link}>
                                    <span className="sr-only">
                                        {item.socials}
                                    </span>
                                    {item.socials && socials[item.socials]}
                                </PrismicNextLink>
                            </li>
                        </Magnetic>
                    ))}
                </ul>
                <ul className="flex items-center gap-6 font-medium max-md:flex-col md:justify-self-end">
                    {settings.data.navigation.map((item) => (
                        <li key={item.label}>
                            <PrismicNextLink
                                field={item.link}
                                className="inline-flex min-h-8 items-center"
                            >
                                {item.label}
                            </PrismicNextLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    );
}
