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
import { useTranslation } from "@refinedev/core"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validation"

export interface ForgotPasswordFormProps {
  onSubmit?: (data: ForgotPasswordFormData) => void
  loading?: boolean
  className?: string
  backToLoginEnabled?: boolean
  onBackToLogin?: () => void
  defaultValues?: Partial<ForgotPasswordFormData>
}

export function ForgotPasswordForm({
  onSubmit,
  loading = false,
  className,
  backToLoginEnabled = true,
  onBackToLogin,
  defaultValues,
}: ForgotPasswordFormProps) {
  const { translate } = useTranslation()
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      ...defaultValues,
    },
  })

  const handleSubmit = (data: ForgotPasswordFormData) => {
    onSubmit?.(data)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="text-2xl">
            {translate("auth.forgotPassword.checkEmailTitle")}
          </CardTitle>
          <CardDescription>
            {translate("auth.forgotPassword.checkEmailDescription", { email: form.getValues("email") })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <p className="text-sm text-muted-foreground">
              {translate("auth.forgotPassword.checkEmailNote")}
            </p>
            {backToLoginEnabled && (
              <Button
                variant="outline"
                className="w-full"
                onClick={onBackToLogin}
                disabled={loading}
              >
                {translate("auth.forgotPassword.backToLogin")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">
          {translate("auth.forgotPassword.title")}
        </CardTitle>
        <CardDescription>
          {translate("auth.forgotPassword.description")}
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
                    {translate("auth.forgotPassword.email")}
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
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading || !form.formState.isValid}
            >
              {translate("auth.forgotPassword.submit")}
            </Button>
            {backToLoginEnabled && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onBackToLogin}
                disabled={loading}
              >
                {translate("auth.forgotPassword.backToLogin")}
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
