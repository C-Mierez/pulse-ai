"use client";

import { asLink } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ButtonCTA from "~/components/shared/button-cta";
import { LangSwitcher } from "~/components/shared/lang-switcher";
import { Button } from "~/components/ui/button";
import { cn, type Locales } from "~/lib/utils";

interface MenuProps {
    settings: Content.SettingsDocument;
    locales: Locales;
}

export default function Menu(props: MenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            <div className="flex items-center px-4 md:hidden">
                <LangSwitcher locales={props.locales} />
            </div>
            <Button
                size={"icon"}
                variant={"outline"}
                className="md:hidden"
                aria-expanded={isOpen}
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                <HamburgerMenuIcon className="size-5" />
                <span className="sr-only">Open Menu</span>
            </Button>

            <div
                className={cn(
                    "fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-6 bg-background p-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
                    isOpen ? "translate-x-0" : "translate-x-full",
                )}
            >
                <Button
                    size={"icon"}
                    variant={"outline"}
                    className="md:hidden"
                    aria-expanded={isOpen}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                >
                    <Cross1Icon className="size-5" />
                    <span className="sr-only">Open Menu</span>
                </Button>

                <ul className="grid w-full justify-items-center gap-8">
                    {props.settings.data.navigation.map((item, index) => {
                        // Return a CTA styled button if the item is marked as CTA
                        if (item.cta_button)
                            return (
                                <li key={index}>
                                    <ButtonCTA
                                        field={item.link}
                                        aria-current={
                                            pathname.includes(
                                                asLink(item.link) as string,
                                            )
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        {item.label}
                                    </ButtonCTA>
                                </li>
                            );

                        return (
                            <li key={index}>
                                <PrismicNextLink
                                    field={item.link}
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                    aria-current={
                                        pathname.includes(
                                            asLink(item.link) as string,
                                        )
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {item.label}
                                </PrismicNextLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
