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
import { useState } from "react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./UserHomePage.css";

type RideStatus =
  | "none"
  | "reserved"
  | "waiting"
  | "riding"
  | "outbound_completed"
  | "return_matching"
  | "return_waiting"
  | "return_riding";

function UserHomePage() {
  const [rideStatus] = useState<RideStatus>("return_waiting");

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
          山田 太郎
          <small>さん</small>
        </h1>
      </section>

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

      {rideStatus === "reserved" && (
        <section className="ride-card">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <Clock size={22} aria-hidden="true" />
            </span>
            <strong>次のお迎え</strong>
          </div>

          <p className="ride-countdown">
            9:20 お迎え予定
          </p>

          <p className="ride-arrival">
            8月20日
          </p>

          <p className="ride-destination">
            春日井市民病院行き
          </p>

          <Link
            to="/user/reservations"
            className="ride-card-link"
          >
            予約を確認する
          </Link>
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
            9:20 ごろ到着予定
          </p>

          <p className="ride-destination">
            乗車地点：自宅
          </p>

          <Link
            to="/user/driver-location"
            className="primary-button ride-card-button"
          >
            <MapPin size={20} aria-hidden="true" />
            車の位置を見る
          </Link>
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
            9:40 ごろ到着予定
          </p>

          <p className="ride-destination">
            春日井市民病院行き
          </p>

          <Link
            to="/user/ride"
            className="primary-button ride-card-button"
          >
            乗車状況を見る
          </Link>
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

          <Link
            to="/user/return"
            className="primary-button ride-card-button"
          >
            <RotateCcw size={20} aria-hidden="true" />
            帰る
          </Link>
        </section>
      )}

      {rideStatus === "return_matching" && (
        <section className="ride-card">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <Car size={22} aria-hidden="true" />
            </span>
            <strong>帰りの車を探しています</strong>
          </div>

          <h2>マッチング中です</h2>

          <p className="ride-card-message">
            ドライバーが決まるまでお待ちください
          </p>

          <Link
            to="/user/return/matching"
            className="primary-button ride-card-button"
          >
            状況を確認する
          </Link>
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
            春日井市民病院へお迎え
          </p>

          <Link
            to="/user/return/confirmed"
            className="primary-button ride-card-button"
          >
            <MapPin size={20} aria-hidden="true" />
            お迎え状況を見る
          </Link>
        </section>
      )}

      {rideStatus === "return_riding" && (
        <section className="ride-card">
          <div className="ride-card-heading">
            <span className="ride-card-icon">
              <House size={22} aria-hidden="true" />
            </span>
            <strong>帰宅中です</strong>
          </div>

          <p className="ride-countdown">
            あと <strong>15</strong> 分
          </p>

          <p className="ride-arrival">
            16:45 ごろ到着予定
          </p>

          <p className="ride-destination">
            自宅へ向かっています
          </p>

          <Link
            to="/user/ride"
            className="primary-button ride-card-button"
          >
            乗車状況を見る
          </Link>
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