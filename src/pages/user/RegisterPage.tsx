import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyPhoneNumber, setEmergencyPhoneNumber] =
    useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("氏名:", name);
    console.log("電話番号:", phoneNumber);
    console.log("自宅住所:", address);
    console.log("緊急連絡先:", emergencyPhoneNumber);

    // 今は動作確認だけ
    // 後でバックエンドへの登録処理を追加します
    alert("入力内容を確認しました");
  };

  return (
    <div className="register-page">
      <main className="register-container">

        {/* 戻るボタン */}
        <div className="register-header">
          <Link to="/login" className="back-button">
            ←
          </Link>

          <h1>新規登録</h1>
        </div>

        <p className="register-description">
          利用者情報を入力してください
        </p>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >
          {/* 氏名 */}
          <div className="register-form-group">
            <label htmlFor="name">
              氏名
              <span className="required">必須</span>
            </label>

            <input
              id="name"
              type="text"
              placeholder="例：山田 太郎"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          {/* 電話番号 */}
          <div className="register-form-group">
            <label htmlFor="phoneNumber">
              電話番号
              <span className="required">必須</span>
            </label>

            <input
              id="phoneNumber"
              type="tel"
              inputMode="numeric"
              placeholder="例：09012345678"
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(event.target.value)
              }
              required
            />
          </div>

          {/* 自宅住所 */}
          <div className="register-form-group">
            <label htmlFor="address">
              自宅住所
              <span className="required">必須</span>
            </label>

            <input
              id="address"
              type="text"
              placeholder="例：春日井市○○町1-2-3"
              value={address}
              onChange={(event) =>
                setAddress(event.target.value)
              }
              required
            />
          </div>

          {/* 緊急連絡先 */}
          <div className="register-form-group">
            <label htmlFor="emergencyPhoneNumber">
              緊急連絡先電話番号
              <span className="required">必須</span>
            </label>

            <input
              id="emergencyPhoneNumber"
              type="tel"
              inputMode="numeric"
              placeholder="例：08012345678"
              value={emergencyPhoneNumber}
              onChange={(event) =>
                setEmergencyPhoneNumber(
                  event.target.value
                )
              }
              required
            />
          </div>

          <button
            type="submit"
            className="register-button"
          >
            登録する
          </button>
        </form>

        <div className="login-link-area">
          <span>すでにアカウントをお持ちの方</span>

          <Link to="/login">
            ログインはこちら
          </Link>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;