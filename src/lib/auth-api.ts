const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

type ErrorResponse = {
  error?: {
    code?: string;
    message?: string;
  };
};

export class AuthApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
    this.code = code;
  }
}

export type RegisterRequest = {
  email: string;
  password: string;
  user_name: string;
  phone_number?: string | null;
  profile_image_path?: string | null;
  address_postcode?: string | null;
  address?: string | null;
  current_latitude?: number | null;
  current_longitude?: number | null;
};

export type RegisteredUser = {
  id: string;
  user_name: string;
  phone_number: string | null;
  profile_image_path: string | null;
  address_postcode: string | null;
  address: string | null;
  role: "passenger" | "driver";
  current_latitude: number | null;
  current_longitude: number | null;
  created_at: string;
  updated_at: string;
};

export type RegisterResponse = {
  user: RegisteredUser;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthSession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  token_type: string;
};

export type LoginResponse = {
  session: AuthSession;
  user: {
    id: string;
    email?: string;
  };
};

async function request<T>(
  path: string,
  options: RequestInit,
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new AuthApiError(
      0,
      "NETWORK_ERROR",
      "サーバーに接続できませんでした。",
    );
  }

  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new AuthApiError(
      response.status,
      "INVALID_RESPONSE",
      "サーバーから不正なレスポンスが返されました。",
    );
  }

  if (!response.ok) {
    const errorBody = body as ErrorResponse;

    throw new AuthApiError(
      response.status,
      errorBody.error?.code ?? "UNKNOWN_ERROR",
      errorBody.error?.message ?? "認証処理に失敗しました。",
    );
  }

  return body as T;
}

/**
 * 新規ユーザーを登録します。
 *
 * current_latitudeとcurrent_longitudeは、
 * 両方指定するか両方省略してください。
 */
export function register(
  input: RegisterRequest,
  signal?: AbortSignal,
): Promise<RegisterResponse> {
  return request<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      user_name: input.user_name,
      phone_number: input.phone_number ?? null,
      profile_image_path: input.profile_image_path ?? null,
      address_postcode: input.address_postcode ?? null,
      address: input.address ?? null,
      current_latitude: input.current_latitude ?? null,
      current_longitude: input.current_longitude ?? null,
    }),
    signal,
  });
}

/**
 * メールアドレスとパスワードでログインします。
 */
export function login(
  input: LoginRequest,
  signal?: AbortSignal,
): Promise<LoginResponse> {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
    signal,
  });
}