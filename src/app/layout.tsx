import "~/styles/globals.css";

import { Gabarito } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "~/prismicio";
import { Providers } from "./providers";

const gabarito = Gabarito({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "Pulse.AI",
    description: "Prismic CMS with Next.JS",
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
                <Providers>{children}</Providers>
            </body>
            <PrismicPreview repositoryName={repositoryName} />
        </html>
    );
}
