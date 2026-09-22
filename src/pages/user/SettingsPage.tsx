import { ArrowLeft, ChevronRight, CircleHelp, Clock3, LogOut, Mail, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPopup from "../../components/user/UserPopup";
import UserScreen from "../../components/user/UserScreen";

function SettingsPage() {
	const navigate = useNavigate();
	const [showLogoutPopup, setShowLogoutPopup] = useState(false);
	return <UserScreen title="" showHeader={false} showNavigation={false}><header className="destination-brand mypage-brand"><button type="button" onClick={() => navigate(-1)} aria-label="前の画面へ戻る"><ArrowLeft size={32} /></button><div><span className="destination-brand-mark">◆</span><strong>YORIAI</strong></div><span /></header><h1 className="mypage-title">マイページ</h1><div className="mypage-avatar"><UserRound size={92} /></div><h2 className="mypage-name">山田 太郎<small>さん</small></h2><nav className="mypage-menu"><Link to="/user/settings/profile"><UserRound /><span>登録情報の確認・変更</span><ChevronRight /></Link><Link to="/user/reservations"><Clock3 /><span>予約一覧</span><ChevronRight /></Link><Link to="/user/terms"><CircleHelp /><span>よくある質問</span><ChevronRight /></Link><a href="mailto:support@yoriai.example"><Mail /><span>お問い合わせ</span><ChevronRight /></a><button type="button" onClick={() => setShowLogoutPopup(true)}><LogOut /><span>ログアウト</span><ChevronRight /></button></nav><div className="mypage-landscape" aria-hidden="true"><span className="mypage-hill hill-left" /><span className="mypage-hill hill-right" /><span className="mypage-house house-one" /><span className="mypage-house house-two" /><span className="mypage-car">🚙</span></div><UserPopup variant="logout" isOpen={showLogoutPopup} onClose={() => setShowLogoutPopup(false)} onConfirm={() => navigate("/login")} /></UserScreen>;
}
export default SettingsPage;
