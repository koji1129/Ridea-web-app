
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

  const isValid =
    Boolean(reservation.pickupAddress) &&
    reservation.pickupLat !== undefined &&
    reservation.pickupLng !== undefined &&
    Boolean(reservation.destinationAddress) &&
    reservation.destinationLat !== undefined &&
    reservation.destinationLng !== undefined &&
    Boolean(reservation.date) &&
    Boolean(reservation.time);

  return (
    <UserScreen
      title="予約内容確認"
      showBack={true}
      showNavigation={false}
    >
      <div className="confirm-heading">
        <h2>予約内容確認</h2>
        <p>予約内容に間違いがないか確認してください。</p>
      </div>

      <section className="reservation-confirm-list">
        <ConfirmSection
          label="乗車地点"
          value={reservation.pickup ?? "未設定"}
          detail={
            reservation.pickupAddress ?? "住所未設定"
          }
          onEdit={() =>
            moveWithState("/user/reservation/pickup")
          }
        />

        <ConfirmSection
          label="目的地"
          value={
            reservation.destination ?? "未設定"
          }
          detail={
            reservation.destinationAddress ??
            "住所未設定"
          }
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
        <strong>料金調整中</strong>
        <p>
          相乗り人数や移動距離によって
          料金が変動する場合があります。
        </p>
      </section>

      {!isValid && (
        <p
          role="alert"
          style={{
            color: "#c0392b",
            marginTop: "16px",
          }}
        >
          未設定の項目があります。
          「変更」から予約内容を入力してください。
        </p>
      )}

      <button
        className="primary-button confirm-submit"
        type="button"
        disabled={true}
        title="予約APIの接続後に利用できます"
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
