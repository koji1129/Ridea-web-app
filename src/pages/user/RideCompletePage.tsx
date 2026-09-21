import { ArrowLeft, House, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function RideCompletePage() {
  const navigate = useNavigate();
  return <UserScreen title="" showHeader={false} showNavigation={false}><header className="destination-brand ride-complete-brand"><button type="button" onClick={() => navigate(-1)} aria-label="前の画面へ戻る"><ArrowLeft size={32} /></button><div><span className="destination-brand-mark">◆</span><strong>YORIAI</strong></div><span /></header><main className="ride-complete-screen"><h1>ご利用ありがとうございました</h1><p className="ride-complete-lead">またのご利用をお待ちしております</p><section className="trip-summary"><h2>8月20日（水）</h2><div className="trip-summary-body"><div className="trip-route-mini"><span /><i /><span /></div><div className="trip-stops"><div><strong>自宅</strong><small>10:00 発</small></div><div><strong>春日井市民病院</strong><small>9:40 着</small></div></div><div className="trip-map-mini"><span className="mini-car">🚙</span><span className="mini-route" /><span className="mini-pin">●</span></div></div></section><section className="fare-breakdown"><div className="fare-heading"><Wallet size={36} /><strong>ご利用料金</strong><b>600円</b></div><div><span>基本料金</span><strong>500円</strong></div><div><span>距離料金（2.1km）</span><strong>100円</strong></div><div><span>割引</span><strong>- 0円</strong></div></section><div className="fare-hospital" aria-hidden="true"><span>+</span><i /><b /><em /></div><p className="fare-thanks">ご利用いただき、<br />ありがとうございました</p><button className="primary-button ride-complete-home" type="button" onClick={() => navigate("/user/home")}><House size={25} />ホームに戻る</button></main></UserScreen>;
}

export default RideCompletePage;
