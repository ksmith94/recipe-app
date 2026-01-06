export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestContext {
  baseURL: string;
  headers?: Record<string, string>;
  fetcher?: typeof fetch;
  timeoutMs?: number;
}

export interface RequestConfig {
  path: string;
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal: AbortSignal;
}

export type RequestOptions = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
  retry?: { maxRetries?: number };
  query?: Record<string, string | number | boolean | undefined>;
};

export interface Middleware {
  name: string;
  before?: (
    cfg: RequestConfig,
    ctx: RequestContext
  ) => Promise<RequestConfig> | RequestConfig;
  after?: (
    res: Response,
    cfg: RequestConfig,
    ctx: RequestContext
  ) => Promise<Response> | Response;
  onError?: (
    err: unknown,
    cfg: RequestConfig,
    ctx: RequestContext
  ) => Promise<never> | never;
}

export class ApiError extends Error {
  status: number;
  data: unknown | null;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export type ApiClientOptions = {
  baseUrl?: string;
  getAuthToken?: () => string | null;
  defaultHeaders?: Record<string, string>;
  timeoutMs?: number;
  maxRetries?: number;
};

function buildQuery(query?: RequestOptions['query']) {
  if (!query) return '';
  const params = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v !== undefined && v !== null) {
      params.append(k, String(v));
    }
  });
  const qs = params.toString();
  return qs ? `?${qs}` : '';
}

class Client {
  private baseUrl: string;
  private getAuthToken?: ApiClientOptions['getAuthToken'];
  private defaultHeaders?: Record<string, string>;
  private timeoutMs: number;
  private maxRetries: number;

  /**
   *
   * @param opts
   */
  constructor(opts: ApiClientOptions = {}) {
    this.baseUrl = opts.baseUrl ?? '';
    this.getAuthToken = opts.getAuthToken;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...(opts.defaultHeaders ?? {}),
    };
    this.timeoutMs = opts.timeoutMs ?? 15000;
    this.maxRetries = opts.maxRetries ?? 1;
  }

  private withTimeout(signal: AbortSignal | undefined, timeoutMs: number) {
    if (signal) return signal;
    const controller = new AbortController();
    setTimeout(
      () => controller.abort(new DOMException('Timeout', 'AbortError')),
      timeoutMs
    );

    return controller.signal;
  }

  private async request<TResponse>(
    method: HttpMethod,
    opts: RequestOptions,
    path: string,
    body?: unknown
  ): Promise<TResponse> {
    const url = `${this.baseUrl}${path}${buildQuery(opts?.query)}`;

    const headers = {
      ...this.defaultHeaders,
      ...(opts.headers ?? {}),
    };

    const token = this.getAuthToken?.();
    if (token) headers['token'] = `Bearer ${token}`;

    const timeoutMs = opts.timeoutMs ?? this.timeoutMs;
    const signal = this.withTimeout(opts.signal, timeoutMs);

    const maxRetries = opts.retry?.maxRetries ?? this.maxRetries;
    let attempt = 0;
    let lastErr: unknown;

    while (attempt < maxRetries) {
      try {
        const res = await fetch(url, {
          method,
          headers,
          body: body !== undefined ? JSON.stringify(body) : undefined,
          signal,
        });

        const contentType = res.headers.get('content-type') ?? '';
        const isJson = contentType.includes('application/json');

        if (!res.ok) {
          const errorPayload = isJson
            ? await res.json().catch(() => null)
            : await res.text().catch(() => null);

          if (res.status >= 500 && attempt < maxRetries) {
            attempt++;
            await new Promise((r) => setTimeout(r, 250 * attempt));
            continue;
          }

          throw new ApiError(
            `HTTP ${res.status} ${res.statusText}`,
            res.status,
            errorPayload ?? null
          );
        }

        if (res.status === 204) {
          return undefined as TResponse;
        }

        const data = isJson
          ? await res.json()
          : ((await res.text()) as unknown);

        return data as TResponse;
      } catch (err) {
        if (attempt < maxRetries) {
          attempt++;
          lastErr = err;
          await new Promise((r) => setTimeout(r, 250 * attempt));
          continue;
        }
        throw err;
      }
    }

    throw lastErr instanceof Error ? lastErr : new Error('Request failed');
  }

  get() {}

  post() {}

  put() {}

  patch() {}

  delete() {}
}

export default Client;
