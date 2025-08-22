import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@ferdiunal/refine-shadcn/ui"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useTranslation } from "@refinedev/core"
import { loginSchema, type LoginFormData } from "@/lib/validation"

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void
  loading?: boolean
  className?: string
  defaultValues?: Partial<LoginFormData>
}

export function LoginForm({
  onSubmit,
  loading = false,
  className,
  defaultValues,
}: LoginFormProps) {
  const { translate } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      ...defaultValues,
    },
  })

  const handleSubmit = (data: LoginFormData) => {
    onSubmit?.(data)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {translate("auth.login.title")}
        </CardTitle>
        <CardDescription>
          {translate("auth.login.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("auth.login.email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={translate("auth.login.emailPlaceholder")}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("auth.login.password")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={translate("auth.login.passwordPlaceholder")}
                        disabled={loading}
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword
                            ? translate("auth.login.hidePassword")
                            : translate("auth.login.showPassword")
                          }
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading || !form.formState.isValid}
            >
              {translate("auth.login.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
