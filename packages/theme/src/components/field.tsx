"use client";

import {
    FormControl,
    FormDescription,
    FormField as FormFieldUI,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/ui/form";
import type {
    ControllerProps,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
} from "react-hook-form";

type Props<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    control: ControllerProps<TFieldValues, TName>["control"];
    name: ControllerProps<TFieldValues, TName>["name"];
    label: string;
    children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;
    description?: string;
    className?: string;
};

export const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
    props: Props<TFieldValues, TName>
) => {
    return (
        <FormFieldUI
            control={props.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className={props.className}>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>{props.children(field)}</FormControl>
                    {props.description && <FormDescription>{props.description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

FormField.displayName = "FormField";

export const Field = FormField;
