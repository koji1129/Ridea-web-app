import { ArrowLeft, Camera, House, Phone } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ReservationDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	return <UserScreen title="" showHeader={false} showNavigation={false}><header className="destination-brand detail-brand"><button type="button" onClick={() => navigate(-1)} aria-label="前の画面へ戻る"><ArrowLeft size={32} /></button><div><span className="destination-brand-mark">◆</span><strong>YORIAI</strong></div><button type="button" onClick={() => navigate("/user/home")} aria-label="ホームへ戻る"><House size={31} /></button></header><h1 className="detail-title">予約詳細</h1><div className="detail-status">予約確定</div><section className="detail-route"><h2>8月20日（水）</h2><div className="detail-route-row"><div className="detail-route-line"><span /><i /><span /></div><div className="detail-route-stops"><div><strong>9:20 ごろ</strong><small>自宅<br />乗車予定</small></div><div><strong>9:40 ごろ 病院</strong><small>到着予定</small></div></div></div></section><dl className="detail-stats"><div><dt>乗車人数</dt><dd>1人</dd></div><div><dt>想定料金</dt><dd className="detail-price">600円</dd></div></dl><p className="detail-note">（相乗りのため変動する場合があります）</p><section className="driver-card"><div className="driver-avatar">山田</div><div><span>ドライバー</span><strong>山田 太郎さん</strong></div><a href="tel:09012345678" aria-label="ドライバーへ電話"><Phone size={31} /></a></section><Link className="detail-map-button" to="/user/driver-location"><Camera size={31} />地図で確認する</Link><Link className="danger-button detail-cancel-button" to={`/user/reservations/${id}/cancel`}>キャンセルする</Link></UserScreen>;
}
export default ReservationDetailPage;
