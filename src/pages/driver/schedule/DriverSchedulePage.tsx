import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  cancelShift,
  createShift,
  getShifts,
  updateShift,
  type Shift,
} from "../../../lib/shift-api";
import "../DriverHome.css";
import "./DriverSchedule.css";

type ScheduleStatus =
  | "available"
  | "assigned"
  | "unavailable";

type Schedule = {
  status: ScheduleStatus;
  startTime?: string;
  endTime?: string;
  shiftId?: number;
};

type ScheduleMap = Record<string, Schedule>;

const WEEKDAYS = [
  "日",
  "月",
  "火",
  "水",
  "木",
  "金",
  "土",
];

const initialSchedules: ScheduleMap = {
  "2026-09-21": {
    status: "assigned",
    startTime: "09:00",
    endTime: "18:00",
  },
  "2026-09-22": {
    status: "available",
    startTime: "09:00",
    endTime: "18:00",
  },
  "2026-09-23": {
    status: "unavailable",
  },
  "2026-09-24": {
    status: "available",
    startTime: "10:00",
    endTime: "17:00",
  },
  "2026-09-26": {
    status: "assigned",
    startTime: "08:30",
    endTime: "16:30",
  },
};

const defaultCarId = Number(import.meta.env.VITE_DRIVER_CAR_ID ?? "1");

