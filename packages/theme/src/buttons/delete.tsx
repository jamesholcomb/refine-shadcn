import { DeleteButtonProps } from "@/types";
import { Button } from "@/ui/button";
import { useDeleteButton, useTranslation } from "@refinedev/core";
import { Trash2Icon } from "lucide-react";
import type { FC } from "react";
import { ConfirmDialog } from "@/components";

export const DeleteButton: FC<DeleteButtonProps> = ({
    resource,
    recordItemId,
    onSuccess,
    mutationMode: mutationModeProp,
    confirmTitle,
    confirmDescription,
    successNotification,
    errorNotification,
    hideText = false,
    accessControl,
    meta,
    dataProviderName,
    confirmOkText,
    confirmCancelText,
    invalidates,
    children,
    ...props
}) => {
    const { translate } = useTranslation();
    const {
        title,
        label,
        hidden,
        disabled,
        loading,
        confirmTitle: defaultConfirmTitle,
        confirmOkLabel: defaultConfirmOkLabel,
        cancelLabel: defaultCancelLabel,
        onConfirm,
        canAccess,
    } = useDeleteButton({
        resource,
        id: recordItemId,
        dataProviderName,
        invalidates,
        meta,
        onSuccess,
        mutationMode: mutationModeProp,
        errorNotification,
        successNotification,
        accessControl,
    });

    const translatedLabel = translate("buttons.delete", "Delete");
    const translatedConfirmTitle = translate("confirmDialog.delete.title", "Delete item");
    const translatedConfirmDescription = translate("confirmDialog.delete.description", "Are you sure you want to delete this item?");
    const translatedOkText = translate("confirmDialog.ok", "Yes, proceed");
    const translatedCancelText = translate("confirmDialog.cancel", "Cancel");

    if (hidden || !canAccess?.can) return null;

    return (
        <ConfirmDialog
            okText={confirmOkText ?? defaultConfirmOkLabel ?? translatedOkText}
            cancelText={confirmCancelText ?? defaultCancelLabel ?? translatedCancelText}
            okButtonVariant={"destructive"}
            cancelButtonVariant={"outline"}
            title={confirmTitle ?? defaultConfirmTitle ?? translatedConfirmTitle}
            description={confirmDescription ?? translatedConfirmDescription}
            loading={loading}
            onConfirm={onConfirm}
        >
            <Button
                disabled={disabled}
                title={title}
                loading={loading}
                {...props}
            >
               <Trash2Icon className="mr-2 size-4" />
                {!hideText && (children ?? label ?? translatedLabel)}
            </Button>
        </ConfirmDialog>
    );
};

DeleteButton.displayName = "DeleteButton";
