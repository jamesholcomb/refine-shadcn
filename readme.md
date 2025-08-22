# Refine ShadCN Theme

A modern, type-safe React UI theme package for [refine.dev](https://refine.dev) built using [ui.shadcn](ui.shadcn.com) with **Tailwind CSS v4** and **React 19** support.

## [WIKI](https://deepwiki.com/ferdiunal/refine-shadcn)

# Previews 💪

### [Vite Example](https://refine-shadcn-vite.vercel.app)
### [Nextjs Example](https://refine-shadcn-nextjs.vercel.app)


## Install

```bash

npm install @ferdiunal/refine-shadcn

```
or
```bash

yarn add @ferdiunal/refine-shadcn

```

## Features

- 🎨 **Tailwind CSS v4** - Latest CSS-first configuration with OKLCH color system
- 🔧 **TypeScript** - Full type safety with React 19 support
- ⚡ **Modern Stack** - React 19, ShadCN/UI, Radix UI primitives
- 🎯 **Refine Integration** - Built specifically for Refine applications
- 🧩 **Flexible Components** - Customizable and accessible UI components
- 📦 **Tree-shakeable** - Only bundle what you use

## Usage

**For Vite**

[You can use the layout structure prepared for Vite.js from this link](templates/vite-react/src/App.tsx)

**For NexJs**

[You can use the layout structure prepared for Next.js from this link](templates/nextjs/app/app-layout.tsx)

### FormField Component

The `FormField` component provides a flexible, type-safe way to create form inputs with react-hook-form integration. It automatically handles labels, descriptions, validation messages, and form control binding.

<details>
  <summary>FormField Usage Example</summary>

```tsx
import { FormField } from "@ferdiunal/refine-shadcn";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ferdiunal/refine-shadcn/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define your form schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
});

type FormData = z.infer<typeof formSchema>;

function MyForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Text Input Field */}
      <FormField
        control={control}
        name="name"
        label="Full Name"
        description="Enter your full name as it appears on official documents"
        className="space-y-2"
      >
        {(field) => (
          <Input
            placeholder="John Doe"
            {...field}
          />
        )}
      </FormField>

      {/* Email Input Field */}
      <FormField
        control={control}
        name="email"
        label="Email Address"
        description="We'll use this email for important notifications"
      >
        {(field) => (
          <Input
            type="email"
            placeholder="john@example.com"
            {...field}
          />
        )}
      </FormField>

      {/* Select Field */}
      <FormField
        control={control}
        name="role"
        label="User Role"
        description="Select the appropriate role for this user"
      >
        {(field) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrator</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FormField>

      <button type="submit" className="w-full">
        Submit Form
      </button>
    </form>
  );
}
```
</details>

#### FormField Props

```tsx
type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>; // react-hook-form control object
  name: TName; // Field name (type-safe)
  label: string; // Field label
  children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode; // Render function for input
  description?: string; // Optional helper text
  className?: string; // CSS class for the form item container
};
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
