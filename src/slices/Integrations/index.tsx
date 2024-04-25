import { Content } from "@prismicio/client";
import {
    PrismicRichText,
    PrismicText,
    SliceComponentProps,
} from "@prismicio/react";
import Image from "next/image";
import StarBackground from "~/app/(homepage)/_components/start-background";
import Bounded from "~/components/layout/bounded";
import background from "./background.jpg";
import React from "react";
import StylizedLogo from "~/components/svg/stylized-logo";
import {
    CodeSandboxLogoIcon,
    FigmaLogoIcon,
    FramerLogoIcon,
    GitHubLogoIcon,
    LinkedInLogoIcon,
    ModulzLogoIcon,
    VercelLogoIcon,
} from "@radix-ui/react-icons";
import { cn } from "~/lib/utils";

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
    const icons = {
        linkedin: <LinkedInLogoIcon className="size-6 md:size-9 lg:size-12" />,
        modulz: <ModulzLogoIcon className="size-6 md:size-9 lg:size-12" />,
        github: <GitHubLogoIcon className="size-6 md:size-9 lg:size-12" />,
        figma: <FigmaLogoIcon className="size-6 md:size-9 lg:size-12" />,
        sandbox: (
            <CodeSandboxLogoIcon className="size-6 md:size-9 lg:size-12" />
        ),
        framer: <FramerLogoIcon className="size-6 md:size-9 lg:size-12" />,
    };

    return (
        <section className="relative overflow-clip">
            <Image
                className="absolute h-full w-full object-cover hue-rotate-[180deg] filter"
                src={background}
                alt="background"
                quality={90}
            ></Image>

            <StarBackground />

            <Bounded
                as={"div"}
                className="relative flex flex-col items-center gap-8"
                data-slice-type={slice.slice_type}
                data-slice-variation={slice.variation}
            >
                <div className="relative flex flex-col items-center gap-8">
                    <h2 className="max-w-2xl text-balance text-center text-7xl max-md:text-5xl">
                        <PrismicText field={slice.primary.heading} />
                    </h2>

                    <p className="max-w-lg text-balance text-center text-lg text-muted">
                        <PrismicText field={slice.primary.subheading} />
                    </p>

                    <div className="mt-20 flex items-center max-md:flex-col">
                        {slice.items.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {index ===
                                        Math.floor(slice.items.length / 2) && (
                                        <>
                                            <div className="hue-rotate-[185deg] filter">
                                                <StylizedLogo />
                                            </div>
                                            <div className="signal-line rotate-180 bg-gradient-to-t"></div>
                                        </>
                                    )}
                                    <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-primary-300/50 bg-primary-300/50 p-3 text-3xl text-foreground opacity-50 md:text-4xl lg:text-5xl">
                                        {item.icon && icons[item.icon]}
                                    </div>

                                    {index !== slice.items.length - 1 && (
                                        <div
                                            className={cn(
                                                "signal-line",
                                                index >=
                                                    Math.floor(
                                                        slice.items.length / 2,
                                                    )
                                                    ? "rotate-180"
                                                    : "",
                                            )}
                                        ></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </Bounded>
        </section>
    );
};

export default Integrations;
