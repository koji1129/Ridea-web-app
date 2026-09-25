import { CalendarDays } from "lucide-react";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import type { ReservationState } from "./flowTypes";
import "./DateTimeSelectPage.css";

function DateTimeSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dateInputRef = useRef<HTMLInputElement>(null);

  const previous =
    (location.state as ReservationState | null) ?? {};

  const getToday = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  const [date, setDate] = useState(previous.date ?? today);
  const [time, setTime] = useState(previous.time ?? "10:00");

  const hourOptions = Array.from(
    { length: 24 },
    (_, index) => String(index).padStart(2, "0")
  );

  const minuteOptions = ["00", "15", "30", "45"];

  const [hour, minute] = time.split(":");

  const updateHourFromScroll = (scrollTop: number) => {
    const index = Math.min(
      hourOptions.length - 1,
      Math.max(0, Math.round(scrollTop / 58))
    );

    setTime(`${hourOptions[index]}:${minute}`);
  };

  const updateMinuteFromScroll = (scrollTop: number) => {
    const index = Math.min(
      minuteOptions.length - 1,
      Math.max(0, Math.round(scrollTop / 58))
    );

    setTime(`${hour}:${minuteOptions[index]}`);
  };

  const openDatePicker = () => {
    const input = dateInputRef.current;

    if (!input) return;

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {
        input.focus();
      }
    } else {
      input.focus();
      input.click();
    }
  };

  const dateLabel = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString(
        "ja-JP",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "short",
        }
      )
    : "日付を選択";

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!date || date < today) {
      alert("本日以降の日付を選択してください。");
      return;
    }

    navigate("/user/reservation/confirm", {
      state: {
        ...previous,
        date,
        time,
      },
    });
  };

  return (
    <UserScreen
      title="日時選択"
      showBack={true}
      showNavigation={false}
    >
      <div className="datetime-heading">
        <h2>到着希望日時を選択</h2>
        <p>いつまでに到着したいですか？</p>
      </div>

      <form
        className="datetime-form"
        onSubmit={handleSubmit}
      >
        <div className="datetime-date-card">
          <button
            type="button"
            className="datetime-date-trigger"
            onClick={openDatePicker}
            aria-label="到着希望日を選択"
          >
            <CalendarDays
              size={34}
              aria-hidden="true"
            />
            <span>{dateLabel}</span>
          </button>

          <input
            ref={dateInputRef}
            className="datetime-date-input"
            type="date"
            value={date}
            min={today}
            onChange={(event) =>
              setDate(event.target.value)
            }
            aria-label="到着希望日"
            tabIndex={-1}
          />
        </div>

        <div
          className="time-wheel"
          aria-label="到着希望時刻"
        >
          <div className="time-column">
            <span className="time-column-label">
              時
            </span>

            <div
              className="time-scroll"
              onScroll={(event) =>
                updateHourFromScroll(
                  event.currentTarget.scrollTop
                )
              }
            >
              {hourOptions.map((option) => (
                <button
                  className={
                    hour === option ? "selected" : ""
                  }
                  type="button"
                  key={option}
                  onClick={() =>
                    setTime(`${option}:${minute}`)
                  }
                >
                  {option}時
                </button>
              ))}
            </div>
          </div>

          <div className="time-column">
            <span className="time-column-label">
              分
            </span>

            <div
              className="time-scroll"
              onScroll={(event) =>
                updateMinuteFromScroll(
                  event.currentTarget.scrollTop
                )
              }
            >
              {minuteOptions.map((option) => (
                <button
                  className={
                    minute === option ? "selected" : ""
                  }
                  type="button"
                  key={option}
                  onClick={() =>
                    setTime(`${hour}:${option}`)
                  }
                >
                  {option}分
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="wheel-dots"
          aria-hidden="true"
        >
          <span className="active" />
          <span />
        </div>

        <p className="datetime-note">
          ※ 乗車時間ではなく、目的地への
          <br />
          到着希望時間を指定してください。
        </p>

        <button
          className="primary-button datetime-next"
          type="submit"
        >
          次へ
        </button>
      </form>
    </UserScreen>
  );
}

export default DateTimeSelectPage;