"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>;
};

export const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    {children}
  </button>
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute z-50 min-w-[8rem] rounded-md border bg-white p-1 shadow-md",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DropdownMenuItem.displayName = "DropdownMenuItem";
