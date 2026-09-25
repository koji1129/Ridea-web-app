export type Reservation = {
  id: number;
  user_id: string;
  shift_id: number | null;
  status: string;
  passenger_count: number;
  start_address: string;
  start_latitude: number;
  start_longitude: number;
  end_address: string;
  end_latitude: number;
  end_longitude: number;
  desired_arrival_at: string | null;
  scheduled_pickup_at: string | null;
  fare: number | null;
  created_at: string;
  updated_at: string;
};

export type CreateReservationInput = {
  passenger_count: number;
  start_address: string;
  start_latitude: number;
  start_longitude: number;
  end_address: string;
  end_latitude: number;
  end_longitude: number;
  desired_arrival_at: string;
};

const STORAGE_KEY = "yoriai_dev_reservations";

function readReservations(): Reservation[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (!value) return [];
    const data: unknown = JSON.parse(value);
    return Array.isArray(data) ? data as Reservation[] : [];
  } catch {
    return [];
  }
}

function writeReservations(reservations: Reservation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

export async function createReservation(
  input: CreateReservationInput
): Promise<Reservation> {
  const reservations = readReservations();
  const now = new Date().toISOString();
  const reservation: Reservation = {
    id: Math.max(0, ...reservations.map((item) => item.id)) + 1,
    user_id: "demo-user",
    shift_id: null,
    status: "pending",
    passenger_count: input.passenger_count,
    start_address: input.start_address,
    start_latitude: input.start_latitude,
    start_longitude: input.start_longitude,
    end_address: input.end_address,
    end_latitude: input.end_latitude,
    end_longitude: input.end_longitude,
    desired_arrival_at: input.desired_arrival_at,
    scheduled_pickup_at: null,
    fare: null,
    created_at: now,
    updated_at: now,
  };

  writeReservations([...reservations, reservation]);
  return reservation;
}

export async function getReservations(): Promise<Reservation[]> {
  return readReservations();
}

export async function cancelReservation(
  id: number
): Promise<Reservation> {
  const reservations = readReservations();
  const index = reservations.findIndex(
    (reservation) => reservation.id === id
  );

  if (index === -1) {
    throw new Error("予約が見つかりません。");
  }

  if (
    reservations[index].status === "completed" ||
    reservations[index].status === "canceled"
  ) {
    throw new Error("この予約はキャンセルできません。");
  }

  const updated: Reservation = {
    ...reservations[index],
    status: "canceled",
    updated_at: new Date().toISOString(),
  };

  reservations[index] = updated;
  writeReservations(reservations);
  return updated;
}