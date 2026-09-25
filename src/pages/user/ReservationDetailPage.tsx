import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import {
  cancelReservation,
  getReservations,
  type Reservation,
} from "../../lib/reservation-api";
import "./ReservationDetailPage.css";

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

function formatDate(value: string | null) {
  if (!value) return "日時未定";

  return new Date(value).toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
}

function formatTime(value: string | null) {
  if (!value) return "未定";

  return new Date(value).toLocaleTimeString("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusLabel(status: string) {
  switch (status) {
    case "pending":
      return "予約申請中";
    case "accepted":
      return "予約確定";
    case "completed":
      return "利用完了";
    case "canceled":
      return "キャンセル済み";
    default:
      return status;
  }
}

function getCancellationDeadline(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 0;
  }

  const jst = new Date(
    date.getTime() + JST_OFFSET_MS
  );

  return (
    Date.UTC(
      jst.getUTCFullYear(),
      jst.getUTCMonth(),
      jst.getUTCDate()
    ) -
    DAY_MS +
    18 * 60 * 60 * 1000 -
    JST_OFFSET_MS
  );
}

function ReservationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cancelingRef = useRef(false);

  const [reservation, setReservation] =
    useState<Reservation | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCancelModal, setShowCancelModal] =
    useState(false);
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [currentTime, setCurrentTime] =
    useState(Date.now());

  useEffect(() => {
    let active = true;

    async function loadReservation() {
      setLoading(true);
      setError("");
      setReservation(null);

      try {
        const data = await getReservations();

        if (!active) return;

        const selected = data.find(
          (item) => String(item.id) === id
        );

        if (!selected) {
          setError("予約が見つかりませんでした。");
          return;
        }

        setReservation(selected);
      } catch (caughtError) {
        if (!active) return;

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "予約情報の取得に失敗しました。"
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadReservation();

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    if (!showCancelModal) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !cancelingRef.current
      ) {
        setShowCancelModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [showCancelModal]);

  const referenceTime =
    reservation?.scheduled_pickup_at ??
    reservation?.desired_arrival_at ??
    null;

  const canCancel =
    reservation !== null &&
    ["pending", "accepted"].includes(
      reservation.status
    ) &&
    referenceTime !== null &&
    currentTime < getCancellationDeadline(referenceTime);

  const openCancelModal = () => {
    setCurrentTime(Date.now());

    if (!canCancel || !reservation) return;

    if (
      Date.now() >=
      getCancellationDeadline(referenceTime!)
    ) {
      return;
    }

    setCancelError("");
    setShowCancelModal(true);
  };

  const handleCancel = async () => {
    if (
      !reservation ||
      !canCancel ||
      cancelingRef.current ||
      !referenceTime ||
      Date.now() >=
        getCancellationDeadline(referenceTime)
    ) {
      setCancelError(
        "キャンセル可能な期限を過ぎています。"
      );
      return;
    }

    cancelingRef.current = true;
    setCanceling(true);
    setCancelError("");

    try {
      await cancelReservation(reservation.id);

      setShowCancelModal(false);

      navigate("/user/reservations", {
        replace: true,
      });
    } catch (caughtError) {
      setCancelError(
        caughtError instanceof Error
          ? caughtError.message
          : "キャンセルに失敗しました。"
      );
    } finally {
      cancelingRef.current = false;
      setCanceling(false);
      setCurrentTime(Date.now());
    }
  };

  return (
    <UserScreen
      title="予約詳細"
      showBack={true}
      showNavigation={false}
    >
      {loading && <p>読み込み中...</p>}

      {!loading && error && (
        <p role="alert">{error}</p>
      )}

      {!loading && reservation && (
        <>
          <div className="detail-status">
            {getStatusLabel(reservation.status)}
          </div>

          <section className="detail-route">
            <h2>
              {formatDate(
                reservation.desired_arrival_at ??
                reservation.scheduled_pickup_at
              )}
            </h2>

            <div className="detail-route-row">
              <div
                className="detail-route-line"
                aria-hidden="true"
              >
                <span />
                <i />
                <span />
              </div>

              <div className="detail-route-stops">
                <div>
                  <strong>
                    {formatTime(
                      reservation.scheduled_pickup_at
                    )}
                  </strong>

                  <small>
                    {reservation.start_address}
                    <br />
                    {reservation.scheduled_pickup_at
                      ? "乗車予定"
                      : "乗車時刻調整中"}
                  </small>
                </div>

                <div>
                  <strong>
                    {formatTime(
                      reservation.desired_arrival_at
                    )}
                  </strong>

                  <small>
                    {reservation.end_address}
                    <br />
                    到着希望
                  </small>
                </div>
              </div>
            </div>
          </section>

          <dl className="detail-stats">
            <div>
              <dt>乗車人数</dt>
              <dd>
                {reservation.passenger_count}人
              </dd>
            </div>

            <div>
              <dt>想定料金</dt>
              <dd className="detail-price">
                {reservation.fare !== null
                  ? `${reservation.fare.toLocaleString()}円`
                  : "料金調整中"}
              </dd>
            </div>
          </dl>

          <p className="detail-note">
            （相乗りのため変動する場合があります）
          </p>

          {reservation.status === "accepted" && (
            <Link
              className="detail-map-button"
              to="/user/driver-location"
            >
              <MapPin
                size={28}
                aria-hidden="true"
              />
              地図で確認する
            </Link>
          )}

          {canCancel && (
            <button
              className="danger-button detail-cancel-button"
              type="button"
              onClick={openCancelModal}
            >
              キャンセルする
            </button>
          )}

          {showCancelModal && (
            <div
              className="cancel-modal-overlay"
              onClick={() => {
                if (!canceling) {
                  setShowCancelModal(false);
                }
              }}
            >
              <div
                className="cancel-modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="cancel-modal-title"
                aria-describedby="cancel-modal-description"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >
                <div className="cancel-modal-icon">
                  !
                </div>

                <h2 id="cancel-modal-title">
                  予約をキャンセルしますか？
                </h2>

                <p id="cancel-modal-description">
                  キャンセルすると、
                  <br />
                  この予約は取り消されます。
                </p>

                {cancelError && (
                  <p
                    role="alert"
                    className="cancel-modal-error"
                  >
                    {cancelError}
                  </p>
                )}

                <div className="cancel-modal-actions">
                  <button
                    type="button"
                    className="cancel-modal-back"
                    disabled={canceling}
                    onClick={() =>
                      setShowCancelModal(false)
                    }
                  >
                    戻る
                  </button>

                  <button
                    type="button"
                    className="cancel-modal-confirm"
                    disabled={canceling}
                    onClick={() =>
                      void handleCancel()
                    }
                  >
                    {canceling
                      ? "処理中..."
                      : "キャンセルする"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </UserScreen>
  );
}

export default ReservationDetailPage;