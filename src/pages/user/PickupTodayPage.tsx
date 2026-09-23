import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./PickupTodayPage.css";

function PickupTodayPage() {
  return (
    <UserScreen
      title="送迎当日"
      showBack={true}
      showNavigation={false}
    >
      <div className="info-card pickup-today-card">
        <span className="status-badge">
          本日の予約
        </span>

        <h2>09:40ごろのお迎え</h2>

        <p>自宅から市民病院まで</p>
      </div>

      <Link
        className="primary-button"
        to="/user/driver-location"
      >
        <MapPin size={20} aria-hidden="true" />
        ドライバーの位置を見る
      </Link>
    </UserScreen>
  );
}

export default PickupTodayPage;