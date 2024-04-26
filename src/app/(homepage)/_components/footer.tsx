import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Branding from "~/components/shared/branding";
import { createClient } from "~/prismicio";

export default async function Footer() {
    const prismicClient = createClient();
    const settings = await prismicClient.getSingle("settings");

    return (
        <footer className="border-t border-border p-4">
            <nav
                className="flex items-center justify-between gap-4 max-md:flex-col"
                aria-label="Footer"
            >
                <Link className="flex gap-2" href={"/"}>
                    <Branding />
                    <span className="sr-only">Pulse.AI Home Page</span>
                </Link>
                <ul className="flex items-center gap-2 font-medium max-md:flex-col">
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
