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

### 🌐 Internationalization (i18n)

Built-in support for multiple languages with automatic component translation:

```tsx
import { Refine } from "@refinedev/core";
import { I18nProvider, locales } from "@ferdiunal/refine-shadcn";

// Quick i18n setup
const i18nProvider = {
  translate: (key: string, defaultMessage?: string) => i18n.t(key, defaultMessage),
  changeLocale: (lang: string) => i18n.changeLanguage(lang),
  getLocale: () => i18n.language,
};

function App() {
  return (
    <Refine i18nProvider={i18nProvider}>
      <I18nProvider>
        {/* All components now support i18n automatically */}
        <CreateButton /> {/* Automatically translates to "Create" or "Oluştur" */}
        <DeleteButton /> {/* Shows localized confirmation dialogs */}
      </I18nProvider>
    </Refine>
  );
}
```

**Supported Languages:** 🇬🇧 English • 🇹🇷 Turkish

**Auto-translated Components:**
- ✅ All action buttons (Create, Edit, Delete, etc.)
- ✅ Form labels and validation messages  
- ✅ Confirmation dialogs
- ✅ Table headers and pagination
- ✅ Loading states and notifications

## 📋 Page Components

### List Page

Feature-rich data tables with filtering, sorting, and bulk actions:

<details>
  <summary>📊 Table Implementation Example</summary>

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

Clean, structured display for individual record details:

<details>
  <summary>👁️ Show Page Example</summary>

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

User-friendly forms for creating new records with validation:

<details>
  <summary>➕ Create Form Example</summary>

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

Pre-populated forms for updating existing records:

<details>
  <summary>✏️ Edit Form Example</summary>

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

## 🎨 UI Components

Access the complete shadcn/ui component library:

```tsx
import { 
  Button, 
  Input, 
  Card, 
  Dialog, 
  Select,
  Table,
  Form
} from "@ferdiunal/refine-shadcn/ui";

function MyComponent() {
  return (
    <Card className="p-6">
      <Button variant="primary" size="lg">
        Click me
      </Button>
      <Input placeholder="Type here..." />
    </Card>
  );
}
```

## 🎯 Advanced Features

### Custom Theming

Override CSS variables to match your brand:

```css
:root {
  --primary: oklch(0.7 0.15 250);
  --primary-foreground: oklch(0.98 0.02 250);
  --secondary: oklch(0.96 0.01 250);
  /* Customize all theme tokens */
}
```

### TypeScript Integration

Full type safety across all components:

```tsx
// Automatic type inference
type UserForm = {
  name: string;
  email: string;
  role: 'admin' | 'user';
};

// Type-safe form fields
<FormField<UserForm, "name">
  control={control}
  name="name" // ✅ Fully typed
  label="Full Name"
>
  {(field) => <Input {...field} />}
</FormField>
```

## 📚 Resources

- 📖 **[Documentation](https://deepwiki.com/ferdiunal/refine-shadcn)** - Complete guide and API reference
- 🎮 **[Live Examples](https://refine-shadcn-vite.vercel.app)** - Interactive demos
- 🐛 **[Issues](https://github.com/ferdiunal/refine-shadcn/issues)** - Report bugs or request features
- 💬 **[Discussions](https://github.com/ferdiunal/refine-shadcn/discussions)** - Community support

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Refine](https://refine.dev) - The headless React framework
- [shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com) - Accessible component primitives

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/ferdiunal">@ferdiunal</a></p>
  <p>⭐ Star this repo if it helped you!</p>
</div>
