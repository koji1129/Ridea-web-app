import { useState } from "react";
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Navigation,
  Phone,
  Users,
  Wallet,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "./DriverOperation.css";

type OperationStatus =
  | "pickup"
  | "arrived"
  | "driving"
  | "payment"
  | "completed";

type Passenger = {
  id: number;
  name: string;
  pickup: string;
  destination: string;
  fare: number;
  boarded: boolean;
  paid: boolean;
};

const statusOrder: OperationStatus[] = [
  "pickup",
  "arrived",
  "driving",
  "payment",
  "completed",
];

const statusLabels: Record<
  OperationStatus,
  string
> = {
  pickup: "迎車中",
  arrived: "到着",
  driving: "乗車中",
  payment: "支払い確認",
  completed: "運行完了",
};

function DriverActiveOperationPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] =
    useState<OperationStatus>("pickup");

  const [passengers, setPassengers] = useState<
    Passenger[]
  >([
    {
      id: 1,
      name: "佐藤 花子",
      pickup: "春日井市役所",
      destination: "春日井駅",
      fare: 600,
      boarded: false,
      paid: false,
    },
    {
      id: 2,
      name: "鈴木 一郎",
      pickup: "春日井市役所",
      destination: "春日井駅",
      fare: 600,
      boarded: false,
      paid: false,
    },
  ]);

  const currentStep =
    statusOrder.indexOf(status);

  const totalFare = passengers.reduce(
    (total, passenger) =>
      total + passenger.fare,
    0
  );

  const allBoarded = passengers.every(
    (passenger) => passenger.boarded
  );

  const allPaid = passengers.every(
    (passenger) => passenger.paid
  );

  const toggleBoarded = (
    passengerId: number
  ) => {
    setPassengers((current) =>
      current.map((passenger) =>
        passenger.id === passengerId
          ? {
              ...passenger,
              boarded: !passenger.boarded,
            }
          : passenger
      )
    );
  };

  const togglePaid = (
    passengerId: number
  ) => {
    setPassengers((current) =>
      current.map((passenger) =>
        passenger.id === passengerId
          ? {
              ...passenger,
              paid: !passenger.paid,
            }
          : passenger
      )
    );
  };

  const handleMainAction = () => {
    switch (status) {
      case "pickup":
        setStatus("arrived");
        break;

      case "arrived":
        if (allBoarded) {
          setStatus("driving");
        }
        break;

      case "driving":
        setStatus("payment");
        break;

      case "payment":
        if (allPaid) {
          setStatus("completed");
        }
        break;

      case "completed":
        navigate("/driver");
        break;
    }
  };

  const getMainButtonLabel = () => {
    switch (status) {
      case "pickup":
        return "乗車場所に到着";

      case "arrived":
        return "乗車を確認して出発";

      case "driving":
        return "目的地に到着";

      case "payment":
        return "支払いを確認して完了";

      case "completed":
        return "ドライバーホームへ";
    }
  };

  return (
    <div className="driverOperation">
      <div className="driverOperation__container">
        <header className="driverOperation__header">
          <button
            type="button"
            className="driverOperation__back"
            onClick={() =>
              navigate(
                `/driver/operations/${id}`
              )
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>運行中</h1>
        </header>

        <main className="activeOperation">
          <section className="activeOperation__status">
            <span>現在のステータス</span>

            <h2>
              {statusLabels[status]}
            </h2>

            {status !== "completed" && (
              <p>
                安全を確認してから
                操作してください
              </p>
            )}
          </section>

          <div className="operationProgress">
            {statusOrder
              .slice(0, 4)
              .map((step, index) => {
                const isCompleted =
                  index < currentStep;

                const isActive =
                  index === currentStep;

                return (
                  <div
                    key={step}
                    className="operationProgress__item"
                  >
                    <div
                      className={[
                        "operationProgress__circle",
                        isCompleted
                          ? "operationProgress__circle--completed"
                          : "",
                        isActive
                          ? "operationProgress__circle--active"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {isCompleted ? (
                        <Check size={15} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <span>
                      {statusLabels[step]}
                    </span>
                  </div>
                );
              })}
          </div>

          {status === "completed" ? (
            <CompletedView
              passengers={passengers}
              totalFare={totalFare}
            />
          ) : (
            <>
              <section className="activeOperation__time">
                <Clock3 size={20} />

                <div>
                  <span>運行予定</span>

                  <strong>
                    16:20 〜 17:05
                  </strong>
                </div>
              </section>

              {(status === "pickup" ||
                status === "arrived") && (
                <PickupSection
                  passengers={passengers}
                  status={status}
                  onToggleBoarded={
                    toggleBoarded
                  }
                />
              )}

              {status === "driving" && (
                <DrivingSection
                  passengers={passengers}
                />
              )}

              {status === "payment" && (
                <PaymentSection
                  passengers={passengers}
                  totalFare={totalFare}
                  onTogglePaid={togglePaid}
                />
              )}

              <div className="activeOperation__warning">
                <AlertTriangle size={20} />

                <p>
                  運転中は画面を操作しないで
                  ください。安全な場所に停車してから
                  操作してください。
                </p>
              </div>

              <button
                type="button"
                className="activeOperation__mainButton"
                disabled={
                  (status === "arrived" &&
                    !allBoarded) ||
                  (status === "payment" &&
                    !allPaid)
                }
                onClick={handleMainAction}
              >
                {getMainButtonLabel()}
              </button>

              <section className="activeOperation__trouble">
                <div className="activeOperation__troubleIcon">
                  <AlertTriangle size={21} />
                </div>

                <div className="activeOperation__troubleContent">
                  <strong>
                    トラブル・運行できない場合
                  </strong>

                  <span>
                    利用者不在、車両トラブル、
                    体調不良など
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/driver/trouble")
                  }
                >
                  対応する
                  <ChevronRight size={17} />
                </button>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

type PickupSectionProps = {
  passengers: Passenger[];
  status: OperationStatus;
  onToggleBoarded: (
    passengerId: number
  ) => void;
};

function PickupSection({
  passengers,
  status,
  onToggleBoarded,
}: PickupSectionProps) {
  return (
    <>
      <section className="activeRoute">
        <div className="activeRoute__heading">
          <span>次の乗車場所</span>

          <strong>
            春日井市役所
          </strong>
        </div>

        <div className="activeRoute__address">
          <MapPin size={19} />

          <span>
            愛知県春日井市鳥居松町5丁目44
          </span>
        </div>

        <button
          type="button"
          className="activeRoute__navigation"
        >
          <Navigation size={19} />
          地図を開く
        </button>
      </section>

      <section className="activePassengers">
        <div className="activePassengers__title">
          <Users size={20} />

          <h2>乗車する利用者</h2>

          <span>
            {passengers.length}名
          </span>
        </div>

        {passengers.map((passenger) => (
          <div
            key={passenger.id}
            className="activePassenger"
          >
            <div className="activePassenger__info">
              <div className="activePassenger__avatar">
                {passenger.name.slice(0, 1)}
              </div>

              <div>
                <span>利用者</span>

                <strong>
                  {passenger.name}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className="activePassenger__phone"
              aria-label={`${passenger.name}さんに電話`}
            >
              <Phone size={18} />
            </button>

            {status === "arrived" && (
              <button
                type="button"
                className={
                  passenger.boarded
                    ? "activePassenger__check activePassenger__check--checked"
                    : "activePassenger__check"
                }
                onClick={() =>
                  onToggleBoarded(
                    passenger.id
                  )
                }
              >
                {passenger.boarded && (
                  <Check size={17} />
                )}

                {passenger.boarded
                  ? "乗車済み"
                  : "乗車確認"}
              </button>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

function DrivingSection({
  passengers,
}: {
  passengers: Passenger[];
}) {
  return (
    <>
      <section className="activeRoute">
        <div className="activeRoute__heading">
          <span>次の目的地</span>

          <strong>春日井駅</strong>
        </div>

        <div className="activeRoute__address">
          <MapPin size={19} />

          <span>
            愛知県春日井市上条町1丁目
          </span>
        </div>

        <button
          type="button"
          className="activeRoute__navigation"
        >
          <Navigation size={19} />
          地図を開く
        </button>
      </section>

      <section className="activeOperation__passengerSummary">
        <Users size={20} />

        <div>
          <span>現在乗車中</span>

          <strong>
            {passengers.length}名
          </strong>
        </div>
      </section>
    </>
  );
}

type PaymentSectionProps = {
  passengers: Passenger[];
  totalFare: number;
  onTogglePaid: (
    passengerId: number
  ) => void;
};

function PaymentSection({
  passengers,
  totalFare,
  onTogglePaid,
}: PaymentSectionProps) {
  return (
    <section className="activePayment">
      <div className="activePayment__heading">
        <Wallet size={21} />

        <div>
          <span>現金でのお支払い</span>

          <h2>
            ¥{totalFare.toLocaleString()}
          </h2>
        </div>
      </div>

      <p className="activePayment__description">
        利用者から現金を受け取ったら、
        一人ずつ支払い確認をしてください。
      </p>

      <div className="activePayment__list">
        {passengers.map((passenger) => (
          <button
            key={passenger.id}
            type="button"
            className={
              passenger.paid
                ? "activePayment__passenger activePayment__passenger--paid"
                : "activePayment__passenger"
            }
            onClick={() =>
              onTogglePaid(passenger.id)
            }
          >
            <div>
              <strong>
                {passenger.name}
              </strong>

              <span>
                ¥
                {passenger.fare.toLocaleString()}
              </span>
            </div>

            <span className="activePayment__check">
              {passenger.paid ? (
                <>
                  <Check size={16} />
                  支払済
                </>
              ) : (
                "支払い確認"
              )}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function CompletedView({
  passengers,
  totalFare,
}: {
  passengers: Passenger[];
  totalFare: number;
}) {
  const navigate = useNavigate();

  return (
    <section className="operationCompleted">
      <div className="operationCompleted__icon">
        <CheckCircle2 size={54} />
      </div>

      <h2>運行が完了しました</h2>

      <p>
        お疲れさまでした。
        <br />
        今回の運行は正常に完了しました。
      </p>

      <div className="operationCompleted__summary">
        <div>
          <span>乗車人数</span>

          <strong>
            {passengers.length}名
          </strong>
        </div>

        <div />

        <div>
          <span>受取金額</span>

          <strong>
            ¥{totalFare.toLocaleString()}
          </strong>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          navigate("/driver")
        }
      >
        ドライバーホームへ
      </button>
    </section>
  );
}

export default DriverActiveOperationPage;