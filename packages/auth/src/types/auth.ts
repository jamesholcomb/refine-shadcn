export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  emailVerified?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id: string
  userId: string
  expiresAt: Date
  token?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  error: string | null
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  refreshSession: () => Promise<void>
}

export interface BetterAuthClientOptions {
  baseURL?: string
  fetchOptions?: RequestInit
}