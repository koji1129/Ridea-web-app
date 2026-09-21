import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ArrivalCompletePage() {
  const navigate = useNavigate();
  return <UserScreen title="" showHeader={false} showNavigation={false}><header className="destination-brand arrival-brand"><button type="button" onClick={() => navigate(-1)} aria-label="前の画面へ戻る"><ArrowLeft size={32} /></button><div><span className="destination-brand-mark">◆</span><strong>YORIAI</strong></div><span /></header><main className="arrival-complete-screen"><div className="arrival-check-ring"><div><Check size={58} strokeWidth={3} /></div></div><h1>到着しました</h1><h2>春日井市民病院</h2><p>ご利用ありがとうございました</p><div className="hospital-illustration" aria-hidden="true"><span className="hospital-cross">+</span><span className="hospital-roof" /><span className="hospital-body" /><span className="hospital-window window-one" /><span className="hospital-window window-two" /><span className="hospital-tree tree-one" /><span className="hospital-tree tree-two" /></div><button className="primary-button arrival-home-button" type="button" onClick={() => navigate("/user/home")}>ホームへ戻る</button></main></UserScreen>;
}

export default ArrivalCompletePage;
