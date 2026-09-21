import {
  Camera,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  ImagePlus,
  TriangleAlert,
} from "lucide-react";
import {
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import "./DriverLicenseEditPage.css";

type LicenseSide = "front" | "back";

type LicenseImage = {
  file: File | null;
  previewUrl: string | null;
};

function DriverLicenseEditPage() {
  const navigate = useNavigate();

  const frontInputRef =
    useRef<HTMLInputElement>(null);

  const backInputRef =
    useRef<HTMLInputElement>(null);

  const [frontImage, setFrontImage] =
    useState<LicenseImage>({
      file: null,
      previewUrl: null,
    });

  const [backImage, setBackImage] =
    useState<LicenseImage>({
      file: null,
      previewUrl: null,
    });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    side: LicenseSide
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    if (side === "front") {
      if (frontImage.previewUrl) {
        URL.revokeObjectURL(
          frontImage.previewUrl
        );
      }

      setFrontImage({
        file,
        previewUrl,
      });

      return;
    }

    if (backImage.previewUrl) {
      URL.revokeObjectURL(
        backImage.previewUrl
      );
    }

    setBackImage({
      file,
      previewUrl,
    });
  };

  const handleSubmit = async () => {
    if (
      !frontImage.file ||
      !backImage.file
    ) {
      alert(
        "運転免許証の表面と裏面を登録してください。"
      );
      return;
    }

    setIsSubmitting(true);

    /*
     * TODO:
     * バックエンド接続後に
     * FormDataで免許証画像を送信する
     */

    setTimeout(() => {
      setIsSubmitting(false);

      navigate(
        "/driver/mypage/license",
        {
          replace: true,
          state: {
            updated: true,
          },
        }
      );
    }, 500);
  };

  return (
    <div className="driverLicenseEditPage">
      <div className="driverLicenseEditPage__container">
        <header className="driverLicenseEditPage__header">
          <button
            type="button"
            className="driverLicenseEditPage__back"
            onClick={() =>
              navigate(
                "/driver/mypage/license"
              )
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>免許証情報を更新</h1>
        </header>

        <main className="driverLicenseEditPage__main">
          <section className="driverLicenseEditIntro">
            <div className="driverLicenseEditIntro__icon">
              <CreditCard size={30} />
            </div>

            <div>
              <h2>
                新しい運転免許証を
                <br />
                登録してください
              </h2>

              <p>
                表面と裏面がはっきり読めるように
                撮影してください。
              </p>
            </div>
          </section>

          <div className="driverLicenseEditWarning">
            <TriangleAlert size={20} />

            <p>
              免許証を更新すると、
              新しい情報の確認が行われます。
              氏名・住所・有効期限などが
              読み取れる画像を登録してください。
            </p>
          </div>

          <section className="driverLicenseEditPage__section">
            <div className="driverLicenseEditPage__sectionHeading">
              <div>
                <h2>運転免許証 表面</h2>
                <span>必須</span>
              </div>

              <p>
                顔写真・氏名・住所・有効期限が
                確認できる面
              </p>
            </div>

            <LicenseUpload
              side="front"
              image={frontImage}
              onSelect={() =>
                frontInputRef.current?.click()
              }
            />

            <input
              ref={frontInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="driverLicenseEditPage__fileInput"
              onChange={(event) =>
                handleImageChange(
                  event,
                  "front"
                )
              }
            />
          </section>

          <section className="driverLicenseEditPage__section">
            <div className="driverLicenseEditPage__sectionHeading">
              <div>
                <h2>運転免許証 裏面</h2>
                <span>必須</span>
              </div>

              <p>
                住所変更などの記載がある
                裏面も登録してください
              </p>
            </div>

            <LicenseUpload
              side="back"
              image={backImage}
              onSelect={() =>
                backInputRef.current?.click()
              }
            />

            <input
              ref={backInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="driverLicenseEditPage__fileInput"
              onChange={(event) =>
                handleImageChange(
                  event,
                  "back"
                )
              }
            />
          </section>

          <section className="driverLicenseEditNotes">
            <h2>撮影時の注意</h2>

            <ul>
              <li>
                免許証全体が画像内に収まるようにしてください
              </li>

              <li>
                文字がぼやけていないことを確認してください
              </li>

              <li>
                光の反射で文字や顔写真が隠れないようにしてください
              </li>

              <li>
                加工・編集した画像は使用しないでください
              </li>
            </ul>
          </section>

          <button
            type="button"
            className="driverLicenseEditPage__submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            <CheckCircle2 size={20} />

            {isSubmitting
              ? "更新しています..."
              : "この内容で更新する"}
          </button>

          <button
            type="button"
            className="driverLicenseEditPage__cancel"
            disabled={isSubmitting}
            onClick={() =>
              navigate(
                "/driver/mypage/license"
              )
            }
          >
            キャンセル
          </button>
        </main>
      </div>
    </div>
  );
}

type LicenseUploadProps = {
  side: LicenseSide;
  image: LicenseImage;
  onSelect: () => void;
};

function LicenseUpload({
  side,
  image,
  onSelect,
}: LicenseUploadProps) {
  const label =
    side === "front" ? "表面" : "裏面";

  if (image.previewUrl) {
    return (
      <div className="licenseEditUpload licenseEditUpload--selected">
        <div className="licenseEditUpload__preview">
          <img
            src={image.previewUrl}
            alt={`運転免許証${label}`}
          />

          <div className="licenseEditUpload__registered">
            <CheckCircle2 size={15} />
            選択済み
          </div>
        </div>

        <div className="licenseEditUpload__selectedFooter">
          <div>
            <strong>
              運転免許証 {label}
            </strong>

            <span>
              {image.file?.name}
            </span>
          </div>

          <button
            type="button"
            onClick={onSelect}
          >
            <ImagePlus size={17} />
            変更
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="licenseEditUpload"
      onClick={onSelect}
    >
      <div className="licenseEditUpload__icon">
        <Camera size={31} />
      </div>

      <strong>
        運転免許証の{label}を登録
      </strong>

      <span>
        タップして撮影または画像を選択
      </span>
    </button>
  );
}

export default DriverLicenseEditPage;