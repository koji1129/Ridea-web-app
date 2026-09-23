import {
  Car,
  Clock,
  House,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReturnMatchingPage.css";

function ReturnMatchingPage() {
  return (
    <UserScreen
      title="帰りの車を探しています"
      showBack={true}
      showNavigation={false}
    >
      <section className="return-matching">
        <div className="return-matching-icon">
          <Search size={42} aria-hidden="true" />
        </div>

        <span className="status-badge">
          マッチング中
        </span>

        <h2>帰りの車を探しています</h2>

        <p>
          お迎えできるドライバーを探しています。
          <br />
          そのままお待ちください。
        </p>
      </section>

      <section className="info-card return-matching-route">
        <div>
          <Car size={26} aria-hidden="true" />
          <span>お迎え場所</span>
        </div>

        <strong>春日井市民病院</strong>

        <p>
          決まり次第、ドライバーと
          お迎え予定時刻をお知らせします。
        </p>
      </section>

      <div className="return-matching-wait">
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
          className="return-matching-test-link"
          to="/user/return/confirmed"
        >
          配車確定画面へ（動作確認）
        </Link>
      </div>
    </UserScreen>
  );
}

export default ReturnMatchingPage;