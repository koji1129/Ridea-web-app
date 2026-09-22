import { Info } from "lucide-react";

import HomeButton from "../../../components/common/HomeButton/HomeButton";
import pendingImage from "../../../assets/driver/driver-review-pending.png";

import "./DriverRegister.css";

function DriverReviewPendingPage() {
  return (
    <div className="driverRegister">
      <div className="driverRegister__container">
        {/* ヘッダー */}
        <header className="driverRegister__header">
          <div className="driverRegister__logo">
            YORIAI
          </div>
        </header>

        <main className="reviewStatus">
          {/* 審査中アイコン */}
          <img
            src={pendingImage}
            alt="審査中"
            className="reviewStatus__image"
          />

          <h1 className="reviewStatus__title">
            現在、審査中です
          </h1>

          <p className="reviewStatus__description">
            ご登録いただいた内容を確認しています。
            <br />
            審査が完了するまで
            <br />
            しばらくお待ちください。
          </p>

          {/* 案内 */}
          <div className="reviewStatus__info">
            <Info size={22} />

            <p>
              審査結果はアプリでお知らせします。
              <br />
              審査が完了すると、
              ドライバー機能をご利用いただけます。
            </p>
          </div>

          {/* 利用者ホーム */}
          <div className="reviewStatus__home">
            <HomeButton
              to="/user/home"
              label="利用者ホームへ戻る"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverReviewPendingPage;