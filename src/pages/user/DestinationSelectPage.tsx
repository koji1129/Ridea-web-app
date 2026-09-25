
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import LocationPicker from "../../components/user/LocationPicker";
import type { LocationResult } from "../../lib/geocoding";
import type { ReservationState } from "./flowTypes";
import "./DestinationSelectPage.css";

function DestinationSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const previous =
    (location.state as ReservationState | null) ?? {};

  const [selectedLocation, setSelectedLocation] =
    useState<LocationResult | null>(
      previous.destinationLat !== undefined &&
      previous.destinationLng !== undefined
        ? {
            name: previous.destination ?? "",
            address: previous.destinationAddress ?? "",
            lat: previous.destinationLat,
            lng: previous.destinationLng,
          }
        : null
    );

  const handleNext = () => {
    if (!selectedLocation) return;

    navigate("/user/reservation/datetime", {
      state: {
        ...previous,
        destination: selectedLocation.name,
        destinationAddress: selectedLocation.address,
        destinationLat: selectedLocation.lat,
        destinationLng: selectedLocation.lng,
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

      <LocationPicker
        onSelect={setSelectedLocation}
      />

      <button
        className="primary-button pickup-next"
        type="button"
        disabled={!selectedLocation}
        onClick={handleNext}
      >
        次へ
      </button>
    </UserScreen>
  );
}

export default DestinationSelectPage;
