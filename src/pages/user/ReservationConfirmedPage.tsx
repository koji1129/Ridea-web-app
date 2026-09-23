import {
  Car,
  Clock,
  MapPin,
  Phone,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReservationConfirmPage.css";

function ReservationConfirmedPage() {
  return (
    <UserScreen
      title="お迎えの車が決まりました"
      showBack={false}
      showNavigation={false}
    >
      <section className="reservation-confirmed-heading">
        <div className="reservation-confirmed-icon">
          <Car size={42} aria-hidden="true" />
        </div>

        <span className="status-badge">
          配車確定
        </span>

        <h2>お迎えに向かっています</h2>

        <p>
          ドライバーがお迎え場所へ向かっています。
          <br />
          到着までそのままお待ちください。
        </p>
      </section>

      <section className="reservation-confirmed-time">
        <Clock size={28} aria-hidden="true" />

        <div>
          <span>お迎え予定</span>
          <strong>09:20 ごろ</strong>
        </div>
      </section>

      <section className="info-card reservation-confirmed-driver">
        <div className="reservation-driver-icon">
          <Car size={28} aria-hidden="true" />
        </div>

        <div className="reservation-driver-info">
          <span>担当ドライバー</span>
          <strong>佐藤 太郎さん</strong>
          <p>春日井 500 あ 12-34</p>
        </div>

        <a
          href="tel:09012345678"
          className="reservation-driver-phone"
          aria-label="ドライバーへ電話"
        >
          <Phone size={24} aria-hidden="true" />
        </a>
      </section>

      <section className="reservation-confirmed-details">
        <div>
          <Clock size={22} aria-hidden="true" />

          <div>
            <span>目的地到着予定</span>
            <strong>09:40 ごろ</strong>
          </div>
        </div>

        <div>
          <Users size={22} aria-hidden="true" />

          <div>
            <span>相乗り人数</span>
            <strong>2名</strong>
          </div>
        </div>

        <div>
          <Wallet size={22} aria-hidden="true" />

          <div>
            <span>予定料金</span>
            <strong className="price">1,200円</strong>
          </div>
        </div>
      </section>

      <div className="action-stack reservation-confirmed-actions">
        <Link
          className="primary-button"
          to="/user/driver-location"
        >
          <MapPin size={20} aria-hidden="true" />
          車の位置を見る
        </Link>

        <Link
          className="secondary-button"
          to="/user/home"
        >
          ホームに戻る
        </Link>
      </div>
    </UserScreen>
  );
}

export default ReservationConfirmedPage;