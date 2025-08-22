import { SaveButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { Slot } from "@radix-ui/react-slot";
import { CanAccess, useSaveButton } from "@refinedev/core";
import { SaveIcon } from "lucide-react";
import type { FC } from "react";

export const SaveButton: FC<SaveButtonProps> = ({
    hideText = false,
    children,
    accessControl,
    access,
    resource,
    recordItemId,
    ...props
}) => {
    const { label } = useSaveButton();
    const Com = !accessControl?.enabled ? Slot : CanAccess;

    if (accessControl?.hideIfUnauthorized && accessControl.enabled) {
        return null;
    }

    return (
        <Com
            params={{
                id: recordItemId,
            }}
            resource={resource}
            action="save"
            {...access}
        >
            <Button {...props}>
                <SaveIcon className="mr-2 size-4" />
                {!hideText && (children ?? label)}
            </Button>
        </Com>
    );
};

SaveButton.displayName = "SaveButton";
