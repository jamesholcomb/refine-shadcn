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
  FormMessage,
  Checkbox
} from "@ferdiunal/refine-shadcn/ui"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useTranslation } from "@refinedev/core"
import { registerSchema, type RegisterFormData } from "@/lib/validation"

export interface RegisterFormProps {
  onSubmit?: (data: RegisterFormData) => void
  loading?: boolean
  className?: string
  termsRequired?: boolean
  defaultValues?: Partial<RegisterFormData>
}

export function RegisterForm({
  onSubmit,
  loading = false,
  className,
  termsRequired = false,
  defaultValues,
}: RegisterFormProps) {
  const { translate } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      ...defaultValues,
    },
  })

  const handleSubmit = (data: RegisterFormData) => {
    onSubmit?.(data)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {translate("auth.register.title")}
        </CardTitle>
        <CardDescription>
          {translate("auth.register.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("auth.register.name")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={translate("auth.register.namePlaceholder")}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("auth.register.email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={translate("auth.register.emailPlaceholder")}
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
                    {translate("auth.register.password")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={translate("auth.register.passwordPlaceholder")}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translate("auth.register.confirmPassword")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={translate("auth.register.confirmPasswordPlaceholder")}
                        disabled={loading}
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={loading}
                      >
                        {showConfirmPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
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

            {termsRequired && (
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm">
                        {translate("auth.register.termsLabel", {
                          terms: (
                            <a href="/terms" className="text-primary hover:underline">
                              {translate("auth.register.termsLink")}
                            </a>
                          ),
                          privacy: (
                            <a href="/privacy" className="text-primary hover:underline">
                              {translate("auth.register.privacyLink")}
                            </a>
                          )
                        })}
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading || !form.formState.isValid}
            >
              {translate("auth.register.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
