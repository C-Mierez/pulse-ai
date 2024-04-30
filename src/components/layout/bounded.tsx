import React from "react";
import { cn } from "~/lib/utils";

interface BoundedProps extends React.BaseHTMLAttributes<HTMLDivElement> {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}

const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({ as: Comp = "section", className, children, ...props }, ref) => {
        return (
            <Comp
                className={cn(
                    "mx-auto max-w-7xl py-24 first:pt-12 max-md:px-4 max-md:py-12",
                    className,
                )}
                ref={ref}
                {...props}
            >
                {children}
            </Comp>
        );
    },
);

export default Bounded;
