import { setServerContext } from "~/lib/server-context";
import Footer from "./_components/footer";
import Header from "./_components/header";

interface HomepageLayoutProps {
    params: { lang: string };
    children: React.ReactNode;
}

export default function HomepageLayout({
    params,
    children,
}: HomepageLayoutProps) {
    setServerContext("lang", params.lang);
    return (
        <>
            <Header />
            <main className="min-h-[100lvh]">{children}</main>
            <Footer />
        </>
    );
}
