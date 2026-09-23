import {
  House,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./RideCompletePage.css";

function RideCompletePage() {
  const navigate = useNavigate();

  return (
    <UserScreen
      title="乗車完了"
      showBack={false}
      showNavigation={false}
    >
      <main className="ride-complete-screen">
        <h1>ご利用ありがとうございました</h1>

        <p className="ride-complete-lead">
          またのご利用をお待ちしております
        </p>

        <section className="trip-summary">
          <h2>8月20日（水）</h2>

          <div className="trip-summary-body">
            <div
              className="trip-route-mini"
              aria-hidden="true"
            >
              <span />
              <i />
              <span />
            </div>

            <div className="trip-stops">
              <div>
                <strong>自宅</strong>
                <small>9:20 発</small>
              </div>

              <div>
                <strong>
                  春日井市民病院
                </strong>
                <small>9:40 着</small>
              </div>
            </div>

            <div
              className="trip-map-mini"
              aria-hidden="true"
            >
              <span className="mini-car">
                🚙
              </span>

              <span className="mini-route" />
              <span className="mini-pin">
                ●
              </span>
            </div>
          </div>
        </section>

        <section className="fare-breakdown">
          <div className="fare-heading">
            <Wallet
              size={36}
              aria-hidden="true"
            />

            <strong>ご利用料金</strong>
            <b>600円</b>
          </div>

          <div>
            <span>基本料金</span>
            <strong>500円</strong>
          </div>

          <div>
            <span>
              距離料金（2.1km）
            </span>
            <strong>100円</strong>
          </div>

          <div>
            <span>割引</span>
            <strong>- 0円</strong>
          </div>
        </section>

        <div
          className="fare-hospital"
          aria-hidden="true"
        >
          <span>+</span>
          <i />
          <b />
          <em />
        </div>

        <p className="fare-thanks">
          ご利用いただき、
          <br />
          ありがとうございました
        </p>

        <div className="ride-complete-actions">

          <button
            className="secondary-button"
            type="button"
            onClick={() =>
              navigate("/user/home")
            }
          >
            <House
              size={25}
              aria-hidden="true"
            />
            ホームに戻る
          </button>
        </div>
      </main>
    </UserScreen>
  );
}

export default RideCompletePage;