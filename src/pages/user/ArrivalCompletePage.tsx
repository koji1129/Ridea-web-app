import { Car, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ArrivalCompletePage.css";
function ArrivalCompletePage() {
  const navigate = useNavigate();

  return (
    <UserScreen
      title="お迎え到着"
      showBack={false}
      showNavigation={false}
    >
      <main className="arrival-complete-screen">
        <div className="arrival-check-ring">
          <div>
            <Check
              size={58}
              strokeWidth={3}
              aria-hidden="true"
            />
          </div>
        </div>

        <h1>お迎えの車が到着しました</h1>

        <p>
          乗車地点でお待ちしています
        </p>

        <div className="info-card">
          <Car
            size={32}
            aria-hidden="true"
          />

          <div>
            <strong>山田 太郎さん</strong>
            <p>車両番号：春日井 500 あ 12-34</p>
          </div>
        </div>

        <button
          className="primary-button arrival-home-button"
          type="button"
          onClick={() =>
            navigate("/user/ride")
          }
        >
          乗車しました
        </button>
      </main>
    </UserScreen>
  );
}

export default ArrivalCompletePage;