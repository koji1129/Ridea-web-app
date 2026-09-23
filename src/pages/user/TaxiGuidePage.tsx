import {
  ArrowLeft,
  CarTaxiFront,
  House,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./TaxiGuidePage.css";

function TaxiGuidePage() {
  const navigate = useNavigate();

  return (
    <UserScreen
      title="タクシーのご案内"
      showBack={false}
      showNavigation={false}
    >
      <section className="taxi-guide-heading">
        <div className="taxi-guide-icon">
          <CarTaxiFront size={42} aria-hidden="true" />
        </div>

        <h2>タクシー会社へ電話してください</h2>

        <p>
          下のボタンを押すと、
          タクシー会社へ電話できます。
        </p>
      </section>

      <section className="info-card taxi-company-card">
        <div className="taxi-company-info">
          <span>タクシー会社</span>
          <strong>○○タクシー</strong>
          <p>配車受付</p>
        </div>

        <a
          className="primary-button taxi-phone-button"
          href="tel:0000000000"
        >
          <Phone size={22} aria-hidden="true" />
          電話する
        </a>
      </section>

      <p className="taxi-guide-note">
        電話がつながったら、
        現在地と行き先をタクシー会社へお伝えください。
      </p>

      <div className="action-stack taxi-guide-actions">
        <Link
          className="secondary-button"
          to="/user/home"
        >
          <House size={20} aria-hidden="true" />
          ホームに戻る
        </Link>

        <button
          className="taxi-guide-back"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} aria-hidden="true" />
          前の画面に戻る
        </button>
      </div>
    </UserScreen>
  );
}

export default TaxiGuidePage;