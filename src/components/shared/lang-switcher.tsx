"use client";

import { PrismicNextLink } from "@prismicio/next";
import { cn, localeLabels, type Locales } from "~/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { GlobeIcon } from "@radix-ui/react-icons";

interface LangSwitcherProps {
    locales: Locales;
    invert?: boolean;
}

export const LangSwitcher = ({
    locales,
    invert = false,
}: LangSwitcherProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger className="text-accent-light/80 transition-colors duration-200 ease-in-out hover:text-foreground">
            <GlobeIcon className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
            sideOffset={6}
            className={cn("rounded-lg py-1", invert && "flex flex-col-reverse")}
            onCloseAutoFocus={(e) => e.preventDefault()}
        >
            {locales.map((locale, index) => {
                return (
                    <PrismicNextLink
                        key={locale.lang}
                        href={locale.url}
                        locale={locale.lang}
                        aria-label={`Change language to ${locale.lang_name}`}
                    >
                        <DropdownMenuItem
                            className={cn(
                                "cursor-pointer active:bg-accent",
                                index === 0 && "bg-accent/80",
                            )}
                        >
                            {localeLabels[
                                locale.lang as keyof typeof localeLabels
                            ] || locale.lang}
                        </DropdownMenuItem>
                    </PrismicNextLink>
                );
            })}
        </DropdownMenuContent>
    </DropdownMenu>
);
