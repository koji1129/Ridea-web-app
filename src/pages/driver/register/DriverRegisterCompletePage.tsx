import { CheckCircle2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/common/Button/Button";
import HomeButton from "../../../components/common/HomeButton/HomeButton";
import "./DriverRegister.css";

function DriverRegisterCompletePage() {
  const navigate = useNavigate();

  return (
    <div className="driverRegister">
      <div className="driverRegister__container">
        <header className="driverRegister__header">
          <div className="driverRegister__logo">
            YORIAI
          </div>
        </header>

        <main className="registerComplete">
          <div className="registerComplete__icon">
            <CheckCircle2 size={52} strokeWidth={2.5} />
          </div>

          <h1 className="registerComplete__title">
            ドライバー登録を
            <br />
            受け付けました
          </h1>

          <p className="registerComplete__description">
            ご申請ありがとうございます。
            <br />
            現在、登録内容を確認しています。
          </p>

          <div className="registerComplete__status">
            <div className="registerComplete__statusIcon">
              <Mail size={22} />
            </div>

            <div>
              <p className="registerComplete__statusTitle">
                審査結果はアプリでお知らせします
              </p>

              <p className="registerComplete__statusText">
                審査が完了するまでしばらくお待ちください。
              </p>
            </div>
          </div>

          <div className="registerComplete__notice">
            <p>
              審査状況はマイページから
              <br />
              いつでも確認できます。
            </p>
          </div>

          <Button
            type="button"
            fullWidth
            onClick={() => navigate("/driver/review/approved")}
          >
            審査状況を確認する
          </Button>

         <HomeButton
            to="/home"
            label="利用者ホームへ戻る"
            />
        </main>
      </div>
    </div>
  );
}

export default DriverRegisterCompletePage;