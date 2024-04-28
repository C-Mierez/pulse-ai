"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";
import { Button } from "./button";

const DoubleSheet = SheetPrimitive.Root;

const DoubleSheetTrigger = SheetPrimitive.Trigger;

const DoubleSheetClose = SheetPrimitive.Close;

const DoubleSheetPortal = SheetPrimitive.Portal;

const DoubleSheetOverlay = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Overlay
        className={cn(
            "fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className,
        )}
        {...props}
        ref={ref}
    />
));
DoubleSheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const doubleSheetVariants = cva(
    [
        "fixed inset-0 z-50 h-full w-full shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=closed]:animate-out",
        "[&>div]:absolute [&>div]:inset-y-0",
        "[&>#side]:data-[state=closed]:duration-300 [&>#side]:data-[state=open]:duration-500 [&>#side]:data-[state=open]:animate-in [&>#side]:data-[state=closed]:animate-out",
        "[&>#main]:data-[state=closed]:duration-300 [&>#main]:data-[state=open]:duration-500 [&>#main]:data-[state=open]:animate-in [&>#main]:data-[state=closed]:animate-out",
    ],
    {
        variants: {
            side: {
                right: [
                    "[&>#side]:left-0 [&>#side]:w-[35%] [&>#side]:bg-background [&>#side]:data-[state=closed]:slide-out-to-left [&>#side]:data-[state=open]:slide-in-from-left",
                    "[&>#main]:right-0 [&>#main]:w-[65%] [&>#main]:bg-accent [&>#main]:data-[state=closed]:slide-out-to-right [&>#main]:data-[state=open]:slide-in-from-right",
                ],
            },
        },
        defaultVariants: {
            side: "right",
        },
    },
);

interface DoubleSheetContentProps
    extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
        VariantProps<typeof doubleSheetVariants> {
    sideChildren: React.ReactNode;
}

const DoubleSheetContent = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Content>,
    DoubleSheetContentProps
>(({ side = "right", className, children, sideChildren, ...props }, ref) => (
    <DoubleSheetPortal>
        <DoubleSheetOverlay />
        <SheetPrimitive.Content
            ref={ref}
            className={cn(doubleSheetVariants({ side }), className)}
            {...props}
        >
            <div id="side">{sideChildren}</div>
            <div id="main">{children}</div>
            <SheetPrimitive.Close
                asChild
                className="absolute right-4 top-4 rounded-lg outline-none disabled:pointer-events-none"
            >
                <Button size={"icon"} variant={"outline"}>
                    <Cross1Icon className="size-5" />
                    <span className="sr-only">Close Menu</span>
                </Button>
            </SheetPrimitive.Close>
        </SheetPrimitive.Content>
    </DoubleSheetPortal>
));
DoubleSheetContent.displayName = SheetPrimitive.Content.displayName;

const DoubleSheetHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className,
        )}
        {...props}
    />
);
DoubleSheetHeader.displayName = "DoubleSheetHeader";

const DoubleSheetFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className,
        )}
        {...props}
    />
);
DoubleSheetFooter.displayName = "DoubleSheetFooter";

const DoubleSheetTitle = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Title
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
));
DoubleSheetTitle.displayName = SheetPrimitive.Title.displayName;

const DoubleSheetDescription = React.forwardRef<
    React.ElementRef<typeof SheetPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
    <SheetPrimitive.Description
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
DoubleSheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
    DoubleSheet as Sheet,
    DoubleSheetPortal as SheetPortal,
    DoubleSheetOverlay as SheetOverlay,
    DoubleSheetTrigger as SheetTrigger,
    DoubleSheetClose as SheetClose,
    DoubleSheetContent as SheetContent,
    DoubleSheetHeader as SheetHeader,
    DoubleSheetFooter as SheetFooter,
    DoubleSheetTitle as SheetTitle,
    DoubleSheetDescription as SheetDescription,
};
