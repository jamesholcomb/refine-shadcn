import { ImportButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useImportButton, useCan } from "@refinedev/core";
import { ImportIcon } from "lucide-react";
import type { FC } from "react";

export const ImportButton: FC<ImportButtonProps> = ({
    hideText = false,
    resource,
    onChange,
    accept = "image/*,application/*",
    recordItemId,
    accessControl,
    children,
    ...props
}) => {
    const { label } = useImportButton();
    
    const { data } = useCan({
        resource,
        action: "import",
        params: { id: recordItemId },
    });

    const onClick = () => {
        const el = document.createElement("input");
        el.type = "file";
        el.accept = accept;
        el.onchange = (e) => {
            if (e.target instanceof HTMLInputElement) {
                onChange(Array.from(e.target.files ?? []));
                el.remove();
            }
        };
        el.click();
    };

    if (accessControl?.hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Button
            onClick={onClick}
            icon={<ImportIcon className="mr-2 w-4 h-4" />}
            {...props}
        >
            {!hideText && (children ?? label)}
        </Button>
    );
};

ImportButton.displayName = "ImportButton";
