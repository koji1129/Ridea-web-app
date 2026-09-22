import { ArrowRight, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function CancelReservationPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	return <UserScreen title="" showHeader={false} showNavigation={false}><div className="cancel-overlay"><section className="cancel-modal" role="dialog" aria-modal="true" aria-labelledby="cancel-title"><button className="cancel-close" type="button" onClick={() => navigate(-1)} aria-label="閉じる"><X size={34} /></button><h1 id="cancel-title">予約をキャンセルしますか？</h1><div className="cancel-reservation"><strong>8月20日（水）10:00</strong><ArrowRight size={23} /><span>自宅 → 春日井市民病院</span></div><p className="cancel-warning">※ キャンセルすると、再度予約が<br />必要になります。</p><Link className="danger-button" to="/user/reservations">キャンセルする</Link><Link className="secondary-button" to={`/user/reservations/${id ?? "1"}`}>戻る</Link></section></div></UserScreen>;
}
export default CancelReservationPage;
