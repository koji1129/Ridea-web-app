
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import {
  createReservation,
} from "../../lib/reservation-api";
import type { ReservationState } from "./flowTypes";

function ReservationConfirmPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const submittingRef = useRef(false);

  const reservation =
    (location.state as ReservationState | null) ?? {};

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
    if (submitting) return;

    navigate(path, {
      state: reservation,
    });
  };

  const hasValidCoordinates =
    reservation.pickupLat !== undefined &&
    reservation.pickupLng !== undefined &&
    reservation.destinationLat !== undefined &&
    reservation.destinationLng !== undefined &&
    [
      reservation.pickupLat,
      reservation.pickupLng,
      reservation.destinationLat,
      reservation.destinationLng,
    ].every(
      (value) =>
        typeof value === "number" &&
        Number.isFinite(value)
    );

  const isValid =
    Boolean(reservation.pickupAddress) &&
    Boolean(reservation.destinationAddress) &&
    Boolean(reservation.date) &&
    Boolean(reservation.time) &&
    hasValidCoordinates;

  const handleSubmit = async () => {
    if (!isValid || submittingRef.current) return;

    const {
      pickupAddress,
      pickupLat,
      pickupLng,
      destinationAddress,
      destinationLat,
      destinationLng,
      date,
      time,
    } = reservation;

    if (
      !pickupAddress ||
      pickupLat === undefined ||
      pickupLng === undefined ||
      !destinationAddress ||
      destinationLat === undefined ||
      destinationLng === undefined ||
      !date ||
      !time
    ) {
      setError("予約内容を確認してください。");
      return;
    }

    // 画面で選択した日時を日本時間として解釈する
    const arrivalDate = new Date(
      `${date}T${time}:00+09:00`
    );

    if (
      Number.isNaN(arrivalDate.getTime()) ||
      arrivalDate.getTime() <= Date.now()
    ) {
      setError(
        "未来の到着希望日時を選択してください。"
      );
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    try {
      const savedReservation =
        await createReservation({
          passenger_count: 1,
          start_address: pickupAddress,
          start_latitude: pickupLat,
          start_longitude: pickupLng,
          end_address: destinationAddress,
          end_latitude: destinationLat,
          end_longitude: destinationLng,
          desired_arrival_at:
            arrivalDate.toISOString(),
        });

      navigate("/user/reservation/complete", {
        replace: true,
        state: {
          ...reservation,
          reservationId: savedReservation.id,
        },
      });
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "予約に失敗しました。もう一度お試しください。"
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

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
            moveWithState(
              "/user/reservation/pickup"
            )
          }
          disabled={submitting}
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
          disabled={submitting}
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
          disabled={submitting}
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

      {error && (
        <p
          role="alert"
          style={{
            color: "#c0392b",
            marginTop: "16px",
          }}
        >
          {error}
        </p>
      )}

      <button
        className="primary-button confirm-submit"
        type="button"
        disabled={!isValid || submitting}
        onClick={() => void handleSubmit()}
      >
        {submitting
          ? "予約しています..."
          : "この内容で予約する"}
      </button>
    </UserScreen>
  );
}

type ConfirmSectionProps = {
  label: string;
  value: string;
  detail: string;
  onEdit: () => void;
  disabled?: boolean;
};

function ConfirmSection({
  label,
  value,
  detail,
  onEdit,
  disabled = false,
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
        disabled={disabled}
      >
        変更
      </button>
    </div>
  );
}

export default ReservationConfirmPage;
