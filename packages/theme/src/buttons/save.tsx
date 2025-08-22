import { SaveButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useSaveButton, useCan } from "@refinedev/core";
import { SaveIcon } from "lucide-react";
import type { FC } from "react";

export const SaveButton: FC<SaveButtonProps> = ({
    hideText = false,
    children,
    accessControl,
    resource,
    recordItemId,
    ...props
}) => {
    const { label } = useSaveButton();
    
    const { data } = useCan({
        resource,
        action: "save",
        params: { id: recordItemId },
    });

    if (accessControl?.hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Button icon={<SaveIcon className="mr-2 w-4 h-4" />} {...props}>
            {!hideText && (children ?? label)}
        </Button>
    );
};

SaveButton.displayName = "SaveButton";
