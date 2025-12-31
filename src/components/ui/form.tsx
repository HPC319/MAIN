"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      />
    );
  }
);

Form.displayName = "Form";

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      />
    );
  }
);

FormItem.displayName = "FormItem";
