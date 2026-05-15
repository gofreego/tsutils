import { HttpClient } from '../http'
import { SessionManager } from './sessionManager'
import type {
  SignInRequest,
  SignInResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutRequest,
  LogoutResponse,
  GenerateLoginTokenRequest,
  GenerateLoginTokenResponse,
  SignInWithLoginTokenRequest,
} from './struct'

const BASE_URL = '/openauth/v1'

export interface IAuthService {
  signIn(request: SignInRequest): Promise<SignInResponse>
  refreshToken(request?: Partial<RefreshTokenRequest>): Promise<RefreshTokenResponse>
  logout(request: LogoutRequest): Promise<LogoutResponse>
  generateLoginToken(request?: GenerateLoginTokenRequest): Promise<GenerateLoginTokenResponse>
  signInWithLoginToken(request: SignInWithLoginTokenRequest): Promise<SignInResponse>
  isAuthenticated(): boolean
  getAccessToken(): string | undefined
  getSessionDetails(): SignInResponse | null
  getSessionId(): string | undefined
  initializeAuth(): void
}

export class AuthService implements IAuthService {
  private static instance: AuthService
  private readonly client: HttpClient
  private readonly sessionManager: SessionManager

  private constructor(client: HttpClient) {
    this.client = client
    this.sessionManager = SessionManager.getInstance(client)
  }

  static getInstance(client: HttpClient): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(client)
    }
    return AuthService.instance
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    const response = await this.client.post<SignInResponse>(
      `${BASE_URL}/auth/signin`,
      request
    )
    if (response.data.accessToken) {
      this.sessionManager.save(response.data)
    }
    return response.data
  }

  async refreshToken(request?: Partial<RefreshTokenRequest>): Promise<RefreshTokenResponse> {
    const refreshToken = this.sessionManager.getRefreshToken()
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await this.client.post<RefreshTokenResponse>(
      `${BASE_URL}/auth/refresh`,
      { refreshToken, ...request }
    )

    if (response.data.accessToken) {
      this.sessionManager.patch({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    }

    return response.data
  }

  async logout(request: LogoutRequest): Promise<LogoutResponse> {
    try {
      request.sessionId = this.sessionManager.getSessionId()
      const response = await this.client.post<LogoutResponse>(
        `${BASE_URL}/auth/logout`,
        request || {}
      )
      return response.data
    } finally {
      this.sessionManager.clear()
    }
  }

  async generateLoginToken(request?: GenerateLoginTokenRequest): Promise<GenerateLoginTokenResponse> {
    const response = await this.client.put<GenerateLoginTokenResponse>(
      `${BASE_URL}/auth/login-token`,
      request ?? {}
    )
    return response.data
  }

  async signInWithLoginToken(request: SignInWithLoginTokenRequest): Promise<SignInResponse> {
    const response = await this.client.post<SignInResponse>(
      `${BASE_URL}/auth/signin-with-token`,
      request
    )
    if (response.data.accessToken) {
      this.sessionManager.save(response.data)
    }
    return response.data
  }

  isAuthenticated(): boolean {
    return this.sessionManager.isAuthenticated()
  }

  getAccessToken(): string | undefined {
    return this.sessionManager.getAccessToken()
  }

  getSessionDetails(): SignInResponse | null {
    return this.sessionManager.get()
  }

  getSessionId(): string | undefined {
    return this.sessionManager.getSessionId()
  }

  initializeAuth(): void {
    this.sessionManager.initialize()
  }
}