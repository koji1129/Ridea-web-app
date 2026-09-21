import {
  AlertTriangle,
  ChevronLeft,
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

type Passenger = {
  id: number;
  name: string;
  pickup: string;
  destination: string;
  fare: number;
};

type Operation = {
  id: number;
  date: string;
  time: string;
  estimatedEndTime: string;
  passengers: Passenger[];
};

const operations: Operation[] = [
  {
    id: 1,
    date: "9月21日（日）",
    time: "16:20",
    estimatedEndTime: "17:05",
    passengers: [
      {
        id: 1,
        name: "佐藤 花子",
        pickup: "春日井市役所",
        destination: "春日井駅",
        fare: 600,
      },
      {
        id: 2,
        name: "鈴木 一郎",
        pickup: "春日井市役所",
        destination: "春日井駅",
        fare: 600,
      },
    ],
  },
  {
    id: 2,
    date: "9月21日（日）",
    time: "17:40",
    estimatedEndTime: "18:10",
    passengers: [
      {
        id: 3,
        name: "田中 和子",
        pickup: "春日井駅",
        destination: "○○クリニック",
        fare: 800,
      },
    ],
  },
];

function DriverOperationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const operation = operations.find(
    (item) => item.id === Number(id)
  );

  if (!operation) {
    return (
      <div className="driverOperation">
        <div className="driverOperation__container">
          <header className="driverOperation__header">
            <button
              type="button"
              className="driverOperation__back"
              onClick={() =>
                navigate("/driver/operations")
              }
            >
              <ChevronLeft size={28} />
            </button>

            <h1>運行詳細</h1>
          </header>

          <div className="operationNotFound">
            <h2>運行が見つかりません</h2>

            <button
              type="button"
              onClick={() =>
                navigate("/driver/operations")
              }
            >
              運行一覧へ戻る
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalFare =
    operation.passengers.reduce(
      (total, passenger) =>
        total + passenger.fare,
      0
    );

  return (
    <div className="driverOperation">
      <div className="driverOperation__container">
        <header className="driverOperation__header">
          <button
            type="button"
            className="driverOperation__back"
            onClick={() =>
              navigate("/driver/operations")
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>運行詳細</h1>
        </header>

        <main className="operationDetail">
          <section className="operationDetail__summary">
            <div className="operationDetail__summaryTop">
              <div>
                <span>運行予定</span>
                <h2>{operation.date}</h2>
              </div>

              <span className="operationDetail__status">
                予定
              </span>
            </div>

            <div className="operationDetail__time">
              <div>
                <Clock3 size={22} />

                <div>
                  <span>運行開始</span>
                  <strong>
                    {operation.time}
                  </strong>
                </div>
              </div>

              <div className="operationDetail__timeArrow">
                →
              </div>

              <div>
                <div>
                  <span>終了予定</span>
                  <strong>
                    {operation.estimatedEndTime}
                  </strong>
                </div>
              </div>
            </div>
          </section>

          <section className="operationDetail__section">
            <div className="operationDetail__sectionTitle">
              <Users size={20} />
              <h2>乗車予定</h2>

              <span>
                {operation.passengers.length}名
              </span>
            </div>

            <div className="passengerList">
              {operation.passengers.map(
                (passenger, index) => (
                  <article
                    key={passenger.id}
                    className="passengerCard"
                  >
                    <div className="passengerCard__header">
                      <div className="passengerCard__number">
                        {index + 1}
                      </div>

                      <div className="passengerCard__name">
                        <span>利用者</span>
                        <strong>
                          {passenger.name}
                        </strong>
                      </div>

                      <button
                        type="button"
                        className="passengerCard__phone"
                        aria-label="利用者へ電話"
                      >
                        <Phone size={19} />
                      </button>
                    </div>

                    <div className="passengerCard__route">
                      <div>
                        <span className="passengerCard__routeIcon passengerCard__routeIcon--pickup">
                          <MapPin size={15} />
                        </span>

                        <div>
                          <span>乗車場所</span>
                          <strong>
                            {passenger.pickup}
                          </strong>
                        </div>
                      </div>

                      <div className="passengerCard__line" />

                      <div>
                        <span className="passengerCard__routeIcon passengerCard__routeIcon--destination">
                          <MapPin size={15} />
                        </span>

                        <div>
                          <span>降車場所</span>
                          <strong>
                            {passenger.destination}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="passengerCard__fare">
                      <span>お支払い予定</span>

                      <strong>
                        ¥
                        {passenger.fare.toLocaleString()}
                      </strong>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>

          <section className="operationDetail__payment">
            <div>
              <Wallet size={21} />

              <span>予定運賃合計</span>
            </div>

            <strong>
              ¥{totalFare.toLocaleString()}
            </strong>
          </section>

          <div className="operationDetail__notice">
            <AlertTriangle size={21} />

            <p>
              運行開始前に、乗車場所・乗車人数を
              必ず確認してください。
            </p>
          </div>

          <div className="operationDetail__actions">
            <button
              type="button"
              className="operationDetail__navigation"
            >
              <Navigation size={20} />
              乗車場所を地図で確認
            </button>

            <button
              type="button"
              className="operationDetail__start"
              onClick={() =>
                navigate(
                  `/driver/operations/${operation.id}/active`
                )
              }
            >
              運行を開始する
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverOperationDetailPage;