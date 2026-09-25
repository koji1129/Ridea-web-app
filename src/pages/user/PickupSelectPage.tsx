
import { Home, Map, MapPin, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import LocationPicker from "../../components/user/LocationPicker";
import {
  searchLocations,
  type LocationResult,
} from "../../lib/geocoding";
import type { ReservationState } from "./flowTypes";
import "./PickupSelectPage.css";

const history = [
  ["春日井市役所", "春日井市鳥居松町5-44"],
  ["イオン春日井店", "春日井市柏井町4-17"],
  ["JR春日井駅", "春日井市上条町1-1"],
  ["勝川駅", "春日井市松新町1-4"],
  ["味美駅", "春日井市西本町1-8"],
];

function PickupSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const previous =
    (location.state as ReservationState | null) ?? {};

  const [pickup, setPickup] = useState(
    previous.pickup ?? "自宅"
  );

  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(
      previous.pickupLat !== undefined &&
      previous.pickupLng !== undefined
        ? {
            name: previous.pickup ?? "",
            address: previous.pickupAddress ?? "",
            lat: previous.pickupLat,
            lng: previous.pickupLng,
          }
        : null
    );

  const [activeTab, setActiveTab] = useState<
    "home" | "history" | "map"
  >("home");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectLocation = (place: LocationResult) => {
    setSelectedLocation(place);
    setPickup(place.name);
    setError("");
  };

  const selectByAddress = async (
    name: string,
    address: string
  ) => {
    setPickup(name);
    setSelectedLocation(null);
    setError("");
    setLoading(true);

    try {
      const results = await searchLocations(address);

      if (results.length === 0) {
        setError(
          "住所が見つかりません。地図から選択してください。"
        );
        return;
      }

      if (results.length === 1) {
        selectLocation({
          ...results[0],
          name,
        });
      } else {
        setActiveTab("map");
        setError(
          "複数の候補が見つかりました。地図から正しい地点を選択してください。"
        );
      }
    } catch {
      setError(
        "住所検索に失敗しました。地図から選択してください。"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (!selectedLocation) {
      setError("乗車地点を選択してください。");
      return;
    }

    navigate("/user/reservation/destination", {
      state: {
        ...previous,
        pickup: selectedLocation.name,
        pickupAddress: selectedLocation.address,
        pickupLat: selectedLocation.lat,
        pickupLng: selectedLocation.lng,
      },
    });
  };

  return (
    <UserScreen
      title="乗車地点選択"
      showBack={true}
      showNavigation={false}
    >
      <div className="pickup-heading">
        <h2>乗車地点を選択</h2>
        <p>どこから乗りますか？</p>
      </div>

      <div
        className="pickup-tabs"
        role="tablist"
        aria-label="乗車地点の選択方法"
      >
        <button
          className={activeTab === "home" ? "active" : ""}
          type="button"
          onClick={() => setActiveTab("home")}
        >
          <Home size={18} aria-hidden="true" />
          自宅
        </button>

        <button
          className={activeTab === "history" ? "active" : ""}
          type="button"
          onClick={() => setActiveTab("history")}
        >
          <MapPin size={18} aria-hidden="true" />
          履歴
        </button>

        <button
          className={activeTab === "map" ? "active" : ""}
          type="button"
          onClick={() => setActiveTab("map")}
        >
          <Map size={18} aria-hidden="true" />
          地図から選ぶ
        </button>
      </div>

      {activeTab === "home" && (
        <button
          className={`pickup-place-card ${
            pickup === "自宅" ? "selected" : ""
          }`}
          type="button"
          disabled={loading}
          onClick={() =>
            void selectByAddress(
              "自宅",
              "春日井市中央町1-1-1"
            )
          }
        >
          <Home size={24} aria-hidden="true" />

          <span>
            <strong>自宅</strong>
            <small>春日井市中央町1-1-1</small>
          </span>

          <span
            className="pickup-radio"
            aria-hidden="true"
          />
        </button>
      )}

      {activeTab === "history" && (
        <section className="pickup-history">
          <div className="pickup-history-heading">
            <strong>最近の乗車地点</strong>

            <button
              type="button"
              onClick={() =>
                setError("履歴の削除機能は未実装です。")
              }
            >
              <Trash2 size={15} aria-hidden="true" />
              履歴をすべて削除
            </button>
          </div>

          {history.map(([name, address]) => (
            <button
              className={`pickup-place-card ${
                pickup === name ? "selected" : ""
              }`}
              type="button"
              key={name}
              disabled={loading}
              onClick={() =>
                void selectByAddress(name, address)
              }
            >
              <MapPin size={24} aria-hidden="true" />

              <span>
                <strong>{name}</strong>
                <small>{address}</small>
              </span>

              <span
                className="pickup-radio"
                aria-hidden="true"
              />
            </button>
          ))}
        </section>
      )}

      {activeTab === "map" && (
        <section className="pickup-map-section">
          <LocationPicker
            onSelect={selectLocation}
          />
        </section>
      )}

      {selectedLocation && (
        <div className="location-selected">
          <strong>
            選択中：{selectedLocation.name}
          </strong>
          <p>{selectedLocation.address}</p>
        </div>
      )}

      {error && <p role="alert">{error}</p>}

      <button
        className="primary-button pickup-next"
        type="button"
        disabled={loading || !selectedLocation}
        onClick={handleNext}
      >
        {loading ? "検索中..." : "次へ"}
      </button>
    </UserScreen>
  );
}

export default PickupSelectPage;
