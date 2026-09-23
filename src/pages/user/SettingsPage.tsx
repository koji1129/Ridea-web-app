import {
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPopup from "../../components/user/UserPopup";
import UserScreen from "../../components/user/UserScreen";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    setShowLogoutPopup(false);
    navigate("/login", { replace: true });
  };

  return (
    <UserScreen
      title="マイページ"
      showBack={true}
      showNavigation={false}
    >
      <div className="mypage-avatar">
        <UserRound size={92} aria-hidden="true" />
      </div>

      <h2 className="mypage-name">
        山田 太郎
        <small>さん</small>
      </h2>

      <nav className="mypage-menu">
        <Link to="/user/settings/profile">
          <UserRound aria-hidden="true" />
          <span>登録情報の確認・変更</span>
          <ChevronRight aria-hidden="true" />
        </Link>

        <Link to="/user/reservations">
          <Clock3 aria-hidden="true" />
          <span>予約一覧</span>
          <ChevronRight aria-hidden="true" />
        </Link>

        <Link to="/user/faq">
          <CircleHelp aria-hidden="true" />
          <span>よくある質問</span>
          <ChevronRight aria-hidden="true" />
        </Link>

        <Link to="/user/terms">
          <FileText aria-hidden="true" />
          <span>利用規約</span>
          <ChevronRight aria-hidden="true" />
        </Link>

        <Link to="/user/privacy">
          <ShieldCheck aria-hidden="true" />
          <span>プライバシーポリシー</span>
          <ChevronRight aria-hidden="true" />
        </Link>

        <a href="mailto:support@yoriai.example">
          <Mail aria-hidden="true" />
          <span>お問い合わせ</span>
          <ChevronRight aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => setShowLogoutPopup(true)}
        >
          <LogOut aria-hidden="true" />
          <span>ログアウト</span>
          <ChevronRight aria-hidden="true" />
        </button>
      </nav>

      <div
        className="mypage-landscape"
        aria-hidden="true"
      >
        <span className="mypage-hill hill-left" />
        <span className="mypage-hill hill-right" />
        <span className="mypage-house house-one" />
        <span className="mypage-house house-two" />
        <span className="mypage-car">🚙</span>
      </div>

      <UserPopup
        variant="logout"
        isOpen={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        onConfirm={handleLogout}
      />
    </UserScreen>
  );
}

export default SettingsPage;