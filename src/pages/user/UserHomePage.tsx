
import {
  Bell,
  CalendarPlus,
  Car,
  CircleHelp,
  ClipboardList,
  Clock,
  House,
  MapPin,
  RotateCcw,
  Settings,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import {
  getReservations,
  type Reservation,
} from "../../lib/reservation-api";
import { getUser } from "../../lib/user-api";
import "./UserHomePage.css";

type RideStatus =
  | "none"
  | "reserved"
  | "waiting"
  | "riding"
  | "outbound_completed"
  | "return_waiting"
  | "return_riding";

const RIDE_STATUS_KEY = "yoriai_ride_status";

const validStatuses: RideStatus[] = [
  "reserved",
  "waiting",
  "riding",
  "outbound_completed",
  "return_waiting",
  "return_riding",
];

function getJapanDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

function formatTime(value: string | null): string {
  if (!value) return "時刻未定";

  return new Date(value).toLocaleTimeString("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value: string | null): string {
  if (!value) return "日付未定";

  return new Date(value).toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "long",
    day: "numeric",
  });
}

function getSavedRideStatus(reservationId: number): RideStatus {
  try {
    const raw = localStorage.getItem(RIDE_STATUS_KEY);
    if (!raw) return "reserved";

    const saved: unknown = JSON.parse(raw);

    if (
      typeof saved !== "object" ||
      saved === null ||
      Array.isArray(saved)
    ) {
      return "reserved";
    }

    const status =
      (saved as Record<string, unknown>)[String(reservationId)];

    return validStatuses.includes(status as RideStatus)
      ? (status as RideStatus)
      : "reserved";
  } catch {
    return "reserved";
  }
}

