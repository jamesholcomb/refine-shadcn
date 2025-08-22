import { RefreshButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useRefreshButton } from "@refinedev/core";
import { RefreshCwIcon } from "lucide-react";
import type { FC } from "react";

export const RefreshButton: FC<RefreshButtonProps> = ({
    resource,
    recordItemId,
    hideText = false,
    dataProviderName,
    children,
    ...props
}) => {
    const { onClick, label, loading } = useRefreshButton({
        resource,
        id: recordItemId,
        dataProviderName,
    });

    return (
        <Button
            onClick={onClick}
            loading={loading}
            {...props}
        >
            <RefreshCwIcon className="mr-2 size-4" />
            {!hideText && (children ?? label)}
        </Button>
    );
};

RefreshButton.displayName = "RefreshButton";
