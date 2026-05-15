export interface User {
  id: string;
  uuid: string;
  username: string;
  email?: string | undefined;
  phone?:
    | string
    | undefined;
  /** Display name for the user */
  name?:
    | string
    | undefined;
  /** URL to user's avatar image */
  avatarUrl?: string | undefined;
  emailVerified: boolean;
  phoneVerified: boolean;
  deactivated: boolean;
  isActive: boolean;
  isLocked: boolean;
  failedLoginAttempts: number;
  lastLoginAt?: string | undefined;
  passwordChangedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignInMetadata {
  /** Unique device identifier */
  deviceId?:
    | string
    | undefined;
  /** Human-readable device name */
  deviceName?:
    | string
    | undefined;
  /** web, mobile, desktop, tablet */
  deviceType?: string | undefined;
  lat?: number | undefined;
  long?: number | undefined;
}

/** SignInRequest for user authentication */
export interface SignInRequest {
  username: string;
  password?: string | undefined;
  otp?: string | undefined;
  rememberMe?: boolean | undefined;
  metadata?: SignInMetadata | undefined;
  profiles?: boolean | undefined;
  includePermissions?: boolean | undefined;
  verificationId?: string | undefined;
}

/** SignInResponse with authentication tokens and user data */
export interface SignInResponse {
  accessToken: string;
  refreshToken: string;
  /** Access token expiration (Unix timestamp) */
  expiresAt: string;
  /** Refresh token expiration (Unix timestamp) */
  refreshExpiresAt: string;
  user:
    | User
    | undefined;
  /** Session UUID for tracking */
  sessionId: string;
  message: string;
}

/** RefreshTokenRequest to refresh access token */
export interface RefreshTokenRequest {
  refreshToken: string;
  deviceId?: string | undefined;
  profiles?: boolean | undefined;
  includePermissions?: boolean | undefined;
}

/** RefreshTokenResponse with new tokens */
export interface RefreshTokenResponse {
  accessToken: string;
  /** New refresh token (rotation) */
  refreshToken: string;
  expiresAt: string;
  refreshExpiresAt: string;
  message: string;
}

/** LogoutRequest to end user session */
export interface LogoutRequest {
  /** Specific session to logout */
  sessionId?:
    | string
    | undefined;
  /** Logout from all devices */
  allSessions?: boolean | undefined;
}

/** LogoutResponse */
export interface LogoutResponse {
  success: boolean;
  message: string;
  /** Number of sessions ended */
  sessionsTerminated: number;
}

/** GenerateLoginTokenRequest - user is identified from Authorization header */
export interface GenerateLoginTokenRequest {
  /** Token TTL in seconds (default: 60, max: 300) */
  ttlSeconds?: number | undefined;
}

/** SignInWithLoginTokenRequest - sign in using a single-use login token */
export interface SignInWithLoginTokenRequest {
  loginToken: string;
  metadata?: SignInMetadata | undefined;
  profiles?: boolean | undefined;
  includePermissions?: boolean | undefined;
}

/** GenerateLoginTokenResponse - short-lived single-use token */
export interface GenerateLoginTokenResponse {
  /** Opaque single-use token (prefix: ltk_) */
  loginToken: string;
  /** Unix timestamp (seconds), TTL ~1 min */
  expiresAt: string;
}