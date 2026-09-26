import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import UserPopup from "../../components/user/UserPopup";
import logo from "../../assets/header_logo.png";
import {
  AuthApiError,
  login,
} from "../../lib/auth-api";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setSubmitted(true);
    setLoginError("");

    if (!email.trim() || !password.trim()) {
      setShowInputError(true);
      return;
    }

    if (isLoggingIn) {
      return;
    }

    setIsLoggingIn(true);

    try {
      const response = await login({
        email,
        password,
      });

      localStorage.setItem(
        "access_token",
        response.session.access_token,
      );
      localStorage.setItem(
        "refresh_token",
        response.session.refresh_token,
      );

      navigate("/driver/guide");
    } catch (error) {
      if (error instanceof AuthApiError) {
        setLoginError(error.message);
      } else {
        setLoginError(
          "ログインに失敗しました。時間をおいて再度お試しください",
        );
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="app-page">
      <main className="app-container login-container">
        <div className="login-logo">
          <img
            src={logo}
            alt="YORIAI"
            className="login-logo-image"
          />
        </div>

        <div className="welcome-message">
          <h1>ようこそ</h1>
          <p>YORIAIへ</p>
        </div>

        <form
          className="form-stack login-form"
          onSubmit={handleSubmit}
        >
          <div className="field-group">
            <label
              className="field-label"
              htmlFor="email"
            >
              メールアドレス
            </label>

            <input
              id="email"
              className={`field-input ${submitted && !email.trim()
                  ? "input-error"
                  : ""
                }`}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="example@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            {submitted && !email.trim() && (
              <p className="error-message">
                メールアドレスを入力してください
              </p>
            )}
          </div>

          <div className="field-group">
            <label
              className="field-label"
              htmlFor="password"
            >
              パスワード
            </label>

            <div className="login-password-wrapper">
              <input
                id="password"
                className={`field-input ${submitted && !password.trim()
                    ? "input-error"
                    : ""
                  }`}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="パスワードを入力"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                className="login-password-toggle"
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
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
              <p className="error-message">
                パスワードを入力してください
              </p>
            )}
          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "ログイン中..." : "ログイン"}
          </button>

          {loginError && (
            <p className="error-message">
              {loginError}
            </p>
          )}
        </form>

        <div className="login-links">
          <Link
            to="/register"
            className="text-link"
          >
            新規登録はこちら
          </Link>

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