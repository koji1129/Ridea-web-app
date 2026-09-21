import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function PickupTodayPage() { return <UserScreen title="送迎当日"><div className="info-card"><span className="status-badge">本日の予約</span><h2>09:40ごろのお迎え</h2><p>自宅から市民病院まで</p></div><Link className="primary-button" to="/user/driver-location">ドライバーの位置を見る</Link></UserScreen>; }
export default PickupTodayPage;
