import type { AuthProvider as RefineAuthProvider } from "@refinedev/core"
import { AuthClient } from "@/lib/auth-client"
import type { User, LoginCredentials, RegisterCredentials } from "@/types/auth"

export interface RefineAuthProviderOptions {
  client?: AuthClient
  redirectTo?: {
    login?: string
    logout?: string
    register?: string
  }
}

export function createRefineAuthProvider({
  client = new AuthClient(),
  redirectTo = {
    login: "/login",
    logout: "/login", 
    register: "/register",
  },
}: RefineAuthProviderOptions = {}): RefineAuthProvider {
  return {
    // Login method - required
    login: async ({ email, password }: LoginCredentials) => {
      try {
        const result = await client.login({ email, password })
        
        return {
          success: true,
          redirectTo: "/",
          successNotification: {
            message: "auth.login.success",
            description: result.user.name 
              ? `auth.login.successDescription:${result.user.name}`
              : `auth.login.successDescription:${result.user.email}`,
          },
        }
      } catch (error) {
        return {
          success: false,
          error: {
            name: "LoginError",
            message: error instanceof Error ? error.message : "auth.login.error",
          },
        }
      }
    },

    // Logout method - required  
    logout: async () => {
      try {
        await client.logout()
        
        return {
          success: true,
          redirectTo: redirectTo.logout,
          successNotification: {
            message: "auth.logout.success",
            description: "auth.logout.successDescription",
          },
        }
      } catch (error) {
        return {
          success: false,
          error: {
            name: "LogoutError", 
            message: error instanceof Error ? error.message : "Logout failed",
          },
        }
      }
    },

    // Check authentication status - required
    check: async () => {
      try {
        const session = await client.getSession()
        
        if (session?.user) {
          return {
            authenticated: true,
          }
        }

        return {
          authenticated: false,
          logout: true,
          redirectTo: redirectTo.login,
          error: {
            message: "auth.errors.checkFailed",
            name: "Unauthorized",
          },
        }
      } catch (error) {
        return {
          authenticated: false,
          logout: true,
          redirectTo: redirectTo.login,
          error: {
            message: error instanceof Error ? error.message : "Authentication check failed",
            name: "CheckError",
          },
        }
      }
    },

    // Get user identity - optional
    getIdentity: async (): Promise<User | null> => {
      try {
        const session = await client.getSession()
        return session?.user || null
      } catch (error) {
        return null
      }
    },

    // Get user permissions - optional
    getPermissions: async () => {
      try {
        const session = await client.getSession()
        
        // You can customize this based on your user model
        // For now, we'll return user roles if they exist
        return (session?.user as any)?.roles || []
      } catch (error) {
        return []
      }
    },

    // Registration method - optional
    register: async ({ name, email, password }: RegisterCredentials) => {
      try {
        const result = await client.register({ name, email, password })
        
        return {
          success: true,
          redirectTo: "/",
          successNotification: {
            message: "auth.register.success",
            description: result.user.name 
              ? `auth.register.successDescription:${result.user.name}`
              : `auth.register.successDescription:${result.user.email}`,
          },
        }
      } catch (error) {
        return {
          success: false,
          error: {
            name: "RegisterError",
            message: error instanceof Error ? error.message : "auth.register.error",
          },
        }
      }
    },

    // Forgot password method - optional
    forgotPassword: async ({ email }: { email: string }) => {
      try {
        await client.forgotPassword(email)
        
        return {
          success: true,
          successNotification: {
            message: "auth.forgotPassword.success",
            description: "auth.forgotPassword.successDescription",
          },
        }
      } catch (error) {
        return {
          success: false,
          error: {
            name: "ForgotPasswordError",
            message: error instanceof Error ? error.message : "auth.forgotPassword.error",
          },
        }
      }
    },

    // Update password method - optional
    updatePassword: async ({ password, confirmPassword }: { 
      password: string
      confirmPassword: string 
      token?: string 
    }) => {
      try {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match")
        }

        // This assumes you have a method to change password
        // You might need to modify based on your better-auth implementation
        await client.changePassword("", password) // You might need current password here
        
        return {
          success: true,
          successNotification: {
            message: "auth.updatePassword.success",
            description: "auth.updatePassword.successDescription",
          },
        }
      } catch (error) {
        return {
          success: false,
          error: {
            name: "UpdatePasswordError",
            message: error instanceof Error ? error.message : "auth.updatePassword.error",
          },
        }
      }
    },

    // Handle authentication errors - optional
    onError: async (error) => {
      console.error("Authentication error:", error)
      
      if (error.status === 401 || error.status === 403) {
        return {
          logout: true,
          redirectTo: redirectTo.login,
          error: {
            message: "auth.errors.unauthorized",
            name: "Unauthorized",
          },
        }
      }

      return {
        error: {
          message: error.message || "An error occurred",
          name: error.name || "Error",
        },
      }
    },
  }
}