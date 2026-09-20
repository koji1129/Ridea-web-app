import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ChevronLeft,
  FileCheck2,
} from "lucide-react";

import Button from "../../../components/common/Button/Button";

import licenseFrontImage from "../../../assets/driver/driver-license-front.png";
import licenseBackImage from "../../../assets/driver/driver-license-back.png";

import "./DriverRegister.css";

function DriverRegisterConfirmPage() {
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!agreed) {
      return;
    }

    navigate("/driver/register/complete");
  };

  return (
    <div className="driverRegister">
      <div className="driverRegister__container">
        {/* ヘッダー */}
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

        {/* ステップ */}
        <div className="registerSteps">
          <div className="registerSteps__item registerSteps__item--completed">
            <span>
              <CheckCircle2 size={18} />
            </span>
            <p>免許証提出</p>
          </div>

          <div className="registerSteps__line registerSteps__line--completed" />

          <div className="registerSteps__item registerSteps__item--active">
            <span>2</span>
            <p>確認</p>
          </div>
        </div>

        <main>
          <h1 className="driverRegister__title">
            申請内容の確認
          </h1>

          <p className="driverRegister__description">
            提出する内容をご確認ください。
            <br />
            問題がなければ申請してください。
          </p>

          {/* 提出書類 */}
          <section className="confirmSection">
            <div className="confirmSection__header">
              <h2>提出書類</h2>

              <button
                type="button"
                className="confirmSection__edit"
                onClick={() => navigate("/driver/register")}
              >
                編集
              </button>
            </div>

            {/* 表面 */}
            <div className="confirmDocument">
              <div className="confirmDocument__imageWrapper">
                <img
                  src={licenseFrontImage}
                  alt="運転免許証 表面"
                  className="confirmDocument__image"
                />
              </div>

              <div className="confirmDocument__content">
                <p className="confirmDocument__title">
                  運転免許証 表面
                </p>

                <div className="confirmDocument__status">
                  <FileCheck2 size={17} />
                  <span>提出済み</span>
                </div>
              </div>
            </div>

            {/* 裏面 */}
            <div className="confirmDocument">
              <div className="confirmDocument__imageWrapper">
                <img
                  src={licenseBackImage}
                  alt="運転免許証 裏面"
                  className="confirmDocument__image"
                />
              </div>

              <div className="confirmDocument__content">
                <p className="confirmDocument__title">
                  運転免許証 裏面
                </p>

                <div className="confirmDocument__status">
                  <FileCheck2 size={17} />
                  <span>提出済み</span>
                </div>
              </div>
            </div>
          </section>

          {/* 確認事項 */}
          <section className="confirmNotice">
            <h2>申請前にご確認ください</h2>

            <ul>
              <li>
                提出した運転免許証が有効期限内であること
              </li>
              <li>
                登録されている本人の免許証であること
              </li>
              <li>
                提出内容に誤りがないこと
              </li>
            </ul>
          </section>

          {/* 規約 */}
          <label className="confirmAgreement">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) =>
                setAgreed(event.target.checked)
              }
            />

            <span>
              <button
                type="button"
                className="confirmAgreement__link"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/terms");
                }}
              >
                利用規約
              </button>

              および

              <button
                type="button"
                className="confirmAgreement__link"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/privacy");
                }}
              >
                プライバシーポリシー
              </button>

              に同意します
            </span>
          </label>

          <Button
            type="button"
            fullWidth
            disabled={!agreed}
            className="driverRegister__next"
            onClick={handleSubmit}
          >
            ドライバー登録を申請する
          </Button>
        </main>
      </div>
    </div>
  );
}

export default DriverRegisterConfirmPage;