function UserHomePage() {
  const [userName, setUserName] = useState("");
  const [userError, setUserError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const accessToken = localStorage.getItem("access_token");

        if (!userId || !accessToken) {
          throw new Error("ログイン情報がありません");
        }

        const user = await getUser(userId, accessToken, controller.signal);
        if (!controller.signal.aborted) setUserName(user.user_name);
      } catch {
        if (!controller.signal.aborted) {
          setUserError("利用者の名前を取得できませんでした");
        }
      }
    };

    void loadUser();
    return () => controller.abort();
  }, []);

  const [rideStatus, setRideStatus] = useState<RideStatus>("none");
  const [todayReservation, setTodayReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    let active = true;

    const loadReservation = async () => {
      try {
        const reservations = await getReservations();
        const today = getJapanDate(new Date());

        const todayReservations = reservations
          .filter((reservation) => {
            if (
              reservation.status === "canceled" ||
              reservation.status === "completed"
            ) {
              return false;
            }

            const date =
              reservation.scheduled_pickup_at ??
              reservation.desired_arrival_at;

            return date !== null && getJapanDate(date) === today;
          })
          .sort((a, b) => {
            const aDate =
              a.scheduled_pickup_at ??
              a.desired_arrival_at ??
              "";

            const bDate =
              b.scheduled_pickup_at ??
              b.desired_arrival_at ??
              "";

            return aDate.localeCompare(bDate);
          });

        if (!active) return;

        const reservation = todayReservations[0] ?? null;

        setTodayReservation(reservation);
        setRideStatus(
          reservation
            ? getSavedRideStatus(reservation.id)
            : "none"
        );
      } catch (error) {
        console.error("予約情報の取得に失敗しました", error);
      }
    };

    void loadReservation();

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key === RIDE_STATUS_KEY ||
        event.key === "yoriai_dev_reservations"
      ) {
        void loadReservation();
      }
    };

    const handleFocus = () => {
      void loadReservation();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);

    return () => {
      active = false;
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const nextStatus = (status: RideStatus) => {
    setRideStatus(status);

    if (!todayReservation) return;

    try {
      const raw = localStorage.getItem(RIDE_STATUS_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : {};

      const saved: Record<string, unknown> =
        typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed)
          ? (parsed as Record<string, unknown>)
          : {};

      saved[String(todayReservation.id)] = status;

      localStorage.setItem(
        RIDE_STATUS_KEY,
        JSON.stringify(saved)
      );
    } catch (error) {
      console.error("ステータスの保存に失敗しました", error);
    }
  };

  const reservationDate =
    todayReservation?.scheduled_pickup_at ??
    todayReservation?.desired_arrival_at ??
    null;

  return (
    <UserScreen
      title=""
      showBack={false}
      showNavigation={false}
      showHeader={false}
    >
      <header className="home-brand" aria-label="YORIAI">
      </header>

      <section className="home-intro">
        <p>こんにちは</p>
        <h1>
          {userName || (userError ? "利用者" : "読み込み中...")}
          {userName && <small>さん</small>}
        </h1>
      </section>

      {userError && <p className="error-message" role="alert">{userError}</p>}

      {rideStatus === "none" && (
        <section className="ride-card ride-card-empty">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <CalendarPlus size={22} aria-hidden="true" />
            </span>
            <strong>現在の予約</strong>
          </div>

          <h2>予約はありません</h2>

          <p className="ride-card-message">
            お出かけの予定が決まったら予約できます
          </p>

          <Link
            to="/user/reservation/pickup"
            className="primary-button ride-card-button"
          >
            予約する
          </Link>
        </section>
      )}

      {rideStatus === "reserved" && todayReservation && (
        <section className="ride-card">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <Clock size={22} aria-hidden="true" />
            </span>
            <strong>次のお迎え</strong>
          </div>

          <p className="ride-countdown">
            {todayReservation.scheduled_pickup_at
              ? `${formatTime(todayReservation.scheduled_pickup_at)} お迎え予定`
              : `${formatTime(todayReservation.desired_arrival_at)} 到着希望`}
          </p>

          <p className="ride-arrival">
            {formatDate(reservationDate)}
          </p>

          <p className="ride-destination">
            {todayReservation.end_address}行き
          </p>

         <button
          type="button"
          onClick={() => nextStatus("waiting")}
          className="primary-button ride-card-button"
        >
          お迎え開始
        </button>
        </section>
      )}

      {rideStatus === "waiting" && (
        <section className="ride-card">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <Car size={22} aria-hidden="true" />
            </span>
            <strong>お迎えに向かっています</strong>
          </div>

          <p className="ride-countdown">
            あと <strong>12</strong> 分
          </p>

          <p className="ride-arrival">
            {todayReservation?.scheduled_pickup_at
              ? `${formatTime(todayReservation.scheduled_pickup_at)} ごろ到着予定`
              : "9:20 ごろ到着予定"}
          </p>

          <p className="ride-destination">
            乗車地点：{todayReservation?.start_address ?? "自宅"}
          </p>

          <button
            type="button"
            onClick={() => nextStatus("riding")}
            className="primary-button ride-card-button"
          >
            <MapPin size={20} aria-hidden="true" />
            乗車開始
          </button>
        </section>
      )}

      {rideStatus === "riding" && (
        <section className="ride-card">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <Car size={22} aria-hidden="true" />
            </span>
            <strong>乗車中</strong>
          </div>

          <p className="ride-countdown">
            あと <strong>12</strong> 分
          </p>

          <p className="ride-arrival">
            {todayReservation?.desired_arrival_at
              ? `${formatTime(todayReservation.desired_arrival_at)} ごろ到着予定`
              : "9:40 ごろ到着予定"}
          </p>

          <p className="ride-destination">
            {todayReservation?.end_address ?? "春日井市民病院"}行き
          </p>

          <button
            type="button"
            onClick={() => nextStatus("outbound_completed")}
            className="primary-button ride-card-button"
          >
            目的地に到着
          </button>
        </section>
      )}

      {rideStatus === "outbound_completed" && (
        <section className="ride-card ride-card-return">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <House size={22} aria-hidden="true" />
            </span>
            <strong>目的地に到着しました</strong>
          </div>

          <h2>帰りますか？</h2>

          <p className="ride-card-message">
            帰るときはこちらから車を呼べます
          </p>

          <button
            type="button"
            onClick={() => nextStatus("return_waiting")}
            className="primary-button ride-card-button"
          >
            <RotateCcw size={20} aria-hidden="true" />
            帰る
          </button>
        </section>
      )}

      {rideStatus === "return_waiting" && (
        <section className="ride-card ride-card-return-waiting">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <Car size={22} aria-hidden="true" />
            </span>
            <strong>帰りの車がお迎え中です</strong>
          </div>

          <p className="ride-countdown">
            あと <strong>8</strong> 分
          </p>

          <p className="ride-arrival">
            16:20 ごろ到着予定
          </p>

          <p className="ride-destination">
            {todayReservation?.end_address ?? "春日井市民病院"}へお迎え
          </p>

          <button
            type="button"
            onClick={() => nextStatus("return_riding")}
            className="primary-button ride-card-button"
          >
            <MapPin size={20} aria-hidden="true" />
            乗車開始
          </button>
        </section>
      )}

      {rideStatus === "return_riding" && (
        <section className="ride-card">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <House size={22} aria-hidden="true" />
            </span>
            <strong>帰宅中</strong>
          </div>

          <p className="ride-countdown">
            あと <strong>15</strong> 分
          </p>

          <p className="ride-arrival">
            16:45 ごろ到着予定
          </p>

          <p className="ride-destination">
            {todayReservation?.start_address ?? "自宅"}へ向かっています
          </p>

          <button
            type="button"
            onClick={() => nextStatus("none")}
            className="primary-button ride-card-button"
          >
            帰宅完了
          </button>
        </section>
      )}

      <section
        className="home-menu-grid"
        aria-label="ホームメニュー"
      >
        <Link
          to="/user/reservation/pickup"
          className="home-menu-item"
        >
          <CalendarPlus aria-hidden="true" />
          <span>予約する</span>
        </Link>

        <Link
          to="/user/reservations"
          className="home-menu-item"
        >
          <ClipboardList aria-hidden="true" />
          <span>予約一覧</span>
        </Link>

        <Link
          to="/user/pickup-today"
          className="home-menu-item"
        >
          <Bell aria-hidden="true" />
          <span>お知らせ</span>
        </Link>

        <Link
          to="/user/settings/profile"
          className="home-menu-item"
        >
          <UserRound aria-hidden="true" />
          <span>マイページ</span>
        </Link>

        <Link
          to="/user/faq"
          className="home-menu-item"
        >
          <CircleHelp aria-hidden="true" />
          <span>よくある質問</span>
        </Link>

        <Link
          to="/user/settings"
          className="home-menu-item"
        >
          <Settings aria-hidden="true" />
          <span>設定</span>
        </Link>
      </section>
    </UserScreen>
  );
}

export default UserHomePage;
