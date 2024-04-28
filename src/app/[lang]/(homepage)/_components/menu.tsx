import { PrismicNextLink } from "@prismicio/next";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { LangSwitcher } from "~/components/shared/lang-switcher";
import { Button } from "~/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "~/components/ui/double-sheet";
import { type Locales, socials } from "~/lib/utils";

import type { Content } from "@prismicio/client";
interface MenuProps {
    settings: Content.SettingsDocument;
    locales: Locales;
}

export default function Menu(props: MenuProps) {
    const cta = props.settings.data.navigation.at(
        props.settings.data.navigation.length - 1,
    );

    return (
        <div className="flex flex-1 items-center justify-end">
            {/* /* -------------------------------- Language -------------------------------- */}
            <div className="flex items-center px-4 md:hidden">
                <LangSwitcher locales={props.locales} />
            </div>

            {/* /* ------------------------------- Menu Button ------------------------------ */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size={"icon"}
                        variant={"outline"}
                        className="md:hidden"
                    >
                        <HamburgerMenuIcon className="size-5" />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    sideChildren={
                        <div className="flex h-full flex-col justify-between p-4">
                            <div className="text-vertical align-middle">
                                <h1 className="text-7xl font-bold uppercase text-accent">
                                    Pulse
                                    <span className="text-foreground">
                                        .Menu
                                    </span>
                                </h1>
                            </div>
                            <ul className="flex w-full flex-col items-end justify-center">
                                {props.settings.data.socials.map((item) => (
                                    <li key={item.socials}>
                                        <PrismicNextLink
                                            field={item.link}
                                            className="block rounded-lg p-3 transition-colors duration-200 ease-in-out hover:text-accent-light/85"
                                        >
                                            <span className="sr-only">
                                                {item.socials}
                                            </span>
                                            {item.socials &&
                                                socials[item.socials]}
                                        </PrismicNextLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                >
                    <div className="flex h-full flex-col pt-14">
                        <div className="flex h-full max-h-full flex-col justify-between">
                            <ul className="overflow-y-scroll">
                                <li>
                                    <SheetClose asChild>
                                        <PrismicNextLink
                                            field={props.settings.data.root}
                                            className="block border-b-2 border-b-background/15 p-4 py-3 text-2xl font-bold text-background hover:bg-accent-light active:bg-accent-light"
                                        >
                                            Home
                                        </PrismicNextLink>
                                    </SheetClose>
                                </li>
                                {props.settings.data.navigation.map((item) => {
                                    // Skip CTA Button
                                    if (item.cta_button) return null;

                                    return (
                                        <li key={item.label}>
                                            <SheetClose asChild>
                                                <PrismicNextLink
                                                    field={item.link}
                                                    className="block border-b-2 border-b-background/15 p-4 py-3 text-2xl font-bold text-background hover:bg-accent-light active:bg-accent-light"
                                                >
                                                    {item.label}
                                                </PrismicNextLink>
                                            </SheetClose>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="p-4">
                                {!!cta && (
                                    <PrismicNextLink
                                        field={cta.link}
                                        className="block rounded-lg bg-background p-4 py-3 text-center text-2xl font-bold text-foreground"
                                    >
                                        {cta.label}
                                    </PrismicNextLink>
                                )}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
