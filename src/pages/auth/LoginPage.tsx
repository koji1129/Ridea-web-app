import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import UserPopup from "../../components/user/UserPopup";
import logo from "../../assets/header_logo.png";

import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInputError, setShowInputError] = useState(false);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitted(true);

    if (!phoneNumber.trim() || !password.trim()) {
      setShowInputError(true);
      return;
    }

    navigate("/driver-guide");
  };

  return (
    <div className="login-page">
      <main className="login-container">
        {/* ロゴ */}
        <div className="login-logo">
          <img
            src={logo}
            alt="YORIAI"
            className="login-logo-image"
          />
        </div>

        {/* メッセージ */}
        <div className="welcome-message">
          <h1>ようこそ</h1>
          <p>YORIAIへ</p>
        </div>

        {/* ログインフォーム */}
        <form
          className="login-form"
          onSubmit={handleSubmit}
        >
          {/* 電話番号 */}
          <div className="login-form-group">
            <label htmlFor="phoneNumber">
              電話番号
            </label>

            <input
              id="phoneNumber"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="09012345678"
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(event.target.value)
              }
              className={
                submitted && !phoneNumber.trim()
                  ? "login-input-error"
                  : ""
              }
            />

            {submitted && !phoneNumber.trim() && (
              <p className="login-error">
                電話番号を入力してください
              </p>
            )}
          </div>

          {/* パスワード */}
          <div className="login-form-group">
            <label htmlFor="password">
              パスワード
            </label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="current-password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                className={
                  submitted && !password.trim()
                    ? "login-input-error"
                    : ""
                }
              />

              <button
                className="password-toggle"
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                aria-label={
                  showPassword
                    ? "パスワードを非表示にする"
                    : "パスワードを表示する"
                }
              >
                {showPassword ? (
                  <EyeOff size={24} />
                ) : (
                  <Eye size={24} />
                )}
              </button>
            </div>

            {submitted && !password.trim() && (
              <p className="login-error">
                パスワードを入力してください
              </p>
            )}
          </div>

          {/* ログイン */}
          <button
            className="login-button"
            type="submit"
          >
            ログイン
          </button>
        </form>

        {/* 下部リンク */}
        <div className="login-links">
          <div className="register-guide">
            <Link
              to="/register"
              className="text-link"
            >
              新規登録はこちら
            </Link>
          </div>

          <Link
            to="/reset-password"
            className="password-reset-link"
          >
            パスワードを忘れた方はこちら
          </Link>
        </div>

        <UserPopup
          variant="input-error"
          isOpen={showInputError}
          onClose={() =>
            setShowInputError(false)
          }
        />
      </main>
    </div>
  );
}

export default LoginPage;