import { useState } from "react";
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Route,
  Users,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverRevenue.css";

type RevenueRecord = {
  id: number;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  passengers: number;
  amount: number;
};

const revenueRecords: RevenueRecord[] = [
  {
    id: 1,
    date: "9月19日",
    time: "09:30",
    pickup: "春日井駅",
    destination: "春日井市役所",
    passengers: 2,
    amount: 1100,
  },
  {
    id: 2,
    date: "9月18日",
    time: "13:20",
    pickup: "勝川駅",
    destination: "春日井市民病院",
    passengers: 2,
    amount: 1400,
  },
  {
    id: 3,
    date: "9月16日",
    time: "16:40",
    pickup: "高蔵寺駅",
    destination: "○○クリニック",
    passengers: 1,
    amount: 900,
  },
  {
    id: 4,
    date: "9月14日",
    time: "10:15",
    pickup: "春日井市役所",
    destination: "春日井駅",
    passengers: 3,
    amount: 1800,
  },
];

function DriverRevenuePage() {
  const navigate = useNavigate();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(2026, 8, 1)
  );

  const totalRevenue = revenueRecords.reduce(
    (total, record) => total + record.amount,
    0
  );

  const totalPassengers = revenueRecords.reduce(
    (total, record) => total + record.passengers,
    0
  );

  const changeMonth = (amount: number) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + amount,
        1
      )
    );
  };

  return (
    <div className="driverRevenue">
      <div className="driverRevenue__container">
        <header className="driverRevenue__header">
          <button
            type="button"
            className="driverRevenue__back"
            onClick={() => navigate("/driver")}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>売上・運行実績</h1>
        </header>

        <main className="driverRevenue__main">
          <div className="driverRevenue__month">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="前の月"
            >
              <ChevronLeft size={22} />
            </button>

            <strong>
              {currentMonth.getFullYear()}年
              {currentMonth.getMonth() + 1}月
            </strong>

            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="次の月"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <section className="revenueMainCard">
            <div className="revenueMainCard__icon">
              <Wallet size={25} />
            </div>

            <span>今月の受取金額</span>

            <strong>
              ¥{totalRevenue.toLocaleString()}
            </strong>

            <p>
              現金で受け取り確認済みの金額
            </p>
          </section>

          <section className="revenueStats">
            <div className="revenueStats__item">
              <div className="revenueStats__icon">
                <Route size={21} />
              </div>

              <div>
                <span>運行回数</span>

                <strong>
                  {revenueRecords.length}
                  <small>回</small>
                </strong>
              </div>
            </div>

            <div className="revenueStats__item">
              <div className="revenueStats__icon">
                <Users size={21} />
              </div>

              <div>
                <span>乗車人数</span>

                <strong>
                  {totalPassengers}
                  <small>人</small>
                </strong>
              </div>
            </div>
          </section>

          <section className="revenueHistory">
            <div className="revenueHistory__heading">
              <div>
                <h2>運行履歴</h2>
                <p>
                  完了した運行と受取金額
                </p>
              </div>

              <span>
                {revenueRecords.length}件
              </span>
            </div>

            <div className="revenueHistory__list">
              {revenueRecords.map((record) => (
                <article
                  key={record.id}
                  className="revenueRecord"
                >
                  <div className="revenueRecord__header">
                    <div>
                      <strong>
                        {record.date}
                      </strong>

                      <span>
                        {record.time}
                      </span>
                    </div>

                    <strong className="revenueRecord__amount">
                      ¥{record.amount.toLocaleString()}
                    </strong>
                  </div>

                  <div className="revenueRecord__route">
                    <div>
                      <span className="revenueRecord__marker revenueRecord__marker--pickup">
                        <MapPin size={14} />
                      </span>

                      <p>
                        {record.pickup}
                      </p>
                    </div>

                    <div className="revenueRecord__line" />

                    <div>
                      <span className="revenueRecord__marker revenueRecord__marker--destination">
                        <MapPin size={14} />
                      </span>

                      <p>
                        {record.destination}
                      </p>
                    </div>
                  </div>

                  <div className="revenueRecord__footer">
                    <div>
                      <Users size={16} />

                      <span>
                        {record.passengers}名乗車
                      </span>
                    </div>

                    <div className="revenueRecord__paid">
                      <Banknote size={16} />
                      現金受取済み
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="driverRevenue__notice">
            <Banknote size={20} />

            <p>
              表示されている金額は、
              利用者から直接受け取った
              現金の記録です。
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverRevenuePage;