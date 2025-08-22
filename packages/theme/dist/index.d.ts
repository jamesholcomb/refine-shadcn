import * as class_variance_authority_dist_types from 'class-variance-authority/dist/types';
import * as React$1 from 'react';
import React__default, { ReactElement as ReactElement$1, ComponentProps, ReactNode, PropsWithChildren, FC, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import { CanAccess, UseSelectReturnType, BaseOption, BaseRecord, HttpError, NotificationProvider } from '@refinedev/core';
import { RefineCloneButtonProps, RefineCreateButtonProps, RefineDeleteButtonProps, RefineEditButtonProps, RefineExportButtonProps, RefineButtonResourceProps, RefineButtonSingleProps, RefineListButtonProps, RefineRefreshButtonProps, RefineSaveButtonProps, RefineShowButtonProps, RefineCrudCreateProps, RefineCrudEditProps, RefineCrudListProps, RefineCrudShowProps, RefineBreadcrumbProps } from '@refinedev/ui-types';
import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import { DeleteButtonValues } from '@refinedev/core/dist/hooks/button/delete-button';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { FieldValues, FieldPath, ControllerProps, ControllerRenderProps } from 'react-hook-form';
import { UseFormReturnType } from '@refinedev/react-hook-form';
import { ThemeProviderProps } from 'next-themes';
import * as _radix_ui_react_checkbox from '@radix-ui/react-checkbox';
import { PopoverContentProps } from '@radix-ui/react-popover';
import { UseTableReturnType, UseTableProps } from '@refinedev/react-table';
import { Column, ColumnDefTemplate, CellContext } from '@tanstack/react-table';

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_dist_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

type ConfirmDialogProps = AlertDialogProps & {
    title?: string;
    description?: string;
    okIcon?: ReactElement$1<SVGSVGElement>;
    okIconSide?: "left" | "right";
    cancelIconSide?: "left" | "right";
    cancelIcon?: ReactElement$1<SVGSVGElement>;
    okText?: string;
    cancelText?: string;
    loading?: boolean;
    onConfirm: DeleteButtonValues["onConfirm"];
    children?: ReactElement$1<SVGSVGElement>;
    okButtonVariant?: VariantProps<typeof buttonVariants>["variant"];
    cancelButtonVariant?: VariantProps<typeof buttonVariants>["variant"];
    okButtonSize?: VariantProps<typeof buttonVariants>["size"];
    cancelButtonSize?: VariantProps<typeof buttonVariants>["size"];
};

type CustomButtonProps<T> = ButtonProps & T;

type ShowButtonProps = CustomButtonProps<RefineShowButtonProps>;

type CreateButtonProps = CustomButtonProps<
    Pick<
        RefineCreateButtonProps,
        "resource" | "hideText" | "accessControl" | "meta" | "onClick"
    >
>;

type DeleteButtonProps = CustomButtonProps<
    RefineDeleteButtonProps<{
        confirmDescription?: ConfirmDialogProps["description"];
    }>
>;

type EditButtonProps = CustomButtonProps<RefineEditButtonProps>;

type ListButtonProps = CustomButtonProps<RefineListButtonProps>;

type SaveButtonProps = ButtonProps &
    RefineSaveButtonProps &
    RefineButtonResourceProps &
    RefineButtonSingleProps & {
        access?: Omit<
            ComponentProps<typeof CanAccess>,
            "children" | "action" | "resource" | "params"
        >;
    };

type ExportButtonProps = ButtonProps &
    RefineExportButtonProps<
        RefineButtonResourceProps &
            RefineButtonSingleProps & {
                access?: Omit<
                    ComponentProps<typeof CanAccess>,
                    "children" | "action" | "resource" | "params"
                >;
            }
    >;

type RefreshButtonProps = CustomButtonProps<
    RefineRefreshButtonProps & {
        accessControl?: {
            enabled?: boolean;
            hideIfUnauthorized?: boolean;
        };
    }
>;

type CloneButtonProps = CustomButtonProps<
    Pick<
        RefineCloneButtonProps,
        | "resource"
        | "recordItemId"
        | "hideText"
        | "accessControl"
        | "meta"
        | "onClick"
    >
>;

type ImportButtonProps = Omit<
    CustomButtonProps<
        RefineExportButtonProps<
            RefineButtonResourceProps &
                RefineButtonSingleProps & {
                    access?: Omit<
                        ComponentProps<typeof CanAccess>,
                        "children" | "action" | "resource" | "params"
                    >;
                }
        >
    > & {
        accept: React.InputHTMLAttributes<HTMLInputElement>["accept"];
        onChange: (files: File[]) => void;
    },
    "onClick"
>;

type PageHeaderProps = {
    title?: ReactNode;
    subTitle?: ReactNode;
    isBack?: boolean;
    onBack?: (e?: React.MouseEvent<HTMLElement>) => void;
    className?: string;
    breadcrumb?: ReactNode;
    extra?: ReactNode;
};

type CreateProps = RefineCrudCreateProps<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps
> &
    Partial<{
        extra: React.ReactNode;
    }>;

type EditProps = RefineCrudEditProps<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps
> &
    Partial<{
        extra: React.ReactNode;
    }>;

type ListProps = Omit<
    RefineCrudListProps<
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >,
        PageHeaderProps,
        React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >
    >,
    "createButtonProps"
> &
    Partial<{
        createButtonProps: CreateButtonProps;
        extra: React.ReactNode;
        className: string;
    }>;

type ShowProps = RefineCrudShowProps<
    React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >,
    PageHeaderProps
> &
    Partial<{
        extra: React.ReactNode;
    }>;

declare function ThemeProvider({ children, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;

type LogoType =
    | ReactElement$1<React.ComponentProps<"img">>
    | ReactNode<React.ComponentProps<"img">>;
type LayoutProps = PropsWithChildren<
    {
        defaultLayout: number[] | undefined;
        defaultCollapsed?: boolean;
        footer?: ReactElement$1 | ReactNode;
        logo?: {
            collapsed?: LogoType;
            default: LogoType;
        };
        navCollapsedSize: number;
        navbar?: {
            leftSide?: ReactElement$1 | ReactNode;
            rightSide?: ReactElement$1 | ReactNode;
        };
    } & React.ComponentProps<typeof ThemeProvider>
>;

// React 19 compatibility fixes for Radix UI
declare global {
    namespace React {
        // Override ReactNode to exclude bigint for Radix UI compatibility
        type ReactNode = 
            | ReactElement
            | string
            | number
            | ReactFragment
            | ReactPortal
            | boolean
            | null
            | undefined;
    }
}

declare const CloneButton: FC<CloneButtonProps>;

declare const CreateButton: FC<CreateButtonProps>;

declare const DeleteButton: FC<DeleteButtonProps>;

declare const EditButton: FC<EditButtonProps>;

declare const ExportButton: FC<ExportButtonProps>;

declare const ImportButton: FC<ImportButtonProps>;

declare const ListButton: FC<ListButtonProps>;

declare const RefreshButton: FC<RefreshButtonProps>;

declare const SaveButton: FC<SaveButtonProps>;

declare const ShowButton: FC<ShowButtonProps>;

type BreadcrumbProps = RefineBreadcrumbProps;
declare const Breadcrumbs: FC<BreadcrumbProps>;

declare const Combobox: React$1.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & Pick<UseSelectReturnType<BaseOption, any>, "options"> & {
    placeholder?: string;
    emptyMessage?: string;
    onChange?: (value: string | number) => void;
    value?: string | number | BaseRecord;
    disabled?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;

declare const ConfirmDialog: FC<ConfirmDialogProps>;

type Props$1<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    control: ControllerProps<TFieldValues, TName>["control"];
    name: ControllerProps<TFieldValues, TName>["name"];
    label: string;
    children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;
    description?: string;
    className?: string;
};
declare const FormField: {
    <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: Props$1<TFieldValues, TName>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
declare const Field: {
    <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: Props$1<TFieldValues, TName>): react_jsx_runtime.JSX.Element;
    displayName: string;
};

type NativeFormProps = Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "onSubmit">;
type FormProps<TQueryFnData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TVariables extends FieldValues = FieldValues, TContext extends object = {}, TData extends BaseRecord = TQueryFnData, TResponse extends BaseRecord = TData, TResponseError extends HttpError = TError> = PropsWithChildren & UseFormReturnType<TQueryFnData, TError, TVariables, TContext, TData, TResponse, TResponseError> & {
    formProps?: NativeFormProps;
    isWatchable?: boolean;
    hideCancel?: boolean;
};
declare const Form: <TQueryFnData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError, TFieldValues extends FieldValues = FieldValues, TContext extends object = {}, TData extends BaseRecord = TQueryFnData, TResponse extends BaseRecord = TData, TResponseError extends HttpError = TError>({ formProps, isWatchable, saveButtonProps, ...props }: FormProps<TQueryFnData, TError, TFieldValues, TContext, TData, TResponse, TResponseError>) => react_jsx_runtime.JSX.Element;

declare const Link: React$1.ForwardRefExoticComponent<React$1.AnchorHTMLAttributes<HTMLAnchorElement> & {
    asChild?: boolean;
} & React$1.RefAttributes<HTMLAnchorElement>>;

declare const ModeToggle: () => react_jsx_runtime.JSX.Element;

declare const PageHeader: FC<PageHeaderProps>;

interface SelectProps {
    placeholder?: string;
    emptyMessage?: string;
    onChange?: (value: string) => void;
    options?: BaseOption[];
    disabled?: boolean;
    value?: string;
    defaultValue?: string;
    name?: string;
    required?: boolean;
}
declare const Select: React__default.ForwardRefExoticComponent<SelectProps & React__default.RefAttributes<HTMLDivElement>>;

type NavProps = {
    isCollapsed: boolean;
};
declare const Sidebar: {
    ({ isCollapsed }: NavProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const CreatePage: React__default.FC<CreateProps>;

declare const EditPage: FC<EditProps>;

declare const ListPage: FC<ListProps>;

declare const Row: ({ title, children, }: Required<PropsWithChildren<{
    title: string;
}>>) => react_jsx_runtime.JSX.Element;

declare const ShowPage: FC<ShowProps> & {
    Row: typeof Row;
};

type Props = PropsWithChildren<Pick<LayoutProps, "attribute" | "defaultTheme" | "enableSystem" | "disableTransitionOnChange" | "enableColorScheme" | "forcedTheme" | "nonce" | "storageKey" | "themes" | "value">>;
declare const BaseLayout: {
    ({ attribute, defaultTheme, enableSystem, disableTransitionOnChange, enableColorScheme, forcedTheme, nonce, storageKey, themes, value, children, }: Props): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const DefaultLayout: {
    ({ children, defaultLayout, defaultCollapsed, navCollapsedSize, navbar, footer, logo, attribute, defaultTheme, enableSystem, disableTransitionOnChange, enableColorScheme, forcedTheme, nonce, storageKey, themes, value, }: LayoutProps): react_jsx_runtime.JSX.Element;
    displayName: string;
};

declare const notificationProvider: NotificationProvider;
declare const useNotificationProvider: () => NotificationProvider;

type DeleteDataType = {
    toogle: boolean;
    row: any;
    resource: string;
    redirectBack?: boolean;
    onAfterHandle?: () => void;
};
interface DeleteContextType {
    data: DeleteDataType;
    updateData: (data: DeleteDataType) => void;
}
declare function DeleteActionModal(props: DeleteContextType): react_jsx_runtime.JSX.Element;
declare const DeleteContext: React__default.Context<DeleteContextType | undefined>;
declare const DeleteProvider: React__default.FC<PropsWithChildren>;

interface I18nContextValue {
    translate: (key: string, options?: any) => string;
    changeLocale: (locale: string, options?: any) => Promise<any>;
    getLocale: () => string;
}
interface I18nProviderProps {
    children: ReactNode;
}
declare function I18nProvider({ children }: I18nProviderProps): react_jsx_runtime.JSX.Element;
declare function useI18n(): I18nContextValue;

interface RowActionsProps {
    children?: ReactNode;
}
type RowActionProps = PropsWithChildren & {
    to?: string;
    title?: string;
    asChild?: boolean;
    className?: string;
    disabled?: boolean;
    icon?: ReactNode;
    onClick?: (event: any) => void;
};
declare function RowActions({ children }: RowActionsProps): react_jsx_runtime.JSX.Element;

type DeleteActionProps = RowActionProps & {
    row: any;
    resource: string;
    title: string;
    onAfterHandle?: () => void;
};
declare function DeleteAction({ row, resource, title, disabled, onAfterHandle, ...props }: DeleteActionProps): react_jsx_runtime.JSX.Element;
declare namespace DeleteAction {
    var displayName: string;
}

type ShowActionProps = RowActionProps & {
    row: any;
    resource: string;
    title: string;
};
declare function ShowAction({ row, resource, title, disabled, ...props }: ShowActionProps): react_jsx_runtime.JSX.Element;
declare namespace ShowAction {
    var displayName: string;
}

type EditActionProps = RowActionProps & {
    row: any;
    resource: string;
    title: string;
};
declare function EditAction({ row, resource, title, disabled, ...props }: EditActionProps): react_jsx_runtime.JSX.Element;
declare namespace EditAction {
    var displayName: string;
}

declare function TableFilterDateRangePickerFilter<T extends BaseRecord = BaseRecord>({ column, title, numberOfMonths, align, }: Pick<TableFilterProps<T>, "column" | "title" | "numberOfMonths" | "align">): react_jsx_runtime.JSX.Element;

declare function TableFilterDropdown({ column, title, options, align, }: TableFilterProps): react_jsx_runtime.JSX.Element;

declare function TableFilterSearchColumn({ column, title, align, }: TableFilterProps): react_jsx_runtime.JSX.Element;

type TableListFilterOption = BaseOption & {
    icon?: React__default.ComponentType<{
        className?: string;
    }>;
};
type TableFilterProps<TData extends BaseRecord = BaseRecord> = {
    column: Column<TData>;
    title?: string;
    numberOfMonths?: number;
    align?: PopoverContentProps["align"];
    options?: TableListFilterOption[];
};
type ColumnProps<TData extends BaseRecord = BaseRecord, TValue = unknown, TError extends HttpError = HttpError> = {
    id: string;
    accessorKey: string;
    enableSorting?: boolean;
    enableHiding?: boolean;
    header?: string | FC<{
        table: UseTableReturnType<TData, TError>;
    }>;
    cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
    children?: ReactElement$1;
    filter?: FC<TableFilterProps<TData>>;
};
type TableProps<TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError> = Partial<UseTableProps<TData, TError, TData>> & {
    children?: ReactElement$1<ColumnProps<TData, TError>>[];
    showHeader?: boolean;
};
declare function Table<TQueryFnData extends BaseRecord = BaseRecord, TData extends BaseRecord = TQueryFnData, TError extends HttpError = HttpError>({ children, showHeader, columns, ...props }: TableProps<TData, TError>): react_jsx_runtime.JSX.Element;
declare namespace Table {
    var Column: <TData extends BaseRecord = BaseRecord, TError extends HttpError = HttpError>(props: ColumnProps<TData, TError>) => React__default.ReactElement<unknown, string | React__default.JSXElementConstructor<any>> | undefined;
    var CheckAll: React__default.FC<Omit<_radix_ui_react_checkbox.CheckboxProps & React__default.RefAttributes<HTMLButtonElement>, "ref"> & {
        table: UseTableReturnType<BaseRecord, HttpError>;
        options?: {
            label: string;
            onClick: () => void;
        }[];
    } & {
        children?: React__default.ReactNode | undefined;
    }>;
    var Actions: typeof RowActions;
    var Action: React__default.FC<RowActionProps>;
    var EditAction: typeof EditAction;
    var ShowAction: typeof ShowAction;
    var DeleteAction: typeof DeleteAction;
    var Filter: {
        DateRangePicker: typeof TableFilterDateRangePickerFilter;
        Dropdown: typeof TableFilterDropdown;
        Search: typeof TableFilterSearchColumn;
    };
    var displayName: string;
}

var buttons$1 = {
	create: "Create",
	edit: "Edit",
	"delete": "Delete",
	show: "Show",
	list: "List",
	save: "Save",
	cancel: "Cancel",
	ok: "OK",
	loading: "Loading..."
};
var pages$1 = {
	create: "Create {{resource}}",
	edit: "Edit {{resource}}",
	show: "Show {{resource}}",
	list: "{{resource}} List"
};
var form$1 = {
	required: "This field is required",
	invalid: "Invalid input",
	save: "Save",
	cancel: "Cancel",
	loading: "Saving..."
};
var confirmDialog$1 = {
	title: "Are you sure?",
	description: "This action cannot be undone.",
	"delete": {
		title: "Delete {{resource}}",
		description: "Are you sure you want to delete this {{resource}}? This action cannot be undone."
	},
	ok: "Yes, proceed",
	cancel: "Cancel"
};
var notifications$1 = {
	success: "Success",
	error: "Error",
	warning: "Warning",
	info: "Information"
};
var table$1 = {
	actions: "Actions",
	noData: "No data available",
	loading: "Loading...",
	search: "Search...",
	filter: "Filter",
	sort: "Sort",
	pagination: {
		previous: "Previous",
		next: "Next",
		page: "Page",
		of: "of",
		rows: "rows"
	}
};
var en = {
	buttons: buttons$1,
	pages: pages$1,
	form: form$1,
	confirmDialog: confirmDialog$1,
	notifications: notifications$1,
	table: table$1
};

var buttons = {
	create: "Oluştur",
	edit: "Düzenle",
	"delete": "Sil",
	show: "Göster",
	list: "Liste",
	save: "Kaydet",
	cancel: "İptal",
	ok: "Tamam",
	loading: "Yükleniyor..."
};
var pages = {
	create: "{{resource}} Oluştur",
	edit: "{{resource}} Düzenle",
	show: "{{resource}} Göster",
	list: "{{resource}} Listesi"
};
var form = {
	required: "Bu alan zorunludur",
	invalid: "Geçersiz giriş",
	save: "Kaydet",
	cancel: "İptal",
	loading: "Kaydediliyor..."
};
var confirmDialog = {
	title: "Emin misiniz?",
	description: "Bu işlem geri alınamaz.",
	"delete": {
		title: "{{resource}} Sil",
		description: "Bu {{resource}} öğesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
	},
	ok: "Evet, devam et",
	cancel: "İptal"
};
var notifications = {
	success: "Başarılı",
	error: "Hata",
	warning: "Uyarı",
	info: "Bilgi"
};
var table = {
	actions: "İşlemler",
	noData: "Veri bulunamadı",
	loading: "Yükleniyor...",
	search: "Ara...",
	filter: "Filtrele",
	sort: "Sırala",
	pagination: {
		previous: "Önceki",
		next: "Sonraki",
		page: "Sayfa",
		of: "/",
		rows: "satır"
	}
};
var tr = {
	buttons: buttons,
	pages: pages,
	form: form,
	confirmDialog: confirmDialog,
	notifications: notifications,
	table: table
};

declare const locales: {
    en: {
        buttons: {
            create: string;
            edit: string;
            delete: string;
            show: string;
            list: string;
            save: string;
            cancel: string;
            ok: string;
            loading: string;
        };
        pages: {
            create: string;
            edit: string;
            show: string;
            list: string;
        };
        form: {
            required: string;
            invalid: string;
            save: string;
            cancel: string;
            loading: string;
        };
        confirmDialog: {
            title: string;
            description: string;
            delete: {
                title: string;
                description: string;
            };
            ok: string;
            cancel: string;
        };
        notifications: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
        table: {
            actions: string;
            noData: string;
            loading: string;
            search: string;
            filter: string;
            sort: string;
            pagination: {
                previous: string;
                next: string;
                page: string;
                of: string;
                rows: string;
            };
        };
    };
    tr: {
        buttons: {
            create: string;
            edit: string;
            delete: string;
            show: string;
            list: string;
            save: string;
            cancel: string;
            ok: string;
            loading: string;
        };
        pages: {
            create: string;
            edit: string;
            show: string;
            list: string;
        };
        form: {
            required: string;
            invalid: string;
            save: string;
            cancel: string;
            loading: string;
        };
        confirmDialog: {
            title: string;
            description: string;
            delete: {
                title: string;
                description: string;
            };
            ok: string;
            cancel: string;
        };
        notifications: {
            success: string;
            error: string;
            warning: string;
            info: string;
        };
        table: {
            actions: string;
            noData: string;
            loading: string;
            search: string;
            filter: string;
            sort: string;
            pagination: {
                previous: string;
                next: string;
                page: string;
                of: string;
                rows: string;
            };
        };
    };
};

export { BaseLayout, type BreadcrumbProps, Breadcrumbs, CloneButton, type ColumnProps, Combobox, ConfirmDialog, CreateButton, CreatePage, DefaultLayout, DeleteActionModal, DeleteButton, DeleteContext, type DeleteContextType, DeleteProvider, EditButton, EditPage, ExportButton, Field, Form, FormField, type FormProps, type I18nContextValue, I18nProvider, type I18nProviderProps, ImportButton, Link, ListButton, ListPage, ModeToggle, PageHeader, RefreshButton, SaveButton, Select, type SelectProps, ShowButton, ShowPage, Sidebar, Table, type TableFilterProps, type TableListFilterOption, type TableProps, ThemeProvider, en, locales, notificationProvider, tr, useI18n, useNotificationProvider };
