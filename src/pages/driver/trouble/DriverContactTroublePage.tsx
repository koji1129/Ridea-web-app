import { useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  Clock3,
  MapPin,
  Phone,
  PhoneOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverContactTrouble.css";

type ContactStatus = "contact" | "reported";

function DriverContactTroublePage() {
  const navigate = useNavigate();

  const [status, setStatus] =
    useState<ContactStatus>("contact");

  const [called, setCalled] = useState(false);

  if (status === "reported") {
    return (
      <div className="contactTrouble">
        <div className="contactTrouble__container">
          <header className="contactTrouble__header">
            <h1>連絡不可の報告</h1>
          </header>

          <main className="contactTrouble__main">
            <section className="contactTroubleComplete">
              <div className="contactTroubleComplete__icon">
                <CheckCircle2 size={42} />
              </div>

              <h2>運営へ報告しました</h2>

              <p>
                利用者と連絡が取れないことを
                YORIAI運営へ送信しました。
              </p>
            </section>

            <section className="contactTroubleWaiting">
              <strong>
                運営からの案内をお待ちください
              </strong>

              <p>
                利用者への再連絡や運行継続について、
                運営側で確認します。
              </p>
            </section>

            <button
              type="button"
              className="contactTrouble__primary"
              onClick={() =>
                navigate("/driver/operations")
              }
            >
              運行一覧へ戻る
            </button>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="contactTrouble">
      <div className="contactTrouble__container">
        <header className="contactTrouble__header">
          <button
            type="button"
            className="contactTrouble__back"
            onClick={() =>
              navigate("/driver/trouble")
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>利用者と連絡が取れない</h1>
        </header>

        <main className="contactTrouble__main">
          <section className="contactTroubleHero">
            <div className="contactTroubleHero__icon">
              <PhoneOff size={30} />
            </div>

            <div>
              <h2>連絡が取れませんか？</h2>

              <p>
                利用者情報と乗車場所を確認して、
                もう一度連絡してください。
              </p>
            </div>
          </section>

          <section className="contactTroublePassenger">
            <span className="contactTroublePassenger__label">
              対象の利用者
            </span>

            <strong>佐藤 花子さん</strong>

            <div className="contactTroublePassenger__info">
              <MapPin size={17} />

              <div>
                <span>乗車場所</span>
                <strong>春日井市役所</strong>
              </div>
            </div>

            <div className="contactTroublePassenger__info">
              <Clock3 size={17} />

              <div>
                <span>乗車予定</span>
                <strong>16:20</strong>
              </div>
            </div>
          </section>

          <section className="contactTroubleSteps">
            <h2>対応手順</h2>

            <ContactStep
              number={1}
              title="利用者情報を確認"
              description="対象の利用者と乗車場所に間違いがないか確認してください。"
            />

            <div className="contactTroubleStep">
              <span className="contactTroubleStep__number">
                2
              </span>

              <div className="contactTroubleStep__content">
                <strong>
                  もう一度電話する
                </strong>

                <p>
                  時間を少し空けて、利用者へ
                  再度連絡してください。
                </p>

                <button
                  type="button"
                  className={
                    called
                      ? "contactTroubleCall contactTroubleCall--done"
                      : "contactTroubleCall"
                  }
                  onClick={() => setCalled(true)}
                >
                  {called ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Phone size={18} />
                  )}

                  {called
                    ? "再連絡済み"
                    : "利用者へ電話する"}
                </button>
              </div>
            </div>

            <ContactStep
              number={3}
              title="連絡できなければ運営へ報告"
              description="利用者と連絡が取れない場合は、YORIAI運営へ状況を共有してください。"
            />
          </section>

          <div className="contactTrouble__notice">
            <CircleAlert size={19} />

            <p>
              自己判断で運行を終了せず、
              利用者と連絡が取れない場合は
              YORIAI運営へ報告してください。
            </p>
          </div>

          <button
            type="button"
            className="contactTrouble__report"
            onClick={() => setStatus("reported")}
          >
            <PhoneOff size={18} />
            連絡が取れないことを報告
          </button>

          <button
            type="button"
            className="contactTrouble__cancel"
            onClick={() => navigate(-1)}
          >
            運行画面へ戻る
          </button>
        </main>
      </div>
    </div>
  );
}

function ContactStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="contactTroubleStep">
      <span className="contactTroubleStep__number">
        {number}
      </span>

      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default DriverContactTroublePage;