import { z } from "zod";

// Login form validation schema
export const loginSchema = z.object({
    email: z.email("auth.form.emailInvalid").min(1, "auth.form.emailRequired"),
    password: z
        .string()
        .min(1, "auth.form.passwordRequired")
        .min(6, "auth.form.passwordMinLength"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register form validation schema
export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, "auth.form.nameRequired")
            .min(2, "auth.form.nameMinLength")
            .max(50, "auth.form.nameMaxLength"),
        email: z
            .email("auth.form.emailInvalid")
            .min(1, "auth.form.emailRequired"),
        password: z
            .string()
            .min(1, "auth.form.passwordRequired")
            .min(6, "auth.form.passwordMinLength")
            .max(100, "auth.form.passwordMaxLength")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "auth.form.passwordStrength",
            ),
        confirmPassword: z.string().min(1, "auth.form.confirmPasswordRequired"),
        acceptTerms: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "auth.register.passwordMismatch",
        path: ["confirmPassword"],
    })
    .refine((data) => !data.acceptTerms || data.acceptTerms === true, {
        message: "auth.form.termsRequired",
        path: ["acceptTerms"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Forgot password form validation schema
export const forgotPasswordSchema = z.object({
    email: z.email("auth.form.emailInvalid").min(1, "auth.form.emailRequired"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset password form validation schema
export const resetPasswordSchema = z
    .object({
        token: z.string().min(1, "auth.form.tokenRequired"),
        password: z
            .string()
            .min(1, "auth.form.passwordRequired")
            .min(6, "auth.form.passwordMinLength")
            .max(100, "auth.form.passwordMaxLength")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "auth.form.passwordStrength",
            ),
        confirmPassword: z.string().min(1, "auth.form.confirmPasswordRequired"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "auth.register.passwordMismatch",
        path: ["confirmPassword"],
    });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Change password form validation schema
export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, "auth.form.currentPasswordRequired"),
        newPassword: z
            .string()
            .min(1, "auth.form.passwordRequired")
            .min(6, "auth.form.passwordMinLength")
            .max(100, "auth.form.passwordMaxLength")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "auth.form.passwordStrength",
            ),
        confirmNewPassword: z
            .string()
            .min(1, "auth.form.confirmPasswordRequired"),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "auth.register.passwordMismatch",
        path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "auth.form.passwordSame",
        path: ["newPassword"],
    });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
