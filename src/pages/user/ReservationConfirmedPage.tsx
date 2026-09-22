import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ReservationConfirmedPage() { return <UserScreen title="配車確定"><span className="status-badge">配車確定</span><dl className="summary-list"><div className="summary-row"><dt>迎車予定時刻</dt><dd>09:20</dd></div><div className="summary-row"><dt>到着予定時刻</dt><dd>09:40</dd></div><div className="summary-row"><dt>相乗り人数</dt><dd>2名</dd></div><div className="summary-row"><dt>確定料金</dt><dd className="price">1,200円</dd></div><div className="summary-row"><dt>ドライバー名</dt><dd>佐藤 太郎</dd></div></dl><Link className="primary-button" to="/user/driver-location">ドライバーの位置を見る</Link></UserScreen>; }
export default ReservationConfirmedPage;
