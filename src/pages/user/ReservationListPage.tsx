import { useState } from "react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReservationListPage.css";

function ReservationListPage() {
  const [showPast, setShowPast] = useState(false);

  const upcomingReservations = [
    [
      "8月20日（水）",
      "10:00 到着予定",
      "自宅 → 春日井市民病院",
      "1",
    ],
    [
      "8月22日（金）",
      "9:30 到着予定",
      "自宅 → イオン春日井店",
      "2",
    ],
    [
      "8月25日（月）",
      "11:00 到着予定",
      "自宅 → 春日井市役所",
      "3",
    ],
  ];

  const pastReservations = [
    [
      "7月28日（月）",
      "14:00 到着予定",
      "自宅 → 春日井市役所",
      "4",
    ],
    [
      "7月25日（金）",
      "09:30 到着予定",
      "自宅 → イオン春日井店",
      "5",
    ],
  ];

  const reservations = showPast
    ? pastReservations
    : upcomingReservations;

  return (
    <UserScreen
      title="予約一覧"
      showBack={false}
      showNavigation={true}
    >
      <div className="reservation-tabs">
        <button
          className={!showPast ? "active" : ""}
          type="button"
          onClick={() => setShowPast(false)}
        >
          今後の予約
        </button>

        <button
          className={showPast ? "active" : ""}
          type="button"
          onClick={() => setShowPast(true)}
        >
          過去の予約
        </button>
      </div>

      <section
        className="reservation-card-list"
        aria-label={
          showPast
            ? "過去の予約"
            : "今後の予約"
        }
      >
        {reservations.map(
          ([date, time, route, id]) => (
            <article
              className="reservation-list-card"
              key={id}
            >
              <div>
                <strong>{date}</strong>
                <span>{time}</span>
                <small>{route}</small>
              </div>

              <Link
                to={`/user/reservations/${id}`}
              >
                詳細
              </Link>
            </article>
          )
        )}
      </section>
    </UserScreen>
  );
}

export default ReservationListPage;