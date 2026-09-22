import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/common/Button/Button";
import HomeButton from "../../../components/common/HomeButton/HomeButton";
import rejectedImage from "../../../assets/driver/driver-review-rejected.png";

import "./DriverRegister.css";

function DriverReviewRejectedPage() {
  const navigate = useNavigate();

  return (
    <div className="driverRegister">
      <div className="driverRegister__container">
        <header className="driverRegister__header">
          <button
            type="button"
            className="driverRegister__back"
            onClick={() => navigate(-1)}
            aria-label="戻る"
          >
            <ChevronLeft size={30} />
          </button>

          <div className="driverRegister__logo">
            YORIAI
          </div>
        </header>

        <main className="reviewStatus">
          <img
            src={rejectedImage}
            alt="審査不承認"
            className="reviewStatus__image"
          />

          <h1 className="reviewStatus__title">
            今回は承認できませんでした
          </h1>

          <p className="reviewStatus__description">
            審査の結果、要件を満たしていない、
            <br />
            または提出書類に確認が必要な項目がありました。
            <br />
            詳細はお問い合わせください。
          </p>

          <div className="reviewRejected__actions">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => navigate("/contact")}
            >
              お問い合わせ
            </Button>

            <div className="reviewRejected__home">
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

export default DriverReviewRejectedPage;