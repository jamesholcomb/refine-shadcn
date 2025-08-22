import { ListButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useListButton, useTranslation } from "@refinedev/core";
import { ListIcon } from "lucide-react";
import type { FC } from "react";

export const ListButton: FC<ListButtonProps> = ({
    resource: resourceNameFromProps,
    hideText = false,
    accessControl,
    meta,
    children,
    onClick,
    ...props
}) => {
    const { translate } = useTranslation();
    const { hidden, disabled, label, title, LinkComponent, to } = useListButton(
        {
            resource: resourceNameFromProps,
            accessControl,
            meta,
        },
    );

    const translatedLabel = translate("buttons.list", "List");

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
                disabled={disabled}
                title={title}
                {...props}
            >
                <ListIcon className="mr-2 size-4" />
                {!hideText && (children ?? label ?? translatedLabel)}
            </Button>
        </LinkComponent>
    );
};

ListButton.displayName = "ListButton";
