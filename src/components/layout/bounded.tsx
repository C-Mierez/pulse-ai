import { cn } from "~/lib/utils";

interface BoundedProps {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}

export default function Bounded({
    as: Comp = "section",
    className,
    children,
    ...props
}: BoundedProps) {
    return (
        <Comp
            className={cn(
                "mx-auto max-w-7xl py-24 first:pt-12 max-md:py-12",
                className,
            )}
            {...props}
        >
            {children}
        </Comp>
    );
}
