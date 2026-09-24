import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header/Header";
import "./DriverAvailabilityPage.css";

type Availability = "available" | "scheduled" | "unavailable";

type CalendarDay = {
  date: number;
  availability: Availability;
};

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

function getAvailability(date: number, month: number): Availability {
  if (month === 8 && [22, 23, 24].includes(date)) {
    return "available";
  }

  if (month === 8 && [21, 26].includes(date)) {
    return "scheduled";
  }

  return "unavailable";
}

function DriverAvailabilityPage() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 8, 1));
  const [selectedDate, setSelectedDate] = useState(25);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: Array<CalendarDay | null> = Array(firstDay).fill(null);

    for (let date = 1; date <= daysInMonth; date += 1) {
      days.push({
        date,
        availability: getAvailability(date, month),
      });
    }

    return days;
  }, [currentMonth]);

  const changeMonth = (offset: number) => {
    setCurrentMonth((month) =>
      new Date(month.getFullYear(), month.getMonth() + offset, 1),
    );
    setSelectedDate(1);
  };

  const monthLabel = `${currentMonth.getFullYear()}年${currentMonth.getMonth() + 1}月`;

  return (
    <div className="driverAvailability">
      <Header title="シフト管理" onBack={() => navigate(-1)} />

      <main className="driverAvailability__main">
        <section className="availabilityCalendar" aria-label="勤務可能日カレンダー">
          <div className="availabilityCalendar__heading">
            <button
              type="button"
              className="availabilityCalendar__monthButton"
              onClick={() => changeMonth(-1)}
              aria-label="前の月"
            >
              <ChevronLeft size={28} />
            </button>

            <h1>{monthLabel}</h1>

            <button
              type="button"
              className="availabilityCalendar__monthButton"
              onClick={() => changeMonth(1)}
              aria-label="次の月"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="availabilityCalendar__weekdays" aria-hidden="true">
            {weekdays.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div className="availabilityCalendar__grid">
            {calendarDays.map((day, index) => (
              <div className="availabilityCalendar__cell" key={day?.date ?? `empty-${index}`}>
                {day && (
                  <button
                    type="button"
                    className={`availabilityDay availabilityDay--${day.availability} ${
                      selectedDate === day.date && currentMonth.getMonth() === 8
                        ? "availabilityDay--selected"
                        : ""
                    }`}
                    onClick={() => setSelectedDate(day.date)}
                    aria-label={`${monthLabel}${day.date}日`}
                    aria-pressed={selectedDate === day.date}
                  >
                    <span>{day.date}</span>
                    <i aria-hidden="true" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="availabilityCalendar__legend" aria-label="勤務状況の凡例">
            <span><i className="legendDot legendDot--available" />勤務可能</span>
            <span><i className="legendDot legendDot--scheduled" />運行予定あり</span>
            <span><i className="legendDot legendDot--unavailable" />勤務不可</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DriverAvailabilityPage;