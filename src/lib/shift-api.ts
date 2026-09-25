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

const STORAGE_KEY = "yoriai_dev_shifts";

function readShifts(): Shift[] {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) as Shift[] : [];
  } catch {
    return [];
  }
}

function writeShifts(shifts: Shift[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shifts));
}

export async function getShifts(): Promise<Shift[]> {
  return readShifts().filter((shift) => shift.status !== "canceled");
}

export async function createShift(input: ShiftInput): Promise<Shift> {
  const shifts = readShifts();
  const shift: Shift = {
    ...input,
    id: Date.now(),
    driver_id: 1,
    status: "available",
    created_at: new Date().toISOString()
  };
  writeShifts([...shifts, shift]);
  return shift;
}

export async function updateShift(id: number, input: ShiftInput): Promise<Shift> {
  const shifts = readShifts();
  const index = shifts.findIndex((shift) => shift.id === id);
  if (index === -1) throw new Error("シフトが見つかりません");
  if (shifts[index].status !== "available") {
    throw new Error("確定済みのシフトは変更できません");
  }
  const updated = { ...shifts[index], ...input };
  shifts[index] = updated;
  writeShifts(shifts);
  return updated;
}

export async function cancelShift(id: number): Promise<Shift> {
  const shifts = readShifts();
  const index = shifts.findIndex((shift) => shift.id === id);
  if (index === -1) throw new Error("シフトが見つかりません");
  if (shifts[index].status !== "available") {
    throw new Error("確定済みのシフトは削除できません");
  }
  const canceled: Shift = { ...shifts[index], status: "canceled" };
  shifts[index] = canceled;
  writeShifts(shifts);
  return canceled;
}