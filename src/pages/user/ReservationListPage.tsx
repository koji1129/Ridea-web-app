import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import {
  getReservations,
  type Reservation,
} from "../../lib/reservation-api";
import "./ReservationListPage.css";

function ReservationListPage() {
  const [showPast, setShowPast] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadReservations = async () => {
      try {
        const data = await getReservations();

        if (active) {
          setReservations(data);
          setError("");
        }
      } catch (caughtError) {
        if (active) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "予約情報を取得できませんでした。"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadReservations();

    return () => {
      active = false;
    };
  }, []);

  const getReservationDate = (reservation: Reservation) =>
    reservation.scheduled_pickup_at ??
    reservation.desired_arrival_at;

  const now = Date.now();

  const upcomingReservations = reservations
    .filter((reservation) => {
      const date = getReservationDate(reservation);

      return (
        reservation.status !== "canceled" &&
        reservation.status !== "completed" &&
        (!date || new Date(date).getTime() >= now)
      );
    })
    .sort((a, b) => {
      const aDate = getReservationDate(a);
      const bDate = getReservationDate(b);

      return (
        (aDate ? new Date(aDate).getTime() : Infinity) -
        (bDate ? new Date(bDate).getTime() : Infinity)
      );
    });

  const pastReservations = reservations
    .filter((reservation) => {
      const date = getReservationDate(reservation);

      return (
        reservation.status === "canceled" ||
        reservation.status === "completed" ||
        (date !== null && new Date(date).getTime() < now)
      );
    })
    .sort((a, b) => {
      const aDate = getReservationDate(a);
      const bDate = getReservationDate(b);

      return (
        (bDate ? new Date(bDate).getTime() : 0) -
        (aDate ? new Date(aDate).getTime() : 0)
      );
    });

  const displayedReservations = showPast
    ? pastReservations
    : upcomingReservations;

  const formatDate = (value: string | null) => {
    if (!value) return "日時未定";

    return new Date(value).toLocaleDateString("ja-JP", {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  const formatTime = (value: string | null) => {
    if (!value) return "時刻未定";

    return new Date(value).toLocaleTimeString("ja-JP", {
      timeZone: "Asia/Tokyo",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "予約申請中";
      case "accepted":
        return "予約確定";
      case "completed":
        return "利用完了";
      case "canceled":
        return "キャンセル済み";
      default:
        return status;
    }
  };

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
        aria-label={showPast ? "過去の予約" : "今後の予約"}
      >
        {loading && <p>予約情報を読み込み中...</p>}

        {!loading && error && (
          <p role="alert">{error}</p>
        )}

        {!loading &&
          !error &&
          displayedReservations.length === 0 && (
            <p>
              {showPast
                ? "過去の予約はありません。"
                : "今後の予約はありません。"}
            </p>
          )}

        {!loading &&
          !error &&
          displayedReservations.map((reservation) => {
            const arrival = reservation.desired_arrival_at;
            const pickup = reservation.scheduled_pickup_at;

            return (
              <article
                className="reservation-list-card"
                key={reservation.id}
              >
                <div>
                  <strong>{formatDate(arrival ?? pickup)}</strong>

                  <span>
                    {arrival
                      ? `${formatTime(arrival)} 到着希望`
                      : pickup
                        ? `${formatTime(pickup)} 乗車予定`
                        : "日時未定"}
                  </span>

                  <small>
                    {reservation.start_address}
                    {" → "}
                    {reservation.end_address}
                  </small>

                  <small>
                    {getStatusLabel(reservation.status)}
                  </small>
                </div>

                <Link
                  to={`/user/reservations/${reservation.id}`}
                >
                  詳細
                </Link>
              </article>
            );
          })}
      </section>
    </UserScreen>
  );
}

export default ReservationListPage;