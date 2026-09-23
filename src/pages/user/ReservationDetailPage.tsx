import { MapPin, Phone } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./ReservationDetailPage.css";
function ReservationDetailPage() {
  const { id } = useParams();

  return (
    <UserScreen
      title="予約詳細"
      showBack={true}
      showNavigation={false}
    >
      <div className="detail-status">
        予約確定
      </div>

      <section className="detail-route">
        <h2>8月20日（水）</h2>

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
              <strong>9:20 ごろ</strong>
              <small>
                自宅
                <br />
                乗車予定
              </small>
            </div>

            <div>
              <strong>
                9:40 ごろ 病院
              </strong>
              <small>到着予定</small>
            </div>
          </div>
        </div>
      </section>

      <dl className="detail-stats">
        <div>
          <dt>乗車人数</dt>
          <dd>1人</dd>
        </div>

        <div>
          <dt>想定料金</dt>
          <dd className="detail-price">
            600円
          </dd>
        </div>
      </dl>

      <p className="detail-note">
        （相乗りのため変動する場合があります）
      </p>

      <section className="driver-card">
        <div className="driver-avatar">
          山田
        </div>

        <div>
          <span>ドライバー</span>
          <strong>山田 太郎さん</strong>
        </div>

        <a
          href="tel:09012345678"
          aria-label="ドライバーへ電話"
        >
          <Phone
            size={31}
            aria-hidden="true"
          />
        </a>
      </section>

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

      <Link
        className="danger-button detail-cancel-button"
        to={`/user/reservations/${id}/cancel`}
      >
        キャンセルする
      </Link>
    </UserScreen>
  );
}

export default ReservationDetailPage;