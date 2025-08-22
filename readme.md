# 🎨 Refine ShadCN Theme

A modern, production-ready UI theme package for [Refine](https://refine.dev) applications built with [shadcn/ui](https://ui.shadcn.com) components, featuring **Tailwind CSS v4**, **React 19**, and comprehensive **i18n support**.

[![npm version](https://badge.fury.io/js/@ferdiunal%2Frefine-shadcn.svg)](https://badge.fury.io/js/@ferdiunal%2Frefine-shadcn)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## ✨ Key Highlights

- 🎨 **Latest Tailwind CSS v4** with OKLCH color system
- ⚡ **React 19 & TypeScript** ready
- 🌐 **Built-in i18n** support (English & Turkish)
- 🎯 **Refine-optimized** components
- 🧩 **Shadcn/ui** design system
- 📱 **Responsive & Accessible**
- 🔧 **Fully customizable**

## 🚀 Live Demos

### [📱 Vite Example](https://refine-shadcn-vite.vercel.app)
### [⚛️ Next.js Example](https://refine-shadcn-nextjs.vercel.app)
### [📖 Documentation](https://deepwiki.com/ferdiunal/refine-shadcn)


## 📦 Installation

```bash
# npm
npm install @ferdiunal/refine-shadcn

# pnpm (recommended)
pnpm add @ferdiunal/refine-shadcn

# yarn
yarn add @ferdiunal/refine-shadcn
```

## 🔧 Quick Setup

### 1. Import Global Styles

```tsx
// In your main application file (App.tsx, index.tsx, etc.)
import "@ferdiunal/refine-shadcn/dist/globals.css";
```

### 2. Basic Usage with Refine

```tsx
import { Refine } from "@refinedev/core";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@ferdiunal/refine-shadcn";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Refine
          // ... your Refine configuration
        >
          {/* Your application */}
        </Refine>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

## 🧩 Core Components

### Action Buttons

All buttons include built-in authorization checks, loading states, and i18n support:

```tsx
import { 
  CreateButton, 
  EditButton, 
  DeleteButton, 
  ShowButton, 
  ListButton 
} from "@ferdiunal/refine-shadcn";

function ActionBar() {
  return (
    <div className="flex gap-2">
      <CreateButton resource="posts" />
      <EditButton resource="posts" recordItemId="1" />
      <ShowButton resource="posts" recordItemId="1" />
      <DeleteButton 
        resource="posts" 
        recordItemId="1"
        confirmTitle="Delete Post?"
        confirmDescription="This will permanently delete the post."
      />
      <ListButton resource="posts" />
    </div>
  );
}
```

### Framework Templates

- 📁 **[Vite Template](templates/vite-react/src/App.tsx)** - Complete Vite.js setup
- 📁 **[Next.js Template](templates/nextjs/app/app-layout.tsx)** - Next.js App Router ready

### FormField Component

Type-safe form fields with automatic validation and i18n support:

```tsx
import { FormField } from "@ferdiunal/refine-shadcn";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ferdiunal/refine-shadcn/ui";

function UserForm({ control }) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        label="Full Name"
        description="Enter your full name"
      >
        {(field) => <Input placeholder="John Doe" {...field} />}
      </FormField>

      <FormField
        control={control}
        name="role"
        label="User Role"
      >
        {(field) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select role..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormField>
    </div>
  );
}
```

### Internationalization (i18n)

The theme package includes comprehensive internationalization support with built-in English and Turkish translations. All components automatically use translations when an i18nProvider is configured.

<details>
  <summary>i18n Setup Example</summary>

```tsx
import React from "react";
import { Refine } from "@refinedev/core";
import { I18nProvider, locales } from "@ferdiunal/refine-shadcn";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: locales.en },
    tr: { translation: locales.tr },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Create i18n provider
const i18nProvider = {
  translate: (key: string, options?: any) => i18n.t(key, options),
  changeLocale: (lang: string) => i18n.changeLanguage(lang),
  getLocale: () => i18n.language,
};

function App() {
  return (
    <Refine
      i18nProvider={i18nProvider}
      // ... other props
    >
      <I18nProvider>
        {/* Your app components */}
      </I18nProvider>
    </Refine>
  );
}
```
</details>

#### Available Translations

The package includes translations for:

- **Buttons**: Create, Edit, Delete, Show, List, Save, Cancel
- **Form**: Labels, validation messages, loading states
- **Dialogs**: Confirmation dialogs, delete confirmations
- **Tables**: Column headers, pagination, search placeholders
- **Notifications**: Success, error, warning messages

#### Language Switching Example

```tsx
import { useTranslation } from "@refinedev/core";
import { Button } from "@ferdiunal/refine-shadcn/ui";

function LanguageSwitcher() {
  const { changeLocale, getLocale } = useTranslation();
  const currentLocale = getLocale();

  return (
    <div className="flex gap-2">
      <Button 
        variant={currentLocale === "en" ? "default" : "outline"}
        onClick={() => changeLocale("en")}
      >
        English
      </Button>
      <Button 
        variant={currentLocale === "tr" ? "default" : "outline"}
        onClick={() => changeLocale("tr")}
      >
        Türkçe
      </Button>
    </div>
  );
}
```

#### Custom Translations

You can extend or override the built-in translations:

```tsx
import { locales } from "@ferdiunal/refine-shadcn";

// Extend English translations
const customTranslations = {
  en: {
    ...locales.en,
    buttons: {
      ...locales.en.buttons,
      customAction: "Custom Action",
    },
    custom: {
      welcome: "Welcome to our application",
      goodbye: "Thank you for using our service",
    },
  },
};

// Use in i18next configuration
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: customTranslations.en },
    tr: { translation: locales.tr },
  },
  // ... other config
});
```

#### Translation Keys Structure

```json
{
  "buttons": {
    "create": "Create",
    "edit": "Edit", 
    "delete": "Delete",
    "show": "Show",
    "list": "List",
    "save": "Save",
    "cancel": "Cancel"
  },
  "form": {
    "required": "This field is required",
    "save": "Save",
    "cancel": "Cancel"
  },
  "confirmDialog": {
    "title": "Are you sure?",
    "description": "This action cannot be undone.",
    "ok": "Yes, proceed",
    "cancel": "Cancel"
  }
}
```

### List Page

The List Page displays a table or a grid of records fetched from a data source. It typically includes features like filtering, sorting, bulk actions, and pagination to help users navigate through large sets of data efficiently.

<details>
  <summary>Code Example</summary>

```tsx
import { ListPage, Table, TableFilterProps } from "@ferdiunal/refine-shadcn";
import { AvatarImage } from "@radix-ui/react-avatar";
import { BaseRecord, HttpError, useUserFriendlyName } from "@refinedev/core";
import type { UseTableReturnType } from "@refinedev/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

