import { Link, useParams } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ReservationMatchingPage() { const { id } = useParams(); return <UserScreen title="配車調整中"><div className="info-card"><span className="status-badge">配車調整中</span><h2>ドライバーを探しています</h2><p>決まり次第、こちらの画面でお知らせします。</p></div><div className="action-stack"><Link className="primary-button" to={`/user/reservations/${id}/confirmed`}>配車確定画面を見る</Link><Link className="secondary-button" to="/user/taxi-switch">タクシーに切り替える</Link></div></UserScreen>; }
export default ReservationMatchingPage;
