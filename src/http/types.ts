export interface HttpClientConfig {
  baseURL?: string
  timeout?: number
  headers?: Record<string, string>
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

export interface HttpError extends Error {
  status?: number
  statusText?: string
  data?: any
}
