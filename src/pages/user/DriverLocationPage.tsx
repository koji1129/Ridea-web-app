import UserScreen from "../../components/user/UserScreen";
import "./DriverLocationPage.css";

// ==========================================
// ★追加：Leaflet関連
// ==========================================
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ==========================================
// ★追加：地図上に表示するピンの設定
// ==========================================
const markerIcon = L.icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function DriverLocationPage() {

  // ==========================================
  // ★追加：仮のドライバー位置
  // 現在は東京駅の緯度・経度を使用
  // 後でAPIから取得した位置情報に変更する
  // ==========================================
  const driverPosition: [number, number] = [
    35.6812,
    139.7671,
  ];

  return (
    <UserScreen
      title="ドライバー位置確認"
      showBack={true}
      showNavigation={false}
    >

      {/* ======================================
          ★変更：地図API準備中の表示
          ↓
          Leafletの地図表示に変更
         ====================================== */}
      <div className="map-placeholder">
        <MapContainer
          center={driverPosition}
          zoom={15}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* ★追加：OpenStreetMapの地図を表示 */}
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* ★追加：ドライバー位置のピン */}
          <Marker
            position={driverPosition}
            icon={markerIcon}
          >
            <Popup>
              ドライバーの現在位置
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="info-card">
        <strong>ドライバーの位置情報</strong>

        {/* ★変更：表示メッセージ */}
        <p>
          現在はテスト用の位置情報を表示しています。
        </p>
      </div>

    </UserScreen>
  );
}

export default DriverLocationPage;