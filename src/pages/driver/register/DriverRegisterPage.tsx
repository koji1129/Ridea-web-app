import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, ChevronLeft, Upload } from "lucide-react";

import Button from "../../../components/common/Button/Button";

import licenseFrontImage from "../../../assets/driver/driver-license-front.png";
import licenseBackImage from "../../../assets/driver/driver-license-back.png";

import "./DriverRegister.css";

function DriverRegisterPage() {
  const navigate = useNavigate();

  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const handleFrontChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setFrontFile(file);
    }
  };

  const handleBackChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setBackFile(file);
    }
  };

  const handleNext = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!frontFile || !backFile) {
      return;
    }

    navigate("/driver/register/confirm");
  };

  const canProceed = frontFile !== null && backFile !== null;

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

        <div className="registerSteps">
          <div className="registerSteps__item registerSteps__item--active">
            <span>1</span>
            <p>免許証提出</p>
          </div>

          <div className="registerSteps__line" />

          <div className="registerSteps__item">
            <span>2</span>
            <p>確認</p>
          </div>
        </div>

        <main>
          <h1 className="driverRegister__title">
            運転免許証の提出
          </h1>

          <p className="driverRegister__description">
            ドライバー登録の審査に必要な
            運転免許証を提出してください。
          </p>

          <form
            className="driverRegister__form"
            onSubmit={handleNext}
          >
            {/* 表面 */}
            <section className="licenseUpload">
              <div className="licenseUpload__heading">
                <h2>運転免許証 表面</h2>
                <span className="requiredBadge">
                  必須
                </span>
              </div>

              <p className="licenseUpload__description">
                免許証全体がはっきり写るように
                撮影してください。
              </p>

              <img
                src={licenseFrontImage}
                alt="運転免許証表面のイメージ"
                className="licenseUpload__example"
              />

              <input
                ref={frontInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFrontChange}
                className="licenseUpload__input"
              />

              <button
                type="button"
                className={`licenseUpload__button ${
                  frontFile
                    ? "licenseUpload__button--selected"
                    : ""
                }`}
                onClick={() => frontInputRef.current?.click()}
              >
                {frontFile ? (
                  <>
                    <Upload size={22} />
                    <span>画像を変更する</span>
                  </>
                ) : (
                  <>
                    <Camera size={22} />
                    <span>表面を撮影・選択</span>
                  </>
                )}
              </button>

              {frontFile && (
                <p className="licenseUpload__fileName">
                  ✓ {frontFile.name}
                </p>
              )}
            </section>

            {/* 裏面 */}
            <section className="licenseUpload">
              <div className="licenseUpload__heading">
                <h2>運転免許証 裏面</h2>
                <span className="requiredBadge">
                  必須
                </span>
              </div>

              <p className="licenseUpload__description">
                裏面も全体が見えるように
                撮影してください。
              </p>

              <img
                src={licenseBackImage}
                alt="運転免許証裏面のイメージ"
                className="licenseUpload__example"
              />

              <input
                ref={backInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleBackChange}
                className="licenseUpload__input"
              />

              <button
                type="button"
                className={`licenseUpload__button ${
                  backFile
                    ? "licenseUpload__button--selected"
                    : ""
                }`}
                onClick={() => backInputRef.current?.click()}
              >
                {backFile ? (
                  <>
                    <Upload size={22} />
                    <span>画像を変更する</span>
                  </>
                ) : (
                  <>
                    <Camera size={22} />
                    <span>裏面を撮影・選択</span>
                  </>
                )}
              </button>

              {backFile && (
                <p className="licenseUpload__fileName">
                  ✓ {backFile.name}
                </p>
              )}
            </section>

            <div className="driverRegister__notice">
              <p>
                提出された免許証は、
                ドライバー登録の審査に使用します。
              </p>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={!canProceed}
              className="driverRegister__next"
            >
              確認画面へ
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default DriverRegisterPage;