export type Shift = {
  id: number;
  driver_id: number;
  car_id: number;
  start_time: string;
  end_time: string;
  status: "available" | "booked" | "completed" | "canceled";
  created_at: string;
};

type ShiftInput = {
  car_id: number;
  start_time: string;
  end_time: string;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api";

function getAccessToken() {
  return (
    localStorage.getItem("supabase_access_token") ??
    localStorage.getItem("access_token")
  );
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const accessToken = getAccessToken();
  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  });
  const body = (await response.json().catch(() => ({}))) as {
    error?: string;
  } & T;

  if (!response.ok) {
    throw new Error(body.error ?? `API request failed (${response.status})`);
  }

  return body;
}

export async function getShifts() {
  const response = await request<{ shifts: Shift[] }>("/shift");
  return response.shifts;
}

export async function createShift(input: ShiftInput) {
  const response = await request<{ shift: Shift }>("/shift", {
    method: "POST",
    body: JSON.stringify(input),
  });
  return response.shift;
}

export async function updateShift(id: number, input: ShiftInput) {
  const response = await request<{ shift: Shift }>(`/shift?id=${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
  return response.shift;
}

export async function cancelShift(id: number) {
  const response = await request<{ shift: Shift }>(`/shift?id=${id}`, {
    method: "DELETE",
  });
  return response.shift;
}