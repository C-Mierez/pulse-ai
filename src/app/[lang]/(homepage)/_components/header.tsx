import { createClient } from "~/prismicio";

import Navbar from "./navbar";
import { getServerContext } from "~/lib/server-context";
import { getLocales, type Locales } from "~/lib/utils";

export default async function Header() {
    const lang = getServerContext("lang");

    const client = createClient();
    const settings = await client.getSingle("settings", { lang: lang });
    const home = await client.getByUID("page", "home", { lang: lang });

    const locales: Locales = await getLocales(home, client);

    return (
        <header className="sticky top-0 z-40 border-b border-primary-900/40 bg-primary-900/40 p-4 backdrop-blur-md">
            <Navbar settings={settings} locales={locales} />
        </header>
    );
}
