import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverOperation.css";

type OperationStatus =
  | "scheduled"
  | "driving"
  | "completed"
  | "cancelled";

type OperationTab =
  | "today"
  | "upcoming"
  | "past";

type Operation = {
  id: number;
  date: string;
  dateLabel: string;
  time: string;
  pickup: string;
  destination: string;
  passengerCount: number;
  fare: number;
  status: OperationStatus;
};

const operations: Operation[] = [
  {
    id: 1,
    date: "2026-09-21",
    dateLabel: "9月21日（日）",
    time: "16:20",
    pickup: "春日井市役所",
    destination: "春日井駅",
    passengerCount: 2,
    fare: 1200,
    status: "scheduled",
  },
  {
    id: 2,
    date: "2026-09-21",
    dateLabel: "9月21日（日）",
    time: "17:40",
    pickup: "春日井駅",
    destination: "○○クリニック",
    passengerCount: 1,
    fare: 800,
    status: "scheduled",
  },
  {
    id: 3,
    date: "2026-09-22",
    dateLabel: "9月22日（月）",
    time: "10:30",
    pickup: "高蔵寺駅",
    destination: "春日井市民病院",
    passengerCount: 2,
    fare: 1400,
    status: "scheduled",
  },
  {
    id: 4,
    date: "2026-09-24",
    dateLabel: "9月24日（水）",
    time: "13:15",
    pickup: "春日井市民病院",
    destination: "勝川駅",
    passengerCount: 3,
    fare: 1600,
    status: "scheduled",
  },
  {
    id: 5,
    date: "2026-09-19",
    dateLabel: "9月19日（金）",
    time: "09:30",
    pickup: "春日井駅",
    destination: "春日井市役所",
    passengerCount: 2,
    fare: 1100,
    status: "completed",
  },
  {
    id: 6,
    date: "2026-09-18",
    dateLabel: "9月18日（木）",
    time: "15:00",
    pickup: "高蔵寺駅",
    destination: "○○クリニック",
    passengerCount: 1,
    fare: 900,
    status: "cancelled",
  },
];

const TODAY = "2026-09-21";

const statusLabels: Record<
  OperationStatus,
  string
> = {
  scheduled: "予定",
  driving: "運行中",
  completed: "完了",
  cancelled: "キャンセル",
};

function DriverOperationListPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<OperationTab>("today");

  const filteredOperations =
    operations.filter((operation) => {
      if (activeTab === "today") {
        return operation.date === TODAY;
      }

      if (activeTab === "upcoming") {
        return operation.date > TODAY;
      }

      return operation.date < TODAY;
    });

  const groupedOperations =
    filteredOperations.reduce<
      Record<string, Operation[]>
    >((groups, operation) => {
      if (!groups[operation.date]) {
        groups[operation.date] = [];
      }

      groups[operation.date].push(operation);

      return groups;
    }, {});

  return (
    <div className="driverOperation">
      <div className="driverOperation__container">
        <header className="driverOperation__header">
          <button
            type="button"
            className="driverOperation__back"
            onClick={() => navigate("/driver")}
            aria-label="ホームへ戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>運行一覧</h1>
        </header>

        <main className="driverOperation__main">
          <section className="driverOperation__intro">
            <div className="driverOperation__introIcon">
              <CalendarDays size={25} />
            </div>

            <div>
              <h2>運行予定を確認</h2>

              <p>
                割り当てられた運行の時間や
                乗降場所を確認できます。
              </p>
            </div>
          </section>

          <div className="operationTabs">
            <button
              type="button"
              className={
                activeTab === "today"
                  ? "operationTabs__button operationTabs__button--active"
                  : "operationTabs__button"
              }
              onClick={() =>
                setActiveTab("today")
              }
            >
              今日
            </button>

            <button
              type="button"
              className={
                activeTab === "upcoming"
                  ? "operationTabs__button operationTabs__button--active"
                  : "operationTabs__button"
              }
              onClick={() =>
                setActiveTab("upcoming")
              }
            >
              今後
            </button>

            <button
              type="button"
              className={
                activeTab === "past"
                  ? "operationTabs__button operationTabs__button--active"
                  : "operationTabs__button"
              }
              onClick={() =>
                setActiveTab("past")
              }
            >
              過去
            </button>
          </div>

          {filteredOperations.length === 0 ? (
            <EmptyOperation />
          ) : (
            <div className="operationList">
              {Object.entries(
                groupedOperations
              ).map(([date, items]) => (
                <section
                  key={date}
                  className="operationGroup"
                >
                  <div className="operationGroup__header">
                    <h2>
                      {items[0].dateLabel}
                    </h2>

                    <span>
                      {items.length}件
                    </span>
                  </div>

                  <div className="operationGroup__list">
                    {items.map((operation) => (
                      <OperationCard
                        key={operation.id}
                        operation={operation}
                        onClick={() =>
                          navigate(
                            `/driver/operations/${operation.id}`
                          )
                        }
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

type OperationCardProps = {
  operation: Operation;
  onClick: () => void;
};

function OperationCard({
  operation,
  onClick,
}: OperationCardProps) {
  return (
    <article className="operationCard">
      <div className="operationCard__top">
        <div className="operationCard__time">
          <Clock3 size={19} />
          <strong>{operation.time}</strong>
        </div>

        <span
          className={`operationCard__status operationCard__status--${operation.status}`}
        >
          {statusLabels[operation.status]}
        </span>
      </div>

      <div className="operationCard__route">
        <div className="operationCard__place">
          <div className="operationCard__marker operationCard__marker--pickup">
            <MapPin size={16} />
          </div>

          <div>
            <span>乗車場所</span>
            <strong>
              {operation.pickup}
            </strong>
          </div>
        </div>

        <div className="operationCard__routeLine" />

        <div className="operationCard__place">
          <div className="operationCard__marker operationCard__marker--destination">
            <MapPin size={16} />
          </div>

          <div>
            <span>降車場所</span>
            <strong>
              {operation.destination}
            </strong>
          </div>
        </div>
      </div>

      <div className="operationCard__meta">
        <div>
          <Users size={18} />

          <span>
            乗車予定
            <strong>
              {operation.passengerCount}名
            </strong>
          </span>
        </div>

        <div>
          <Wallet size={18} />

          <span>
            予定運賃
            <strong>
              ¥
              {operation.fare.toLocaleString()}
            </strong>
          </span>
        </div>
      </div>

      <button
        type="button"
        className="operationCard__detail"
        onClick={onClick}
      >
        詳細を見る
        <ChevronRight size={19} />
      </button>
    </article>
  );
}

function EmptyOperation() {
  return (
    <div className="operationEmpty">
      <div className="operationEmpty__icon">
        <CalendarDays size={42} />
      </div>

      <h2>運行予定はありません</h2>

      <p>
        現在表示できる運行はありません。
        <br />
        新しい運行が決まると
        ここに表示されます。
      </p>
    </div>
  );
}

export default DriverOperationListPage;