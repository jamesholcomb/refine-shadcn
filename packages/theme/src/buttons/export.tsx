import { ExportButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useExportButton, useCan } from "@refinedev/core";
import { ShareIcon } from "lucide-react";
import type { FC } from "react";

export const ExportButton: FC<ExportButtonProps> = ({
    hideText = false,
    resource,
    recordItemId,
    accessControl,
    children,
    ...props
}) => {
    const { label } = useExportButton();
    
    const { data } = useCan({
        resource,
        action: "export",
        params: { id: recordItemId },
    });

    if (accessControl?.hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Button icon={<ShareIcon className="mr-2 w-4 h-4" />} {...props}>
            {!hideText && (children ?? label)}
        </Button>
    );
};

ExportButton.displayName = "ExportButton";
