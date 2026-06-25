export interface HttpClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
  onUnauthorized?: (error: HttpError) => void
}

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  params?: Record<string, string | number | boolean>
  data?: any
  timeout?: number
}

export interface HttpResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Headers
}

export interface ErrorData {
  code: number
  message: string
}

export interface HttpError extends Error {
  status?: number
  statusText?: string
  data?: ErrorData
}
