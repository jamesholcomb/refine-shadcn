import { ShowButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useShowButton, useTranslation } from "@refinedev/core";
import { EyeIcon } from "lucide-react";
import type { FC } from "react";

export const ShowButton: FC<ShowButtonProps> = ({
    resource: resourceNameFromProps,
    recordItemId,
    hideText = false,
    accessControl,
    meta,
    children,
    onClick,
    ...props
}) => {
    const { translate } = useTranslation();
    const { to, label, title, hidden, disabled, LinkComponent } = useShowButton(
        {
            resource: resourceNameFromProps,
            id: recordItemId,
            accessControl,
            meta,
        },
    );

    const translatedLabel = translate("buttons.show", "Show");

    if (hidden) return null;

    return (
        <LinkComponent
            to={to}
            replace={false}
            onClick={(e: React.PointerEvent<HTMLButtonElement>) => {
                if (disabled) {
                    e.preventDefault();
                    return;
                }
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
        >
            <Button
                title={title}
                disabled={disabled}
                {...props}>
                <EyeIcon className="mr-2 size-4" />
                {!hideText && (children ?? label ?? translatedLabel)}
            </Button>
        </LinkComponent>
    );
};

ShowButton.displayName = "ShowButton";
