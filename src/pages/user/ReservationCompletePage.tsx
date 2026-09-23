import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReservationCompletePage.css";
function ReservationCompletePage() {
  return (
    <UserScreen
      title=""
      showHeader={false}
      showNavigation={false}
    >
      <main className="reservation-complete-screen">
        <div className="reservation-complete-icon">
          <Check
            size={68}
            strokeWidth={3}
            aria-hidden="true"
          />
        </div>

        <h1>予約が完了しました</h1>

        <p>
          ご登録の連絡先に
          <br />
          確認メールをお送りします
        </p>

        <div className="reservation-complete-actions">
          <Link
            className="primary-button"
            to="/user/reservations"
          >
            予約内容を確認
          </Link>

          <Link
            className="secondary-button"
            to="/user/home"
          >
            ホームに戻る
          </Link>
        </div>
      </main>
    </UserScreen>
  );
}

export default ReservationCompletePage;