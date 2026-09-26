const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
  /\/$/,
  "",
);
const YAHOO_FURIGANA_URL = "https://jlp.yahooapis.jp/jsonrpc";
const YAHOO_APP_ID = import.meta.env.VITE_YAHOO_APP_ID ?? "";
const ZIP_CLOUD_URL = "https://zipcloud.ibsnet.co.jp/api/search";

export type UserRole = "passenger" | "driver";

export type User = {
  id: string;
  user_name: string;
  phone_number: string | null;
  profile_image_path: string | null;
  address_postcode: string | null;
  address: string | null;
  role: UserRole;
  current_latitude: number | null;
  current_longitude: number | null;
  created_at: string;
  updated_at: string;
};

type UserResponse = {
  user: User;
};

type ErrorResponse = {
  error?: {
    code?: string;
    message?: string;
  };
};

export type UpdateUserInput = {
  user_name?: string;
  phone_number?: string | null;
  profile_image_path?: string | null;
  address_postcode?: string | null;
  address?: string | null;
};

export type ZipCloudResult = {
  address1: string;
  address2: string;
  address3: string;
};

type ZipCloudResponse = {
  results: ZipCloudResult[] | null;
};

export class UserApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "UserApiError";
    this.status = status;
    this.code = code;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  let body: unknown;

  try {
    body = await response.json();
  } catch {
    throw new UserApiError(
      response.status,
      "INVALID_RESPONSE",
      "サーバーから不正なレスポンスが返されました。",
    );
  }

  if (!response.ok) {
    const errorBody = body as ErrorResponse;

    throw new UserApiError(
      response.status,
      errorBody.error?.code ?? "UNKNOWN_ERROR",
      errorBody.error?.message ?? "ユーザー情報の処理に失敗しました。",
    );
  }

  return body as T;
}

function createHeaders(accessToken: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

/**
 * ユーザー情報を取得します。
 *
 * GET /api/users?id=<userId>
 */
export async function getUser(
  userId: string,
  accessToken: string,
  signal?: AbortSignal,
): Promise<User> {
  const query = new URLSearchParams({ id: userId });
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/users?${query.toString()}`, {
      method: "GET",
      headers: createHeaders(accessToken),
      signal,
    });
  } catch {
    throw new UserApiError(
      0,
      "NETWORK_ERROR",
      "サーバーに接続できませんでした。",
    );
  }

  const result = await parseResponse<UserResponse>(response);
  return result.user;
}

/**
 * ユーザー情報を更新します。
 *
 * PATCH /api/users
 */
export async function updateUser(
  userId: string,
  input: UpdateUserInput,
  accessToken: string,
  signal?: AbortSignal,
): Promise<User> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/users`, {
      method: "PATCH",
      headers: createHeaders(accessToken),
      body: JSON.stringify({ id: userId, ...input }),
      signal,
    });
  } catch {
    throw new UserApiError(
      0,
      "NETWORK_ERROR",
      "サーバーに接続できませんでした。",
    );
  }

  const result = await parseResponse<UserResponse>(response);
  return result.user;
}

/** 郵便番号から住所を検索します。 */
export async function searchAddress(
  zipCode: string,
): Promise<ZipCloudResult | null> {
  const response = await fetch(
    `${ZIP_CLOUD_URL}?zipcode=${encodeURIComponent(zipCode)}`,
  );

  if (!response.ok) {
    throw new Error("住所の取得に失敗しました");
  }

  const data = (await response.json()) as ZipCloudResponse;
  return data.results?.[0] ?? null;
}

type FuriganaResponse = {
  result?: {
    word: { surface: string; furigana?: string }[];
  };
  error?: { code: number | string; message: string };
};

/**
 * Yahoo! JAPAN のルビ振りAPI（V2）から、カタカナのふりがなを取得します。
 * VITE_YAHOO_APP_ID にClient IDを設定してください（ブラウザに公開されます）。
 * 読みが付かない単語は元の表記を使い、ひらがなをカタカナに変換します。
 */
export async function getFurigana(
  text: string,
  signal?: AbortSignal,
): Promise<string> {
  if (!text.trim()) return "";

  if (!YAHOO_APP_ID.trim()) {
    throw new UserApiError(
      0,
      "MISSING_APP_ID",
      "Yahoo! JAPAN のClient IDが設定されていません。",
    );
  }

  const query = new URLSearchParams({ appid: YAHOO_APP_ID });
  let response: Response;

  try {
    response = await fetch(`${YAHOO_FURIGANA_URL}?${query.toString()}`, {
      method: "POST",
      // 公式ブラウザサンプルに合わせてContent-Typeは明示しません。
      body: JSON.stringify({
        id: "furigana",
        jsonrpc: "2.0",
        method: "jlp.furiganaservice.furigana",
        params: { q: text },
      }),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new UserApiError(
      0,
      "NETWORK_ERROR",
      "ルビ振りAPIに接続できませんでした。",
    );
  }

  let body: FuriganaResponse | null;
  try {
    body = (await response.json()) as FuriganaResponse | null;
  } catch {
    throw new UserApiError(
      response.status,
      "INVALID_RESPONSE",
      "ルビ振りAPIから不正なレスポンスが返されました。",
    );
  }

  if (!response.ok || body?.error) {
    throw new UserApiError(
      response.status,
      String(body?.error?.code ?? "UNKNOWN_ERROR"),
      body?.error?.message ?? "ふりがなの取得に失敗しました。",
    );
  }

  if (
    !Array.isArray(body?.result?.word) ||
    !body.result.word.every(
      (word) =>
        word !== null &&
        typeof word === "object" &&
        typeof word.surface === "string" &&
        (word.furigana === undefined || typeof word.furigana === "string"),
    )
  ) {
    throw new UserApiError(
      response.status,
      "INVALID_RESPONSE",
      "ルビ振りAPIから不正なレスポンスが返されました。",
    );
  }

  return body.result.word
    .map((word) => word.furigana ?? word.surface)
    .join("")
    .normalize("NFC")
    .replace(/[ぁ-ゖゝゞ]/g, (character) =>
      String.fromCharCode(character.charCodeAt(0) + 0x60),
    );
}
