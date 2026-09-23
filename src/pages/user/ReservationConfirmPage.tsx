import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import type { ReservationState } from "./flowTypes";

function ReservationConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const reservation =
    (location.state as ReservationState | null) ?? {};

  const dateLabel = reservation.date
    ? new Date(
        `${reservation.date}T00:00:00`
      ).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
      })
    : "未設定";

  const timeLabel = reservation.time
    ? `${reservation.time} までに到着`
    : "未設定";

  const moveWithState = (path: string) => {
    navigate(path, {
      state: reservation,
    });
  };

  const handleSubmit = () => {
    navigate("/user/reservation/complete", {
      state: reservation,
    });
  };

  return (
    <UserScreen
      title="予約内容確認"
      showBack={true}
      showNavigation={false}
    >
      <div className="confirm-heading">
        <h2>予約内容確認</h2>
        <p>この内容で予約しますか？</p>
      </div>

      <section className="reservation-confirm-list">
        <ConfirmSection
          label="乗車地点"
          value={reservation.pickup ?? "自宅"}
          detail="春日井市中央町1-1-1"
          onEdit={() =>
            moveWithState(
              "/user/reservation/pickup"
            )
          }
        />

        <ConfirmSection
          label="目的地"
          value={
            reservation.destination ??
            "春日井市民病院"
          }
          detail="春日井市中央町1-1-1"
          onEdit={() =>
            moveWithState(
              "/user/reservation/destination"
            )
          }
        />

        <ConfirmSection
          label="到着希望日時"
          value={dateLabel}
          detail={timeLabel}
          onEdit={() =>
            moveWithState(
              "/user/reservation/datetime"
            )
          }
        />
      </section>

      <section className="estimated-fare">
        <h2>想定料金</h2>
        <strong>約 800円</strong>
        <p>
          （相乗りのため変動する場合があります）
        </p>
      </section>

      <button
        className="primary-button confirm-submit"
        type="button"
        onClick={handleSubmit}
      >
        この内容で予約する
      </button>
    </UserScreen>
  );
}

type ConfirmSectionProps = {
  label: string;
  value: string;
  detail: string;
  onEdit: () => void;
};

function ConfirmSection({
  label,
  value,
  detail,
  onEdit,
}: ConfirmSectionProps) {
  return (
    <div className="confirm-section">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>

      <button
        type="button"
        onClick={onEdit}
      >
        変更
      </button>
    </div>
  );
}

export default ReservationConfirmPage;