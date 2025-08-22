# @ferdiunal/refine-shadcn-auth

Authentication components for refine.dev with shadcn-ui and better-auth integration.

## Features

- 🔐 Complete authentication forms (Login, Register, Forgot Password)
- 📱 Responsive design with shadcn/ui components
- 🎨 Tailwind CSS styling
- 🌍 i18n support (English & Turkish)
- ✅ Form validation with react-hook-form and zod
- 🔧 TypeScript support
- 🚀 Better-auth integration
- 📦 Lightweight and tree-shakeable

## Installation

```bash
npm install @ferdiunal/refine-shadcn-auth @ferdiunal/refine-shadcn
# or
yarn add @ferdiunal/refine-shadcn-auth @ferdiunal/refine-shadcn
# or
pnpm add @ferdiunal/refine-shadcn-auth @ferdiunal/refine-shadcn
# or
bun add @ferdiunal/refine-shadcn-auth @ferdiunal/refine-shadcn
```

## Usage

### Basic Usage

```tsx
import { LoginForm, RegisterForm, ForgotPasswordForm } from "@ferdiunal/refine-shadcn-auth";

function LoginPage() {
  const handleLogin = (data) => {
    console.log('Login data:', data);
    // Handle login logic
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      loading={false}
    />
  );
}
```

### With Auth Layout

```tsx
import { AuthLayout, LoginForm } from "@ferdiunal/refine-shadcn-auth";

function LoginPage() {
  return (
    <AuthLayout
      title="My App"
      subtitle="Welcome back to our platform"
      backgroundImage="/path/to/background.jpg"
    >
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
}
```

## Components

### LoginForm

```tsx
<LoginForm
  onSubmit={(data) => console.log(data)}
  loading={false}
  className="w-full max-w-sm"
  defaultValues={{ email: "user@example.com" }}
/>
```

### RegisterForm

```tsx
<RegisterForm
  onSubmit={(data) => console.log(data)}
  loading={false}
  termsRequired={true}
  className="w-full max-w-sm"
/>
```

### ForgotPasswordForm

```tsx
<ForgotPasswordForm
  onSubmit={(data) => console.log(data)}
  loading={false}
  backToLoginEnabled={true}
  onBackToLogin={() => navigate('/login')}
/>
```

### AuthLayout

```tsx
<AuthLayout
  title="My Application"
  subtitle="Secure authentication for modern web apps"
  logo={<MyLogo />}
  backgroundImage="/auth-bg.jpg"
  className="min-h-screen"
>
  {children}
</AuthLayout>
```

## Validation Schemas

The package includes pre-built zod validation schemas:

```tsx
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  type LoginFormData,
  type RegisterFormData,
  type ForgotPasswordFormData
} from "@ferdiunal/refine-shadcn-auth";
```

## Internationalization

The package supports i18n through the refine.dev translation system. Make sure to set up your i18n provider with the required translation keys.

### Required Translation Keys

```json
{
  "auth": {
    "login": {
      "title": "Login to your account",
      "description": "Enter your email and password below to login to your account",
      "email": "Email",
      "password": "Password",
      "submit": "Login",
      "emailPlaceholder": "m@example.com",
      "passwordPlaceholder": "Enter your password",
      "showPassword": "Show password",
      "hidePassword": "Hide password"
    },
    "register": {
      "title": "Create an account",
      "description": "Enter your information below to create your account",
      "name": "Full name",
      "email": "Email",
      "password": "Password",
      "confirmPassword": "Confirm Password",
      "submit": "Create account",
      "termsLabel": "I agree to the {{terms}} and {{privacy}}",
      "termsLink": "Terms of Service",
      "privacyLink": "Privacy Policy"
    },
    "forgotPassword": {
      "title": "Forgot your password?",
      "description": "Enter your email address and we'll send you a link to reset your password",
      "email": "Email",
      "submit": "Send reset link",
      "backToLogin": "Back to login"
    },
    "form": {
      "emailRequired": "Email is required",
      "emailInvalid": "Please enter a valid email address",
      "passwordRequired": "Password is required",
      "passwordMinLength": "Password must be at least 6 characters",
      "passwordStrength": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "nameRequired": "Name is required",
      "confirmPasswordRequired": "Please confirm your password",
      "termsRequired": "You must accept the terms and conditions"
    }
  }
}
```

## Dependencies

This package requires:

- `@ferdiunal/refine-shadcn` - UI components and theming
- `react-hook-form` - Form management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `better-auth` - Authentication library
- `lucide-react` - Icons

## License

MIT © [Ferdi UNAL](https://github.com/ferdiunal)
