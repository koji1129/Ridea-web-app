import { useState, type FormEvent } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserPopup from "../../components/user/UserPopup";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!phoneNumber || !password) {
      setShowInputError(true);
      return;
    }

    navigate("/user/home");
  };

  return (
    <div className="login-page">
      <main className="login-container">
        {/* ロゴ */}
        <div className="login-logo">
          <svg
            className="login-logo-mark"
            viewBox="0 0 100 80"
            aria-hidden="true"
          >
            <polygon
              points="15,15 43,15 58,32 40,63"
              fill="#0d65a8"
            />

            <polygon
              points="43,15 80,15 59,50 48,37"
              fill="#09a5c0"
            />

            <polygon
              points="15,15 29,37 40,22 43,15"
              fill="#16afd0"
            />

            <polygon
              points="59,50 78,19 85,28 58,68 40,63"
              fill="#087d9f"
            />
          </svg>

          <h1>YORIAI</h1>
        </div>

        {/* メッセージ */}
        <div className="welcome-message">
          <p>ようこそ</p>
          <p>YORIAIへ</p>
        </div>

        {/* 入力フォーム */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group account-type-group">
            <label htmlFor="accountType">アカウントの種類</label>
            <div className="account-type-control">
              <UserRound className="account-type-icon" size={26} aria-hidden="true" />
              <select
                id="accountType"
                value={accountType}
                onChange={(event) => setAccountType(event.target.value)}
              >
                <option value="user">利用者</option>
                <option value="driver">ドライバー</option>
              </select>
              <ChevronDown className="account-type-arrow" size={27} aria-hidden="true" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">電話番号</label>

            <input
              id="phoneNumber"
              type="tel"
              inputMode="numeric"
              placeholder="09012345678"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className={submitted && !phoneNumber ? "login-input-error" : ""}
            />
            {submitted && !phoneNumber && <p className="login-error">電話番号を入力してください</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="パスワードを入力"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={submitted && !password ? "login-input-error" : ""}
              />

              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword
                    ? "パスワードを非表示にする"
                    : "パスワードを表示する"
                }
              >
                {showPassword ? (
                  /* 目を閉じたアイコン */
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c5 0 9 5 9 8a8.8 8.8 0 0 1-2 3.6" />
                    <path d="M6.6 6.6C4.4 8 3 10.2 3 12c0 3 4 8 9 8a9.5 9.5 0 0 0 4-.9" />
                  </svg>
                ) : (
                  /* 目のアイコン */
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {submitted && !password && <p className="login-error">パスワードを入力してください</p>}
          </div>

          <button className="login-button" type="submit">
            ログイン
          </button>
        </form>

        {/* 下部リンク */}
        <div className="login-links">
          <Link to="/register" className="text-link">
            新規登録はこちら
          </Link>

          <div className="login-divider" />

          <Link to="/reset-password" className="text-link">
            パスワードを忘れた方
          </Link>
        </div>
        <UserPopup variant="input-error" isOpen={showInputError} onClose={() => setShowInputError(false)} />
      </main>
    </div>
  );
}

export default LoginPage;