import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/common/Button/Button";
import HomeButton from "../../../components/common/HomeButton/HomeButton";
import approvedImage from "../../../assets/driver/driver-review-approved.png";

import "./DriverRegister.css";

function DriverReviewApprovedPage() {
  const navigate = useNavigate();

  return (
    <div className="driverRegister">
      <div className="driverRegister__container">
        <header className="driverRegister__header">
          <div className="driverRegister__logo">
            YORIAI
          </div>
        </header>

        <main className="reviewStatus">
          <img
            src={approvedImage}
            alt="審査通過"
            className="reviewStatus__image"
          />

          <h1 className="reviewStatus__title">
            審査が完了しました
          </h1>

          <p className="reviewStatus__description">
            ドライバー登録が承認されました。
            <br />
            YORIAIドライバーとして
            <br />
            活動をはじめられます。
          </p>

          <div className="reviewApproved__info">
            <CheckCircle2 size={22} />

            <div>
              <p className="reviewApproved__infoTitle">
                ドライバー登録完了
              </p>

              <p className="reviewApproved__infoText">
                まずは勤務できる日時を登録して、
                <br />
                運行の準備をはじめましょう。
              </p>
            </div>
          </div>

          <div className="reviewApproved__actions">
            <Button
              type="button"
              fullWidth
              onClick={() => navigate("/driver")}
            >
              ドライバーホームへ
            </Button>

            <div className="reviewApproved__home">
              <HomeButton
                to="/home"
                label="利用者ホームへ戻る"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverReviewApprovedPage;