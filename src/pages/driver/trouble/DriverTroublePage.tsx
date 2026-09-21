import type { ReactNode } from "react";
import {
  AlertTriangle,
  Car,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Phone,
  UserRoundX,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverTrouble.css";

type TroubleItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "normal" | "danger";
  onClick: () => void;
};

function DriverTroublePage() {
  const navigate = useNavigate();

  return (
    <div className="driverTrouble">
      <div className="driverTrouble__container">
        <header className="driverTrouble__header">
          <button
            type="button"
            className="driverTrouble__back"
            onClick={() => navigate(-1)}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>運行中のトラブル</h1>
        </header>

        <main className="driverTrouble__main">
          <section className="driverTroubleHero">
            <div className="driverTroubleHero__icon">
              <AlertTriangle size={31} />
            </div>

            <div>
              <h2>状況を選択してください</h2>
              <p>
                運行中に問題が発生した場合は、
                現在の状況に近いものを選択してください。
              </p>
            </div>
          </section>

          <div className="driverTrouble__safety">
            <CircleAlert size={20} />

            <p>
              運転中の場合は、安全な場所に停車してから
              操作してください。
            </p>
          </div>

          <section className="driverTrouble__section">
            <h2>利用者について</h2>

            <div className="driverTroubleList">
              <TroubleItem
                icon={<UserRoundX size={23} />}
                title="利用者が乗車場所に来ない"
                description="待ち合わせ場所に利用者が見当たらない"
                onClick={() =>
                  navigate(
                    "/driver/trouble/passenger-absent"
                  )
                }
              />

              <TroubleItem
                icon={<Phone size={23} />}
                title="利用者と連絡が取れない"
                description="電話などで利用者と連絡できない"
                onClick={() =>
                  navigate("/driver/trouble/contact")
                }
              />
            </div>
          </section>

          <section className="driverTrouble__section">
            <h2>車両・運行について</h2>

            <div className="driverTroubleList">
              <TroubleItem
                icon={<Wrench size={23} />}
                title="車両にトラブルが発生した"
                description="故障・パンクなど車両に問題がある"
                onClick={() =>
                  navigate(
                    "/driver/trouble/unavailable"
                  )
                }
              />

              <TroubleItem
                icon={<Car size={23} />}
                title="運行を継続できない"
                description="体調・道路状況などにより運行できない"
                variant="danger"
                onClick={() =>
                  navigate(
                    "/driver/trouble/unavailable"
                  )
                }
              />
            </div>
          </section>

          <section className="driverTrouble__emergency">
            <div className="driverTrouble__emergencyHeader">
              <div className="driverTrouble__emergencyIcon">
                <AlertTriangle size={22} />
              </div>

              <div>
                <strong>事故・けが・緊急事態</strong>
                <span>人命や安全に関わる場合</span>
              </div>
            </div>

            <p>
              事故やけがなど緊急性が高い場合は、
              YORIAIへの連絡より先に警察・消防などへ
              必要な緊急通報を行ってください。
            </p>
          </section>

          <button
            type="button"
            className="driverTrouble__support"
          >
            <Phone size={19} />

            <div>
              <strong>YORIAI運営へ連絡</strong>
              <span>判断に迷った場合はこちら</span>
            </div>

            <ChevronRight size={19} />
          </button>
        </main>
      </div>
    </div>
  );
}

function TroubleItem({
  icon,
  title,
  description,
  variant = "normal",
  onClick,
}: TroubleItemProps) {
  return (
    <button
      type="button"
      className={
        variant === "danger"
          ? "driverTroubleItem driverTroubleItem--danger"
          : "driverTroubleItem"
      }
      onClick={onClick}
    >
      <div className="driverTroubleItem__icon">
        {icon}
      </div>

      <div className="driverTroubleItem__content">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <ChevronRight
        size={20}
        className="driverTroubleItem__arrow"
      />
    </button>
  );
}

export default DriverTroublePage;