import {
  ArrowLeft,
  CarTaxiFront,
  CircleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./TaxiSwitchPage.css";

function TaxiSwitchPage() {
  const navigate = useNavigate();

  return (
    <UserScreen
      title="タクシーに切り替える"
      showBack={true}
      showNavigation={false}
    >
      <section className="taxi-switch-heading">
        <div className="taxi-switch-icon">
          <CarTaxiFront size={42} aria-hidden="true" />
        </div>

        <h2>タクシーに切り替えますか？</h2>

        <p>
          ライドシェアの車が見つからない場合、
          タクシーを利用できます。
        </p>
      </section>

      <div className="notice taxi-switch-notice">
        <CircleAlert size={22} aria-hidden="true" />

        <p>
          タクシーに切り替えると、
          現在のライドシェアのマッチングは終了します。
        </p>
      </div>

      <div className="action-stack taxi-switch-actions">
        <button
          className="primary-button"
          type="button"
          onClick={() => navigate("/user/taxi-guide")}
        >
          <CarTaxiFront size={20} aria-hidden="true" />
          タクシーに切り替える
        </button>

        <button
          className="secondary-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} aria-hidden="true" />
          マッチングに戻る
        </button>
      </div>
    </UserScreen>
  );
}

export default TaxiSwitchPage;