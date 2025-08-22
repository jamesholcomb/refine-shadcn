import { RefreshButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useRefreshButton, useCan } from "@refinedev/core";
import { RefreshCwIcon } from "lucide-react";
import type { FC } from "react";

export const RefreshButton: FC<RefreshButtonProps> = ({
    resource,
    recordItemId,
    hideText = false,
    dataProviderName,
    accessControl,
    children,
    ...props
}) => {
    const { onClick, label, loading } = useRefreshButton({
        resource,
        id: recordItemId,
        dataProviderName,
    });

    const { data } = useCan({
        resource,
        action: "list",
        params: { id: recordItemId },
    });

    if (accessControl?.hideIfUnauthorized && !data?.can) {
        return null;
    }

    return (
        <Button
            onClick={onClick}
            loading={loading}
            icon={<RefreshCwIcon className="mr-2 w-4 h-4" />}
            {...props}
        >
            {!hideText && (children ?? label)}
        </Button>
    );
};

RefreshButton.displayName = "RefreshButton";
