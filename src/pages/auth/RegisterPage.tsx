import { useState, type FormEvent } from "react";
import "./RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("名前:", name);
    console.log("電話番号:", phoneNumber);
    console.log("パスワード:", password);
    console.log("確認用パスワード:", confirmPassword);
  };

  return (
    <div className="register-page">
      <main className="register-container">
        <div className="register-header">
          <span className="register-badge">YORIAI</span>
          <h1>新規登録</h1>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">名前</label>
            <input
              id="name"
              type="text"
              placeholder="山田 太郎"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerPhoneNumber">電話番号</label>
            <input
              id="registerPhoneNumber"
              type="tel"
              inputMode="numeric"
              placeholder="09012345678"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="registerPassword">パスワード</label>
            <div className="password-input-wrapper">
              <input
                id="registerPassword"
                type={showPassword ? "text" : "password"}
                placeholder="パスワードを入力"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "パスワードを非表示にする" : "パスワードを表示する"
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">パスワード確認</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="もう一度入力"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <button className="register-button" type="submit">
            登録する
          </button>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;
