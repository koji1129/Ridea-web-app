import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";

import {
  searchLocations,
  reverseGeocode,
  type LocationResult,
} from "../../lib/geocoding";

import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

type Props = {
  onSelect: (location: LocationResult) => void;
};

const INITIAL_CENTER: LatLngExpression = [
  35.2476,
  136.9722,
];

function MapClickHandler({
  onClick,
}: {
  onClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(event) {
      onClick(event.latlng.lat, event.latlng.lng);
    },
  });

  return null;
}

function MapController({
  location,
}: {
  location: LocationResult | null;
}) {
  const map = useMap();

  if (location) {
    const current = map.getCenter();

    if (
      Math.abs(current.lat - location.lat) > 0.0001 ||
      Math.abs(current.lng - location.lng) > 0.0001
    ) {
      map.setView([location.lat, location.lng], 15);
    }
  }

  return null;
}

export default function LocationPicker({
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    LocationResult[]
  >([]);
  const [selected, setSelected] =
    useState<LocationResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const locations = await searchLocations(query);
      setResults(locations);

      if (locations.length === 0) {
        setError("該当する地点がありません");
      }
    } catch {
      setError("検索に失敗しました");
    } finally {
      setLoading(false);
    }
  }

  async function handleMapClick(
    lat: number,
    lng: number
  ) {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const location = await reverseGeocode(
        lat,
        lng
      );

      setSelected(location);
      setResults([]);
    } catch {
      setError("住所を取得できませんでした");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="location-picker">
      <div className="location-search">
        <input
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void handleSearch();
            }
          }}
          placeholder="住所・施設名を入力"
        />

        <button
          type="button"
          disabled={loading}
          onClick={() => void handleSearch()}
        >
          検索
        </button>
      </div>

      {error && <p role="alert">{error}</p>}

      {results.length > 0 && (
        <div className="location-results">
          {results.map((result) => (
            <button
              type="button"
              key={`${result.lat}-${result.lng}`}
              onClick={() => {
                setSelected(result);
                setResults([]);
              }}
            >
              {result.address}
            </button>
          ))}
        </div>
      )}

      <MapContainer
        center={INITIAL_CENTER}
        zoom={13}
        className="location-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          onClick={(lat, lng) =>
            void handleMapClick(lat, lng)
          }
        />

        <MapController location={selected} />

        {selected && (
          <Marker
            position={[
              selected.lat,
              selected.lng,
            ]}
          />
        )}
      </MapContainer>

      {selected && (
        <div className="location-selected">
          <strong>選択中の地点</strong>

          <p>{selected.address}</p>

          <button
            type="button"
            onClick={() => onSelect(selected)}
          >
            この地点に決定
          </button>
        </div>
      )}
    </div>
  );
}