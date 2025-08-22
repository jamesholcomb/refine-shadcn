import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { AuthClient } from "@/lib/auth-client"
import { useTranslation } from "@refinedev/core"
import type { 
  AuthContextValue, 
  AuthState, 
  LoginCredentials, 
  RegisterCredentials,
  BetterAuthClientOptions 
} from "@/types/auth"

const AuthContext = createContext<AuthContextValue | null>(null)

export interface AuthProviderProps {
  children: React.ReactNode
  client?: AuthClient
  options?: BetterAuthClientOptions
}

export function AuthProvider({ 
  children, 
  client: providedClient, 
  options 
}: AuthProviderProps) {
  const { translate } = useTranslation()
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    error: null,
  })

  const client = providedClient || new AuthClient(options)

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const result = await client.login(credentials)
      
      setAuthState(prev => ({
        ...prev,
        user: result.user,
        session: result.session,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : translate("auth.login.error")
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [client, translate])

  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      
      await client.logout()
      
      setAuthState(prev => ({
        ...prev,
        user: null,
        session: null,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : translate("auth.login.error")
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [client, translate])

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const result = await client.register(credentials)
      
      setAuthState(prev => ({
        ...prev,
        user: result.user,
        session: result.session,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : translate("auth.register.error")
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      throw error
    }
  }, [client, translate])

  const refreshSession = useCallback(async () => {
    try {
      const result = await client.getSession()
      
      setAuthState(prev => ({
        ...prev,
        user: result?.user || null,
        session: result?.session || null,
        isLoading: false,
        error: null,
      }))
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        user: null,
        session: null,
        isLoading: false,
        error: null, // Session refresh errors are silent
      }))
    }
  }, [client])

  // Initialize session on mount
  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  const contextValue: AuthContextValue = {
    ...authState,
    login,
    logout,
    register,
    refreshSession,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}