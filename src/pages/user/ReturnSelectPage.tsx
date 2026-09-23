import {
  Home,
  MapPin,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReturnSelectPage.css";

function ReturnSelectPage() {
  return (
    <UserScreen
      title="帰る"
      showBack={true}
      showNavigation={false}
    >
      <p className="page-lead">
        帰りの車を呼びます
      </p>

      <section className="return-route-card">
        <div className="return-location">
          <div className="return-location-icon current">
            <MapPin size={24} aria-hidden="true" />
          </div>

          <div>
            <span>現在地</span>
            <strong>春日井市民病院</strong>
            <p>愛知県春日井市鷹来町1丁目1-1</p>
          </div>
        </div>

        <div
          className="return-route-line"
          aria-hidden="true"
        />

        <div className="return-location">
          <div className="return-location-icon home">
            <Home size={24} aria-hidden="true" />
          </div>

          <div>
            <span>帰宅先</span>
            <strong>自宅</strong>
            <p>登録済みの住所</p>
          </div>
        </div>
      </section>

      <div className="notice return-notice">
        <Navigation size={20} aria-hidden="true" />

        <p>
          現在地から登録済みの自宅まで
          お送りします。
        </p>
      </div>

      <Link
        className="primary-button return-request-button"
        to="/user/return/matching"
      >
        帰りの車を呼ぶ
      </Link>
    </UserScreen>
  );
}

export default ReturnSelectPage;