const UserList = () => {
    const friendly = useUserFriendlyName();
    const bulkDeleteAction = (
        table: UseTableReturnType<BaseRecord, HttpError>,
    ) => {
        const label = `Delete Selected (${
            table.getSelectedRowModel().rows.length
        }) ${friendly(
            "Row",
            table.getSelectedRowModel().rows.length > 1 ? "plural" : "singular",
        )}`;

        return {
            label,
            onClick: () => {
                alert("Delete Selected");
            },
        };
    };
    return (
        <ListPage>
            <Table enableSorting enableFilters>
                <Table.Column
                    accessorKey="id"
                    id={"select"}
                    header={({ table }) => (
                        <Table.CheckAll
                            options={[bulkDeleteAction(table)]}
                            table={table}
                        />
                    )}
                    cell={({ row }) => (
                        <Checkbox
                            className="translate-y-[2px]"
                            checked={row.getIsSelected()}
                            onCheckedChange={(value) =>
                                row.toggleSelected(!!value)
                            }
                            aria-label="Select row"
                            key={`checkbox-${row.original.id}`}
                        />
                    )}
                />
                <Table.Column
                    header={"ID"}
                    id="id"
                    accessorKey="id"
                    enableSorting
                    enableHiding
                />
                <Table.Column
                    header={"Avatar"}
                    id="avatar"
                    accessorKey="avatar"
                    cell={({ row }) =>
                        row.original.avatar?.[0]?.url && (
                            <Avatar>
                                <AvatarImage
                                    src={row.original.avatar[0].url}
                                    alt={row.original.avatar[0].name}
                                />
                                <AvatarFallback>
                                    {row.original.firstName[0]}
                                    {row.original.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                        )
                    }
                />
                <Table.Column
                    header={"First Name"}
                    accessorKey="firstName"
                    id="firstName"
                    enableSorting
                    enableHiding
                />
                <Table.Column
                    header={"Last Name"}
                    accessorKey="lastName"
                    id="lastName"
                    enableSorting
                    enableHiding
                />
                <Table.Column
                    header={"Birthday"}
                    accessorKey="birthday"
                    id="birthday"
                    enableSorting
                    enableHiding
                    filter={(props: TableFilterProps) => (
                        <Table.Filter.DateRangePicker {...props} align="end" />
                    )}
                />
                <Table.Column
                    accessorKey={"id"}
                    id={"actions"}
                    cell={({ row: { original } }) => (
                        <Table.Actions>
                            <Table.ShowAction
                                title="Detail"
                                row={original}
                                resource="users"
                                icon={<Eye size={16} />}
                            />
                            <Table.EditAction
                                title="Edit"
                                row={original}
                                resource="users"
                                icon={<Edit size={16} />}
                            />
                            <Table.DeleteAction
                                title="Delete"
                                row={original}
                                withForceDelete={true}
                                resource="users"
                                icon={<Trash2 size={16} />}
                            />
                        </Table.Actions>
                    )}
                />
            </Table>
        </ListPage>
    );
};

export default UserList;
```
</details>

### Show Page
The Show Page is designed to display detailed information about a single record. It is a read-only view that presents the data in a structured format, often including related records and metadata to give users a comprehensive understanding of the selected item.

<details>
  <summary>Code Example</summary>

```tsx
import { ShowPage } from "@ferdiunal/refine-shadcn";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { IUser } from "./Form";
const UserShow: React.FC<IResourceComponentsProps> = () => {
    const {
        query: { data },
    } = useShow<IUser>();
    const record = data?.data;

    return (
        <ShowPage>
            <ShowPage.Row title="ID" children={record?.id as number} />
            <ShowPage.Row
                title="First Name"
                children={record?.firstName?.toString() || ""}
            />
            <ShowPage.Row
                title="Last Name"
                children={record?.firstName?.toString() || ""}
            />
            <ShowPage.Row
                title="Email"
                children={record?.email?.toString() || ""}
            />
        </ShowPage>
    );
};

export default UserShow;
```
</details>

### Create Page
The Create Page allows users to input new data into the system. It provides a form where users can fill out the necessary fields to create a new record, ensuring that all required information is collected before submission.

<details>
  <summary>Code Example</summary>

```tsx
import { CreatePage } from "@ferdiunal/refine-shadcn";
import { Field, Form } from "@ferdiunal/refine-shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Firstname must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Lastname must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

const UserCreate = () => {
    const { ...form } = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
            redirect,
        },
        warnWhenUnsavedChanges: true,
    });

    return (
        <CreatePage>
            <Form {...form}>
                <Field {...form} name="firstName" label="Firstname">
                    <Input placeholder="Firstname" />
                </Field>
                <Field {...form} name="lastName" label="Lastname">
                    <Input placeholder="Lastname" />
                </Field>
                <Field {...form} name="email" label="Email">
                    <Input placeholder="email" type="email" />
                </Field>
            </Form>
        </CreatePage>
    );
};

