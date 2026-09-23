import {
  Building2,
  MapPin,
  Search,
  Store,
  TrainFront,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import type { ReservationState } from "./flowTypes";

function DestinationSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const previous =
    (location.state as ReservationState | null) ?? {};

  const [destination, setDestination] = useState(
    previous.destination ?? "春日井市民病院"
  );

  const [search, setSearch] = useState("");

  const destinations = [
    [
      "春日井市民病院",
      "春日井市中央町1-1-1",
      Building2,
    ],
    [
      "春日井市役所",
      "春日井市鳥居松町5-44",
      MapPin,
    ],
    [
      "イオン春日井店",
      "春日井市柏井町4-17",
      Store,
    ],
    [
      "JR春日井駅",
      "春日井市上条町1-1",
      TrainFront,
    ],
  ] as const;

  const visibleDestinations = destinations.filter(
    ([name, address]) =>
      `${name}${address}`.includes(search)
  );

  const handleNext = () => {
    navigate("/user/reservation/datetime", {
      state: {
        ...previous,
        destination,
      },
    });
  };

  return (
    <UserScreen
      title="目的地選択"
      showBack={true}
      showNavigation={false}
    >
      <div className="destination-heading">
        <h2>目的地を選択</h2>
        <p>どこへ行きますか？</p>
      </div>

      <label className="destination-search">
        <Search size={24} aria-hidden="true" />

        <input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="施設名・住所で検索"
        />
      </label>

      <section
        className="destination-list"
        aria-label="目的地一覧"
      >
        {visibleDestinations.map(
          ([name, address, Icon]) => (
            <button
              className={`destination-item${
                destination === name
                  ? " selected"
                  : ""
              }`}
              type="button"
              key={name}
              onClick={() =>
                setDestination(name)
              }
            >
              <Icon
                size={32}
                aria-hidden="true"
              />

              <span>
                <strong>{name}</strong>
                <small>{address}</small>
              </span>
            </button>
          )
        )}
      </section>

      <button
        className="primary-button pickup-next"
        type="button"
        onClick={handleNext}
      >
        次へ
      </button>
    </UserScreen>
  );
}

export default DestinationSelectPage;