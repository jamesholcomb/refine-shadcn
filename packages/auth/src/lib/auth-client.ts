import type { 
  User, 
  Session, 
  LoginCredentials, 
  RegisterCredentials,
  BetterAuthClientOptions 
} from "@/types/auth"

export class AuthClient {
  private baseURL: string
  private fetchOptions: RequestInit

  constructor(options: BetterAuthClientOptions = {}) {
    this.baseURL = options.baseURL || '/api/auth'
    this.fetchOptions = options.fetchOptions || {}
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...this.fetchOptions.headers,
        ...options.headers,
      },
      credentials: 'include',
      ...this.fetchOptions,
      ...options,
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; session: Session }> {
    return this.request('/sign-in/email', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async logout(): Promise<void> {
    await this.request('/sign-out', {
      method: 'POST',
    })
  }

  async register(credentials: RegisterCredentials): Promise<{ user: User; session: Session }> {
    return this.request('/sign-up/email', {
      method: 'POST',
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    })
  }

  async getSession(): Promise<{ user: User; session: Session } | null> {
    try {
      return await this.request('/session')
    } catch {
      return null
    }
  }

  async refreshSession(): Promise<{ user: User; session: Session }> {
    return this.request('/session/refresh', {
      method: 'POST',
    })
  }

  async forgotPassword(email: string): Promise<void> {
    await this.request('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await this.request('/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    })
  }

  async verifyEmail(token: string): Promise<void> {
    await this.request('/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  }

  async updateProfile(data: Partial<Pick<User, 'name' | 'email'>>): Promise<User> {
    return this.request('/user/update', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.request('/user/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    })
  }
}