export default UserCreate;
```
</details>

### Edit Page
The Edit Page enables users to modify existing records. It loads the current data into a form, allowing users to make updates and save changes. It usually includes validation to ensure that updates do not violate any data integrity rules.

<details>
  <summary>Code Example</summary>

```tsx
import { EditPage } from "@ferdiunal/refine-shadcn";
import { Field, Form } from "@ferdiunal/refine-shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import { RedirectAction } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "Firstname must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
        message: "Lastname must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
});

const UserEdit = () => {
    const { ...form } = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
        refineCoreProps: {
            autoSave: {
                enabled: true,
            },
            redirect,
        },
        warnWhenUnsavedChanges: true,
    });

    return (
        <EditPage>
            <Form {...form}>
                <Field {...form} name="firstName" label="Firstname">
                    <Input placeholder="Firstname" />
                </Field>
                <Field {...form} name="lastName" label="Lastname">
                    <Input placeholder="Lastname" />
                </Field>
                <Field {...form} name="email" label="Email">
                    <Input placeholder="email" type="email" />
                </Field>
            </Form>
        </EditPage>
    );
};

export default UserEdit;
```
</details>

## Screenshots

<img src="https://github.com/ferdiunal/refine-shadcn/blob/main/art/SCR-20240821-ddjg.png?v=1" />

<img src="https://github.com/ferdiunal/refine-shadcn/blob/main/art/SCR-20240821-ddlx.png?v=1" />

<img src="https://github.com/ferdiunal/refine-shadcn/blob/main/art/SCR-20240821-ddns.png?v=1" />

<img src="https://github.com/ferdiunal/refine-shadcn/blob/main/art/SCR-20240821-ddpm.png?v=1" />

<img src="https://github.com/ferdiunal/refine-shadcn/blob/main/art/SCR-20240821-ddrb.png?v=1" />

<img src="https://github.com/ferdiunal/refine-shadcn/blob/main/art/SCR-20240821-dfrd.png?v=1" />

# Sponsors

[<img src="https://avatars.githubusercontent.com/u/104967037?s=200&v=4" width="100">](https://github.com/refinedev)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
