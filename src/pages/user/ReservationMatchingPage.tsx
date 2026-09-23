import {
  Car,
  Clock,
  House,
  Search,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReservationMatchingPage.css";

function ReservationMatchingPage() {
  const { id } = useParams();

  return (
    <UserScreen
      title="お迎えの車を探しています"
      showBack={true}
      showNavigation={false}
    >
      <section className="reservation-matching">
        <div className="reservation-matching-icon">
          <Search size={42} aria-hidden="true" />
        </div>

        <span className="status-badge">
          マッチング中
        </span>

        <h2>お迎えの車を探しています</h2>

        <p>
          お迎えできるドライバーを探しています。
          <br />
          そのままお待ちください。
        </p>
      </section>

      <section className="info-card reservation-matching-info">
        <div>
          <Car size={26} aria-hidden="true" />
          <span>お迎え場所</span>
        </div>

        <strong>自宅</strong>

        <p>
          ドライバーが決まり次第、
          お迎え予定時刻をお知らせします。
        </p>
      </section>

      <div className="reservation-matching-wait">
        <Clock size={20} aria-hidden="true" />
        <span>通常は数分ほどで見つかります</span>
      </div>

      <div className="action-stack">
        <Link
          className="primary-button"
          to="/user/home"
        >
          <House size={20} aria-hidden="true" />
          ホームに戻る
        </Link>

        <Link
          className="secondary-button"
          to="/user/taxi-switch"
        >
          タクシーに切り替える
        </Link>

        <Link
          className="reservation-matching-test-link"
          to={`/user/reservations/${id}/confirmed`}
        >
          配車確定画面へ（動作確認）
        </Link>
      </div>
    </UserScreen>
  );
}

export default ReservationMatchingPage;