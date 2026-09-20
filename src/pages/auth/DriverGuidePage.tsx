import { CheckCircle2, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button/Button";
import driverGuideCar from "../../assets/driver/driver-guide-car.png";

import "./DriverGuidePage.css";

function DriverGuidePage() {
  const navigate = useNavigate();

  const handleStartDriverRegister = () => {
    navigate("/driver/register");
  };

  const handleStartAsUser = () => {
    navigate("/home");
  };

  return (
    <div className="driverGuide">
      <div className="driverGuide__container">
        <header className="driverGuide__header">
          <button
            type="button"
            className="driverGuide__back"
            onClick={() => navigate(-1)}
            aria-label="戻る"
          >
            <ChevronLeft size={30} />
          </button>

          <div className="driverGuide__logo">
            YORIAI
          </div>
        </header>

        <main className="driverGuide__main">
          <section className="driverGuide__intro">
            <h1 className="driverGuide__title">
              ドライバーとして
              <br />
              活動しませんか？
            </h1>

            <p className="driverGuide__lead">
              地域の移動を支える
              <br />
              YORIAIドライバーとして
              <br />
              一緒に地域を支えませんか？
            </p>

            <div className="driverGuide__illustration">
              <img
                src={driverGuideCar}
                alt="街を走るYORIAIの車"
                className="driverGuide__carImage"
              />
            </div>
          </section>

          <section className="driverGuide__benefits">
            <div className="driverGuide__benefit">
              <CheckCircle2 size={21} />
              <span>
                空いた時間で地域に貢献できる
              </span>
            </div>

            <div className="driverGuide__benefit">
              <CheckCircle2 size={21} />
              <span>
                タクシー会社のサポートで安心
              </span>
            </div>

            <div className="driverGuide__benefit">
              <CheckCircle2 size={21} />
              <span>
                アプリで簡単にスケジュール管理
              </span>
            </div>
          </section>

          <p className="driverGuide__notice">
            ドライバー登録には審査があります。
            <br />
            詳細は次の画面でご案内します。
          </p>

          <div className="driverGuide__actions">
            <Button
              type="button"
              fullWidth
              onClick={handleStartDriverRegister}
            >
              登録をはじめる
            </Button>

            <div className="driverGuide__separator">
              <span />
              <p>または</p>
              <span />
            </div>

            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleStartAsUser}
            >
              利用者としてはじめる
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverGuidePage;