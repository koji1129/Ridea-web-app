import {
  Car,
  Clock,
  MapPin,
  Phone,
  ShieldAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./RideActivePage.css";

function RideActivePage() {
  const navigate = useNavigate();

  return (
    <UserScreen
      title="乗車中"
      showBack={false}
      showNavigation={false}
    >
      <section className="info-card">
        <Car size={32} aria-hidden="true" />

        <div>
          <strong>春日井市民病院へ向かっています</strong>
          <p>安全運転で目的地までお送りします</p>
        </div>
      </section>

      <section className="ride-active-status">
        <div>
          <Clock size={28} aria-hidden="true" />
          <span>到着予定</span>
          <strong>9:40 ごろ</strong>
        </div>

        <div>
          <MapPin size={28} aria-hidden="true" />
          <span>目的地</span>
          <strong>春日井市民病院</strong>
        </div>
      </section>

      <div
        className="map-placeholder"
        role="img"
        aria-label="現在地の地図"
      >
        地図API接続まで準備中
        <br />
        <small>現在の走行位置を表示します</small>
      </div>

      <section className="info-card">
        <Car size={28} aria-hidden="true" />

        <div>
          <strong>山田 太郎さん</strong>
          <p>車両番号：春日井 500 あ 12-34</p>
        </div>

        <a
          href="tel:09012345678"
          className="ride-driver-phone"
          aria-label="ドライバーへ電話"
        >
          <Phone size={26} aria-hidden="true" />
        </a>
      </section>

      <button
        className="danger-button ride-emergency-button"
        type="button"
        onClick={() => navigate("/user/emergency")}
      >
        <ShieldAlert size={26} aria-hidden="true" />
        緊急連絡
      </button>

      <button
        className="primary-button ride-arrival-button"
        type="button"
        onClick={() => navigate("/user/ride-complete")}
      >
        目的地に到着
      </button>
    </UserScreen>
  );
}

export default RideActivePage;