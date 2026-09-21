import { ArrowLeft, House } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ReservationListPage() {
	const navigate = useNavigate();
	const [showPast, setShowPast] = useState(false);
	const reservations = showPast ? [["7月28日（月）", "14:00 到着予定", "自宅 → 春日井市役所", "4"], ["7月25日（金）", "09:30 到着予定", "自宅 → イオン春日井店", "5"]] : [["8月20日（水）", "10:00 到着予定", "自宅 → 春日井市民病院", "1"], ["8月22日（金）", "9:30 到着予定", "自宅 → イオン春日井店", "2"], ["8月25日（月）", "11:00 到着予定", "自宅 → 春日井市役所", "3"]];

	return <UserScreen title="" showHeader={false} showNavigation={false}><header className="destination-brand reservation-list-brand"><button type="button" onClick={() => navigate(-1)} aria-label="前の画面へ戻る"><ArrowLeft size={32} /></button><div><span className="destination-brand-mark">◆</span><strong>YORIAI</strong></div><button type="button" onClick={() => navigate("/user/home")} aria-label="ホームへ戻る"><House size={31} /></button></header><h1 className="reservation-list-title">予約一覧</h1><div className="reservation-tabs"><button className={!showPast ? "active" : ""} type="button" onClick={() => setShowPast(false)}>今後の予約</button><button className={showPast ? "active" : ""} type="button" onClick={() => setShowPast(true)}>過去の予約</button></div><section className="reservation-card-list">{reservations.map(([date, time, route, id]) => <article className="reservation-list-card" key={id}><div><strong>{date}</strong><span>{time}</span><small>{route}</small></div><Link to={`/user/reservations/${id}`}>詳細</Link></article>)}</section></UserScreen>;
}
export default ReservationListPage;
