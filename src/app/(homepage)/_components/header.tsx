import Link from "next/link";
import Branding from "~/components/shared/branding";
import SiteLogo from "~/components/svg/site-logo";
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
