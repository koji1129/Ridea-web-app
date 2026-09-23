import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/header_logo.png";
import "./PasswordResetPage.css";

function PasswordResetPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);

    if (!phoneNumber.trim()) {
      return;
    }

    setIsComplete(true);
  };

  return (
    <div className="app-page">
      <main className="app-container password-reset-container">
        <div className="password-reset-logo">
          <img
            src={logo}
            alt="YORIAI"
            className="password-reset-logo-image"
          />
        </div>

        {isComplete ? (
          <div
            className="password-reset-complete"
            role="status"
          >
            <div className="password-reset-complete-icon">
              <Check size={48} strokeWidth={3} />
            </div>

            <h1>受付が完了しました</h1>

            <p>
              登録されている電話番号へ、
              <br />
              再設定の案内をお送りします。
            </p>

            <Link
              className="primary-button"
              to="/login"
            >
              ログイン画面へ戻る
            </Link>
          </div>
        ) : (
          <>
            <div className="password-reset-header">
              <h1>パスワード再設定</h1>

              <p>
                登録済みの電話番号を入力してください。
              </p>
            </div>

            <form
              className="form-stack password-reset-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="field-group">
                <label
                  className="field-label"
                  htmlFor="resetPhoneNumber"
                >
                  電話番号
                </label>

                <input
                  id="resetPhoneNumber"
                  className={`field-input ${
                    submitted && !phoneNumber.trim()
                      ? "input-error"
                      : ""
                  }`}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="09012345678"
                  value={phoneNumber}
                  onChange={(event) =>
                    setPhoneNumber(event.target.value)
                  }
                />

                {submitted && !phoneNumber.trim() && (
                  <p className="error-message">
                    電話番号を入力してください
                  </p>
                )}
              </div>

              <button
                className="primary-button"
                type="submit"
              >
                再設定案内を送る
              </button>

              <Link
                className="secondary-button"
                to="/login"
              >
                ログイン画面へ戻る
              </Link>
            </form>
          </>
        )}
      </main>
    </div>
  );
}

export default PasswordResetPage;