import { CreateButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useCreateButton, useTranslation } from "@refinedev/core";
import { SquarePlusIcon } from "lucide-react";
import type { FC } from "react";

export const CreateButton: FC<CreateButtonProps> = ({
    resource,
    hideText = false,
    accessControl,
    meta,
    onClick,
    children,
    ...props
}) => {
    const { translate } = useTranslation();
    const { hidden, disabled, label, title, LinkComponent, to } =
        useCreateButton({
            resource,
            accessControl,
            meta,
        });

    const translatedLabel = translate("buttons.create", "Create");

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
                <SquarePlusIcon className="mr-2 size-4" />
                {!hideText && (children ?? label ?? translatedLabel)}
            </Button>
        </LinkComponent>
    );
};

CreateButton.displayName = "CreateButton";
