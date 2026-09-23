import {
  Car,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReturnConfirmedPage.css";

function ReturnConfirmedPage() {
  return (
    <UserScreen
      title="帰りの車が決まりました"
      showBack={false}
      showNavigation={false}
    >
      <section className="return-confirmed-heading">
        <div className="return-confirmed-icon">
          <Car size={42} aria-hidden="true" />
        </div>

        <span className="status-badge">
          配車確定
        </span>

        <h2>お迎えに向かっています</h2>

        <p>
          ドライバーが現在地へ向かっています。
          <br />
          到着までそのままお待ちください。
        </p>
      </section>

      <section className="return-confirmed-time">
        <Clock size={28} aria-hidden="true" />

        <div>
          <span>お迎え予定</span>
          <strong>16:20 ごろ</strong>
        </div>
      </section>

      <section className="info-card return-confirmed-driver">
        <div className="return-driver-icon">
          <Car size={28} aria-hidden="true" />
        </div>

        <div className="return-driver-info">
          <span>担当ドライバー</span>
          <strong>佐藤 太郎さん</strong>
          <p>春日井 500 あ 12-34</p>
        </div>

        <a
          href="tel:09012345678"
          className="return-driver-phone"
          aria-label="ドライバーへ電話"
        >
          <Phone size={24} aria-hidden="true" />
        </a>
      </section>

      <section className="return-confirmed-details">
        <div>
          <MapPin size={22} aria-hidden="true" />

          <div>
            <span>お迎え場所</span>
            <strong>春日井市民病院</strong>
          </div>
        </div>

        <div>
          <span>予定料金</span>
          <strong className="price">
            1,200円
          </strong>
        </div>
      </section>

      <div className="return-confirmed-actions">
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

export default ReturnConfirmedPage;