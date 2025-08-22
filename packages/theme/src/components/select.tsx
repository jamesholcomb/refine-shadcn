"use client";

import {
    FormControl,
    SelectContent,
    SelectItem,
    SelectTrigger,
    Select as SelectUI,
    SelectValue,
} from "@/ui";
// Import individual types to avoid internal type exposure
import type { 
    SelectProps as RadixSelectProps,
    SelectValueProps,
} from "@radix-ui/react-select";
import { BaseOption } from "@refinedev/core";
import React, { forwardRef } from "react";

export interface SelectProps {
    placeholder?: string;
    emptyMessage?: string;
    onChange?: (value: string) => void;
    options?: BaseOption[];
    disabled?: boolean;
    value?: string;
    defaultValue?: string;
    name?: string;
    required?: boolean;
}

export const Select = forwardRef<
    HTMLDivElement,
    SelectProps
>(({ ...props }, ref) => {
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    return (
        <SelectUI
            disabled={props.disabled || props.options?.length === 0}
            onValueChange={props.onChange}
            defaultValue={props.value}
            value={props.value}
        >
            <FormControl>
                <SelectTrigger ref={triggerRef}>
                    <SelectValue placeholder={props.placeholder ?? "Select"} />
                </SelectTrigger>
            </FormControl>
            <SelectContent
                style={{
                    width: triggerRef.current?.offsetWidth,
                }}
                ref={ref}
            >
                {props.options?.map((option, key: number) => (
                    <SelectItem key={key} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectUI>
    );
});

Select.displayName = "Select";
