import { createClient } from "~/prismicio";

import Navbar from "./navbar";

export default async function Header() {
    const prismicClient = createClient();
    const settings = await prismicClient.getSingle("settings");

    return (
        <header className="p-4">
            <Navbar settings={settings} />
        </header>
    );
}
