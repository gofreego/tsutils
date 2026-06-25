import { HttpClientConfig, RequestConfig, HttpResponse, HttpError } from './types'

export class HttpClient {
  private baseURL: string
  private timeout: number
  private defaultHeaders: Record<string, string>
  private onUnauthorized?: (error: HttpError) => void

  constructor(config: HttpClientConfig = {}) {
    this.baseURL = config.baseURL || ''
    this.timeout = config.timeout || 30000
    this.defaultHeaders = config.headers || {}
    this.onUnauthorized = config.onUnauthorized
  }

  private buildURL(url: string, params?: Record<string, string | number | boolean>): string {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`
    
    if (!params) return fullURL
    
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value))
    })
    
    return `${fullURL}?${searchParams.toString()}`
  }

  private async request<T = any>(
    url: string,
    config: RequestConfig = {}
  ): Promise<HttpResponse<T>> {
    const { params, data, timeout = this.timeout, headers = {}, ...restConfig } = config

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(this.buildURL(url, params), {
        ...restConfig,
        headers: {
          'Content-Type': 'application/json',
          ...this.defaultHeaders,
          ...headers,
        },
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const error: HttpError = new Error(`HTTP Error: ${response.statusText}`)
        error.status = response.status
        error.statusText = response.statusText
        try {
          error.data = await response.json()
        } catch {
          error.data = { code: response.status, message: await response.text() }
        }
        if (response.status === 401 && this.onUnauthorized) {
          this.onUnauthorized(error)
        }
        throw error
      }

      const responseData = await response.json()

      return {
        data: responseData as T,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      }
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout')
      }
      throw error
    }
  }

  setOnUnauthorized(handler: (error: HttpError) => void): void {
    this.onUnauthorized = handler
  }

  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value
  }

  removeDefaultHeader(key: string): void {
    delete this.defaultHeaders[key]
  }

  getDefaultHeaders(): Record<string, string> {
    return { ...this.defaultHeaders }
  }

  get<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'GET' })
  }

  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, data, method: 'POST' })
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, data, method: 'PUT' })
  }

  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, data, method: 'PATCH' })
  }

  delete<T = any>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>(url, { ...config, method: 'DELETE' })
  }
}

export function extractErrorMessage(error: any): string {
  if (error instanceof Error) {
    const httpError = error as HttpError
    if (httpError.data) {
      return httpError.data.message
    }
    return error.message
  }
  return 'An unexpected error occurred'
}
