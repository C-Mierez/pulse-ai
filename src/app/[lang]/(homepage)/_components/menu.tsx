import { LangSwitcher } from "~/components/shared/lang-switcher";
import { Button } from "~/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "~/components/ui/double-sheet";
import { type Locales } from "~/lib/utils";

import type { Content } from "@prismicio/client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import AnimatedMenuMain from "./animated-menu-main";
import AnimatedMenuSide from "./animated-menu-side";

interface MenuProps {
    settings: Content.SettingsDocument;
    locales: Locales;
}

export default function Menu(props: MenuProps) {
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
                        <AnimatedMenuSide settings={props.settings} />
                    }
                >
                    <div className="flex h-full flex-col pt-14">
                        <AnimatedMenuMain settings={props.settings} />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