function formatShiftDate(date: Date) {
  return formatDateKey(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatShiftTime(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

function scheduleFromShift(shift: Shift): [string, Schedule] {
  const start = new Date(shift.start_time);
  const end = new Date(shift.end_time);
  return [
    formatShiftDate(start),
    {
      shiftId: shift.id,
      status: shift.status === "booked" ? "assigned" : "available",
      startTime: formatShiftTime(start),
      endTime: formatShiftTime(end),
    },
  ];
}

function formatDateKey(
  year: number,
  month: number,
  day: number
) {
  return `${year}-${String(month + 1).padStart(
    2,
    "0"
  )}-${String(day).padStart(2, "0")}`;
}

function DriverSchedulePage() {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] =
    useState(new Date(2026, 8, 1));

  const [selectedDate, setSelectedDate] =
    useState("2026-09-22");

  const [schedules, setSchedules] =
    useState<ScheduleMap>(initialSchedules);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    getShifts()
      .then((shifts) => {
        setSchedules(Object.fromEntries(shifts.map(scheduleFromShift)));
      })
      .catch((error: unknown) => {
        setApiError(
          error instanceof Error ? error.message : "シフトを読み込めませんでした",
        );
      });
  }, []);

  const selectedSchedule =
    schedules[selectedDate] ?? {
      status: "available" as ScheduleStatus,
      startTime: "09:00",
      endTime: "18:00",
    };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const calendarDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    ),
  ];

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  const changeMonth = (amount: number) => {
    setCurrentDate(
      new Date(year, month + amount, 1)
    );
  };

  const updateSelectedSchedule = (
    updates: Partial<Schedule>
  ) => {
    setSchedules((current) => ({
      ...current,
      [selectedDate]: {
        ...selectedSchedule,
        ...updates,
      },
    }));
  };

  const handleSave = async () => {
    setApiError(null);

    try {
      if (!Number.isInteger(defaultCarId) || defaultCarId <= 0) {
        throw new Error("VITE_DRIVER_CAR_ID を正しく設定してください");
      }

      const shift = schedules[selectedDate];
      if (shift?.status === "unavailable") {
        if (shift.shiftId !== undefined) await cancelShift(shift.shiftId);
        setSchedules((current) => {
          const next = { ...current };
          delete next[selectedDate];
          return next;
        });
        return;
      }

      const input = {
        car_id: defaultCarId,
        start_time: new Date(
          `${selectedDate}T${shift?.startTime ?? "09:00"}`,
        ).toISOString(),
        end_time: new Date(
          `${selectedDate}T${shift?.endTime ?? "18:00"}`,
        ).toISOString(),
      };
      const savedShift =
        shift?.shiftId !== undefined
          ? await updateShift(shift.shiftId, input)
          : await createShift(input);
      const [dateKey, savedSchedule] = scheduleFromShift(savedShift);
      setSchedules((current) => ({ ...current, [dateKey]: savedSchedule }));
    } catch (error: unknown) {
      setApiError(
        error instanceof Error ? error.message : "シフトを保存できませんでした",
      );
    }
  };

  const selectedDateObject =
    new Date(`${selectedDate}T00:00:00`);

  const selectedDateLabel =
    `${selectedDateObject.getMonth() + 1}月` +
    `${selectedDateObject.getDate()}日` +
    `（${WEEKDAYS[selectedDateObject.getDay()]}）`;

  return (
    <div className="driverSchedule">
      <div className="driverSchedule__container">
        <header className="driverSchedule__header">
          <button
            type="button"
            className="driverSchedule__back"
            onClick={() => navigate("/driver")}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>シフト管理</h1>
        </header>

        <main className="driverSchedule__main">
          {apiError && (
            <p role="alert" className="driverSchedule__error">
              {apiError}
            </p>
          )}

          <section className="driverSchedule__intro">
            <div className="driverSchedule__introIcon">
              <CalendarDays size={25} />
            </div>

            <div>
              <h2>勤務可能な日を登録</h2>

              <p>
                YORIAIで運行できる日時を
                登録してください。
              </p>
            </div>
          </section>

          <section className="scheduleCalendar">
            <div className="scheduleCalendar__header">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="前の月"
              >
                <ChevronLeft size={23} />
              </button>

              <h2>
                {year}年{month + 1}月
              </h2>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="次の月"
              >
                <ChevronRight size={23} />
              </button>
            </div>

            <div className="scheduleCalendar__weekdays">
              {WEEKDAYS.map((weekday, index) => (
                <div
                  key={weekday}
                  className={
                    index === 0
                      ? "scheduleCalendar__sunday"
                      : index === 6
                        ? "scheduleCalendar__saturday"
                        : ""
                  }
                >
                  {weekday}
                </div>
              ))}
            </div>

            <div className="scheduleCalendar__days">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="scheduleCalendar__empty"
                    />
                  );
                }

                const dateKey = formatDateKey(
                  year,
                  month,
                  day
                );

                const schedule =
                  schedules[dateKey];

                const dayStatus =
                  schedule?.status ?? "unavailable";

                const isSelected =
                  selectedDate === dateKey;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    className={[
                      "scheduleCalendar__day",
                      `scheduleCalendar__day--${dayStatus}`,
                      isSelected
                        ? "scheduleCalendar__day--selected"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      setSelectedDate(dateKey)
                    }
                    aria-label={`${month + 1}月${day}日: ${
                      dayStatus === "available"
                        ? "勤務可能"
                        : dayStatus === "assigned"
                          ? "運行予定あり"
                          : "勤務不可"
                    }`}
                  >
                    <span>{day}</span>

                    <span
                      className={`scheduleCalendar__status scheduleCalendar__status--${dayStatus}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="scheduleCalendar__legend">
              <div>
                <span className="scheduleCalendar__legendDot scheduleCalendar__legendDot--available" />
                勤務可能
              </div>

              <div>
                <span className="scheduleCalendar__legendDot scheduleCalendar__legendDot--assigned" />
                運行予定あり
              </div>

              <div>
                <span className="scheduleCalendar__legendDot scheduleCalendar__legendDot--unavailable" />
                勤務不可
              </div>
            </div>
          </section>

          <section className="scheduleEditor">
            <div className="scheduleEditor__heading">
              <div>
                <span>選択した日</span>
                <h2>{selectedDateLabel}</h2>
              </div>

              {selectedSchedule.status ===
                "assigned" && (
                <span className="scheduleEditor__assignedBadge">
                  運行予定あり
                </span>
              )}
            </div>

            {selectedSchedule.status ===
            "assigned" ? (
              <div className="scheduleEditor__locked">
                <CalendarDays size={25} />

                <div>
                  <strong>
                    この日は運行予定があります
                  </strong>

                  <p>
                    運行が割り当てられているため、
                    シフトを変更できません。
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="scheduleEditor__statusButtons">
                  <button
                    type="button"
                    className={
                      selectedSchedule.status ===
                      "available"
                        ? "scheduleEditor__statusButton scheduleEditor__statusButton--active"
                        : "scheduleEditor__statusButton"
                    }
                    onClick={() =>
                      updateSelectedSchedule({
                        status: "available",
                        startTime:
                          selectedSchedule.startTime ??
                          "09:00",
                        endTime:
                          selectedSchedule.endTime ??
                          "18:00",
                      })
                    }
                  >
                    勤務可能
                  </button>

                  <button
                    type="button"
                    className={
                      selectedSchedule.status ===
                      "unavailable"
                        ? "scheduleEditor__statusButton scheduleEditor__statusButton--unavailable"
                        : "scheduleEditor__statusButton"
                    }
                    onClick={() =>
                      updateSelectedSchedule({
                        status: "unavailable",
                      })
                    }
                  >
                    勤務不可
                  </button>
                </div>

                {selectedSchedule.status ===
                  "available" && (
                  <div className="scheduleEditor__time">
                    <div className="scheduleEditor__timeTitle">
                      <Clock3 size={20} />
                      <span>勤務可能時間</span>
                    </div>

                    <div className="scheduleEditor__timeInputs">
                      <label>
                        <span>開始</span>

                        <input
                          type="time"
                          value={
                            selectedSchedule.startTime ??
                            "09:00"
                          }
                          onChange={(event) =>
                            updateSelectedSchedule({
                              startTime:
                                event.target.value,
                            })
                          }
                        />
                      </label>

                      <span className="scheduleEditor__timeSeparator">
                        〜
                      </span>

                      <label>
                        <span>終了</span>

                        <input
                          type="time"
                          value={
                            selectedSchedule.endTime ??
                            "18:00"
                          }
                          onChange={(event) =>
                            updateSelectedSchedule({
                              endTime:
                                event.target.value,
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="scheduleEditor__save"
                  onClick={handleSave}
                >
                  <Save size={20} />
                  シフトを保存する
                </button>
              </>
            )}
          </section>

          <div className="driverSchedule__notice">
            <strong>シフトについて</strong>

            <p>
              登録した勤務可能時間をもとに、
              YORIAIが運行を割り当てます。
              運行が確定した日は変更できません。
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverSchedulePage;