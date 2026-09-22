import { useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  Clock3,
  MapPin,
  Phone,
  UserRoundX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverPassengerAbsent.css";

type AbsentStatus = "waiting" | "reported";

function DriverPassengerAbsentPage() {
  const navigate = useNavigate();

  const [status, setStatus] =
    useState<AbsentStatus>("waiting");

  const [contacted, setContacted] =
    useState(false);

  if (status === "reported") {
    return (
      <div className="passengerAbsent">
        <div className="passengerAbsent__container">
          <header className="passengerAbsent__header">
            <h1>利用者不在の報告</h1>
          </header>

          <main className="passengerAbsent__main">
            <section className="absentComplete">
              <div className="absentComplete__icon">
                <CheckCircle2 size={42} />
              </div>

              <h2>運営へ報告しました</h2>

              <p>
                利用者が乗車場所にいないことを
                YORIAI運営へ送信しました。
              </p>
            </section>

            <section className="absentInstruction">
              <strong>運営からの案内をお待ちください</strong>

              <p>
                運行を終了するか、もうしばらく待機するかを
                運営側で確認します。
              </p>
            </section>

            <button
              type="button"
              className="passengerAbsent__primary"
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
    <div className="passengerAbsent">
      <div className="passengerAbsent__container">
        <header className="passengerAbsent__header">
          <button
            type="button"
            className="passengerAbsent__back"
            onClick={() =>
              navigate("/driver/trouble")
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>利用者が来ない</h1>
        </header>

        <main className="passengerAbsent__main">
          <section className="absentHero">
            <div className="absentHero__icon">
              <UserRoundX size={31} />
            </div>

            <div>
              <h2>
                利用者が見当たりませんか？
              </h2>

              <p>
                乗車場所を確認して、
                利用者へ連絡してください。
              </p>
            </div>
          </section>

          <section className="absentPassenger">
            <span className="absentPassenger__label">
              対象の利用者
            </span>

            <strong>佐藤 花子さん</strong>

            <div className="absentPassenger__place">
              <MapPin size={17} />

              <div>
                <span>乗車場所</span>
                <strong>春日井市役所</strong>
              </div>
            </div>

            <div className="absentPassenger__time">
              <Clock3 size={17} />
              乗車予定 16:20
            </div>
          </section>

          <section className="absentSteps">
            <h2>対応手順</h2>

            <div className="absentStep">
              <span className="absentStep__number">
                1
              </span>

              <div>
                <strong>
                  乗車場所を確認
                </strong>

                <p>
                  指定された乗車場所に到着しているか
                  確認してください。
                </p>
              </div>
            </div>

            <div className="absentStep">
              <span className="absentStep__number">
                2
              </span>

              <div className="absentStep__content">
                <strong>
                  利用者へ連絡
                </strong>

                <p>
                  利用者へ電話して現在地を
                  確認してください。
                </p>

                <button
                  type="button"
                  className={
                    contacted
                      ? "absentCall absentCall--done"
                      : "absentCall"
                  }
                  onClick={() =>
                    setContacted(true)
                  }
                >
                  {contacted ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Phone size={18} />
                  )}

                  {contacted
                    ? "連絡済みにする"
                    : "利用者へ電話する"}
                </button>
              </div>
            </div>

            <div className="absentStep">
              <span className="absentStep__number">
                3
              </span>

              <div>
                <strong>
                  数分待機
                </strong>

                <p>
                  利用者が向かっている場合は、
                  安全な場所で待機してください。
                </p>
              </div>
            </div>
          </section>

          <div className="passengerAbsent__notice">
            <CircleAlert size={19} />

            <p>
              利用者と連絡が取れない、
              または待機しても現れない場合は
              YORIAI運営へ報告してください。
            </p>
          </div>

          <button
            type="button"
            className="passengerAbsent__report"
            onClick={() =>
              setStatus("reported")
            }
          >
            利用者が来ないことを報告
          </button>

          <button
            type="button"
            className="passengerAbsent__cancel"
            onClick={() => navigate(-1)}
          >
            運行画面へ戻る
          </button>
        </main>
      </div>
    </div>
  );
}

export default DriverPassengerAbsentPage;