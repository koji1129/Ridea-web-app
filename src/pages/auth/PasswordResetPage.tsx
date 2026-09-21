import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./PasswordResetPage.css";

function PasswordResetPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="password-reset-page">
      <main className="password-reset-container">
        <div className="password-reset-header">
          <span className="password-reset-badge">YORIAI</span>
          <h1>パスワード再設定</h1>
        </div>

        {isSubmitted ? (
          <div className="password-reset-complete" role="status">
            <h2>受付が完了しました</h2>
            <p>登録されている電話番号へ、再設定の案内をお送りします。</p>
            <Link className="password-reset-button" to="/login">ログイン画面へ戻る</Link>
          </div>
        ) : (
          <form className="password-reset-form" onSubmit={handleSubmit}>
            <p className="password-reset-description">
              登録済みの電話番号を入力してください。
            </p>
            <div className="password-reset-field">
              <label htmlFor="resetPhoneNumber">電話番号</label>
              <input
                id="resetPhoneNumber"
                type="tel"
                inputMode="numeric"
                placeholder="09012345678"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
            </div>
            <button className="password-reset-button" type="submit">
              再設定案内を送る
            </button>
            <Link className="password-reset-back-link" to="/login">ログイン画面へ戻る</Link>
          </form>
        )}
      </main>
    </div>
  );
}

export default PasswordResetPage;
