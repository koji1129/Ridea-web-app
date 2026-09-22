import { useState } from "react";
import {
  AlertTriangle,
  Car,
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  HeartPulse,
  LoaderCircle,
  MapPinned,
  Phone,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverUnavailable.css";

type UnavailableReason =
  | "vehicle"
  | "health"
  | "road"
  | "other";

type ReportStatus =
  | "select"
  | "confirm"
  | "arranging";

const reasons = [
  {
    id: "vehicle" as const,
    icon: <Wrench size={22} />,
    title: "車両トラブル",
    description: "故障・パンクなど",
  },
  {
    id: "health" as const,
    icon: <HeartPulse size={22} />,
    title: "体調不良",
    description: "安全な運行を継続できない",
  },
  {
    id: "road" as const,
    icon: <MapPinned size={22} />,
    title: "道路・交通状況",
    description: "通行止めなどで運行できない",
  },
  {
    id: "other" as const,
    icon: <CircleAlert size={22} />,
    title: "その他",
    description: "上記以外の理由",
  },
];

function DriverUnavailablePage() {
  const navigate = useNavigate();

  const [reason, setReason] =
    useState<UnavailableReason | null>(null);

  const [status, setStatus] =
    useState<ReportStatus>("select");

  const selectedReason = reasons.find(
    (item) => item.id === reason
  );

  const handleNext = () => {
    if (!reason) {
      return;
    }

    setStatus("confirm");
  };

  const handleReport = () => {
    // TODO:
    // API接続後はここで運行継続不可を送信する
    setStatus("arranging");
  };

  if (status === "arranging") {
    return (
      <ArrangementView
        onHome={() => navigate("/driver")}
      />
    );
  }

  return (
    <div className="driverUnavailable">
      <div className="driverUnavailable__container">
        <header className="driverUnavailable__header">
          <button
            type="button"
            className="driverUnavailable__back"
            onClick={() => {
              if (status === "confirm") {
                setStatus("select");
                return;
              }

              navigate("/driver/trouble");
            }}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>運行を継続できない</h1>
        </header>

        <main className="driverUnavailable__main">
          <div className="driverUnavailable__alert">
            <AlertTriangle size={21} />

            <p>
              安全な運行ができない場合は、
              無理に運行を続けないでください。
            </p>
          </div>

          {status === "select" && (
            <>
              <section className="unavailableIntro">
                <div className="unavailableIntro__icon">
                  <Car size={29} />
                </div>

                <div>
                  <h2>
                    運行できない理由を
                    選択してください
                  </h2>

                  <p>
                    報告後、必要に応じて
                    代替車両を手配します。
                  </p>
                </div>
              </section>

              <section className="unavailableReasons">
                {reasons.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={
                      reason === item.id
                        ? "unavailableReason unavailableReason--selected"
                        : "unavailableReason"
                    }
                    onClick={() =>
                      setReason(item.id)
                    }
                  >
                    <div className="unavailableReason__icon">
                      {item.icon}
                    </div>

                    <div>
                      <strong>
                        {item.title}
                      </strong>

                      <span>
                        {item.description}
                      </span>
                    </div>

                    <span className="unavailableReason__radio">
                      {reason === item.id && (
                        <span />
                      )}
                    </span>
                  </button>
                ))}
              </section>

              <section className="unavailableCurrentOperation">
                <span>現在の運行</span>

                <div className="unavailableCurrentOperation__route">
                  <div>
                    <small>乗車</small>
                    <strong>
                      春日井市役所
                    </strong>
                  </div>

                  <span>→</span>

                  <div>
                    <small>降車</small>
                    <strong>
                      春日井駅
                    </strong>
                  </div>
                </div>

                <p>
                  利用者 2名 ・ 16:20出発予定
                </p>
              </section>

              <button
                type="button"
                className="driverUnavailable__next"
                disabled={!reason}
                onClick={handleNext}
              >
                内容を確認する
              </button>
            </>
          )}

          {status === "confirm" && (
            <>
              <section className="unavailableConfirm">
                <div className="unavailableConfirm__icon">
                  <AlertTriangle size={29} />
                </div>

                <h2>
                  運行停止を報告します
                </h2>

                <p>
                  報告すると、現在の運行を
                  継続できないことがYORIAI運営へ
                  通知されます。
                </p>
              </section>

              <div className="unavailableConfirmCard">
                <span>報告理由</span>

                <strong>
                  {selectedReason?.title}
                </strong>
              </div>

              <section className="unavailableFlow">
                <h2>報告後の流れ</h2>

                <FlowItem
                  number={1}
                  title="YORIAI運営へ通知"
                  description="現在の状況を運営側へ共有します"
                />

                <FlowItem
                  number={2}
                  title="利用者へ連絡"
                  description="運行状況の変更を利用者へ通知します"
                />

                <FlowItem
                  number={3}
                  title="代替車両を確認"
                  description="提携タクシー会社と連携して代替手段を確認します"
                />
              </section>

              <div className="driverUnavailable__important">
                <CircleAlert size={19} />

                <p>
                  報告後は運営からの案内を確認し、
                  利用者を安全な場所でお待たせしてください。
                </p>
              </div>

              <button
                type="button"
                className="driverUnavailable__report"
                onClick={handleReport}
              >
                <AlertTriangle size={19} />
                運行停止を報告する
              </button>

              <button
                type="button"
                className="driverUnavailable__cancel"
                onClick={() =>
                  setStatus("select")
                }
              >
                戻って修正する
              </button>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function FlowItem({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="unavailableFlow__item">
      <div className="unavailableFlow__number">
        {number}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}

function ArrangementView({
  onHome,
}: {
  onHome: () => void;
}) {
  return (
    <div className="driverUnavailable">
      <div className="driverUnavailable__container">
        <header className="driverUnavailable__header">
          <h1>代替車両の手配</h1>
        </header>

        <main className="driverUnavailable__main">
          <section className="arrangementHero">
            <div className="arrangementHero__icon">
              <CheckCircle2 size={40} />
            </div>

            <h2>
              運行停止を報告しました
            </h2>

            <p>
              YORIAI運営へ現在の状況を
              送信しました。
            </p>
          </section>

          <section className="arrangementStatus">
            <div className="arrangementStatus__loader">
              <LoaderCircle size={28} />
            </div>

            <div>
              <span>現在の状況</span>

              <strong>
                代替車両を手配しています
              </strong>

              <p>
                提携タクシー会社へ
                代替車両を確認しています。
              </p>
            </div>
          </section>

          <section className="arrangementSteps">
            <ArrangementStep
              completed
              title="運行停止を受付"
            />

            <ArrangementStep
              active
              title="代替車両を確認中"
            />

            <ArrangementStep
              title="代替車両を確定"
            />

            <ArrangementStep
              title="利用者へ案内"
            />
          </section>

          <div className="arrangementNotice">
            <CircleAlert size={19} />

            <p>
              手配状況が更新されるまで、
              利用者と一緒に安全な場所で
              お待ちください。
            </p>
          </div>

          <button
            type="button"
            className="arrangementContact"
          >
            <Phone size={19} />

            <div>
              <strong>
                YORIAI運営へ連絡
              </strong>

              <span>
                緊急の場合はこちら
              </span>
            </div>
          </button>

          <button
            type="button"
            className="arrangementHome"
            onClick={onHome}
          >
            ドライバーホームへ
          </button>
        </main>
      </div>
    </div>
  );
}

function ArrangementStep({
  title,
  completed = false,
  active = false,
}: {
  title: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "arrangementStep",
        completed
          ? "arrangementStep--completed"
          : "",
        active
          ? "arrangementStep--active"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="arrangementStep__dot">
        {completed && (
          <CheckCircle2 size={17} />
        )}

        {active && !completed && (
          <LoaderCircle size={16} />
        )}
      </div>

      <strong>{title}</strong>
    </div>
  );
}

export default DriverUnavailablePage;