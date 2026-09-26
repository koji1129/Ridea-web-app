import { AuthApiError, logout } from "../../lib/auth-api";
import {
  Car,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserPopup from "../../components/user/UserPopup";
import UserScreen from "../../components/user/UserScreen";
import { getUser, type User } from "../../lib/user-api";
import "./SettingsPage.css";

function SettingsPage() {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const isDriver = user?.role === "driver";

  useEffect(() => {
    const controller = new AbortController();

    const loadUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const accessToken = localStorage.getItem("access_token");
        if (!userId || !accessToken) {
          throw new Error("ログイン情報がありません");
        }

        const result = await getUser(userId, accessToken, controller.signal);
        if (!controller.signal.aborted) setUser(result);
      } catch {
        if (!controller.signal.aborted) {
          setUserError("利用者情報を取得できませんでした");
        }
      }
    };

    void loadUser();
    return () => controller.abort();
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        try {
          await logout(accessToken);
        } catch (error) {
          // 期限切れなどで認証できない場合も、端末のセッションを破棄します。
          if (!(error instanceof AuthApiError && error.status === 401)) throw error;
        }
      }
      localStorage.clear();
      setShowLogoutPopup(false);
      navigate("/login", { replace: true });
    } catch {
      setLogoutError("ログアウトできませんでした。もう一度お試しください");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <UserScreen
      title="マイページ"
      showBack={true}
      showNavigation={false}
    >
      <div className="mypage-avatar">
        {user?.profile_image_path ? (
          <img src={user.profile_image_path} alt="プロフィール画像" />
        ) : (
          <UserRound size={92} aria-hidden="true" />
        )}
      </div>

      <h2 className="mypage-name">
        {user ? user.user_name || "氏名未登録" : userError ? "利用者" : "読み込み中..."}
        {user?.user_name && <small>さん</small>}
      </h2>

      {userError && <p className="error-message" role="alert">{userError}</p>}

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

        {isDriver && (
          <Link
            to="/driver"
            className="mypage-driver-switch"
          >
            <Car aria-hidden="true" />
            <span>ドライバーモードに切り替える</span>
            <ChevronRight aria-hidden="true" />
          </Link>
        )}

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
        isBusy={isLoggingOut}
      >
        {logoutError && <p className="error-message" role="alert">{logoutError}</p>}
      </UserPopup>
    </UserScreen>
  );
}

export default SettingsPage;