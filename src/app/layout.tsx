import "~/styles/globals.css";

import { Gabarito } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "~/prismicio";
import Footer from "./(homepage)/_components/footer";
import Header from "./(homepage)/_components/header";

const gabarito = Gabarito({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Create T3 App",
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`font-sans ${gabarito.variable}`}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
            <PrismicPreview repositoryName={repositoryName} />
        </html>
    );
}
