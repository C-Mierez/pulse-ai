import type { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
    PrismicRichText,
    SliceComponentProps,
    JSXMapSerializer,
} from "@prismicio/react";
import Image from "next/image";
import Bounded from "~/components/layout/bounded";

const components: JSXMapSerializer = {
    hyperlink: ({ node, children }) => {
        return <PrismicNextLink field={node.data}>{children}</PrismicNextLink>;
    },
    label: ({ node, children }) => {
        if (node.data.label === "codespan") {
            return <code>{children}</code>;
        }
    },
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
    return (
        <Bounded>
            <div className="prose prose-invert prose-lg prose-neutral max-w-[80ch]">
                <PrismicRichText
                    field={slice.primary.content}
                    components={components}
                />
            </div>
        </Bounded>
    );
};

export default RichText;
