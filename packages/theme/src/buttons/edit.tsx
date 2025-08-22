import { EditButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useEditButton, useTranslation } from "@refinedev/core";
import { SquarePenIcon } from "lucide-react";
import type { FC } from "react";

export const EditButton: FC<EditButtonProps> = ({
    resource,
    recordItemId,
    hideText = false,
    accessControl,
    meta,
    onClick,
    children,
    ...props
}) => {
    const { translate } = useTranslation();
    const { hidden, disabled, label, title, LinkComponent, to } = useEditButton(
        {
            resource,
            id: recordItemId,
            accessControl,
            meta,
        },
    );

    const translatedLabel = translate("buttons.edit", "Edit");

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
                <SquarePenIcon className="mr-2 size-4" />
                {!hideText && (children ?? label ?? translatedLabel)}
            </Button>
        </LinkComponent>
    );
};

EditButton.displayName = "EditButton";
