export type LocationResult = {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

type NominatimResult = {
  display_name: string;
  lat: string;
  lon: string;
};

const API_URL = "https://nominatim.openstreetmap.org";

export async function searchLocations(
  query: string
): Promise<LocationResult[]> {
  if (!query.trim()) return [];

  const params = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: "1",
    limit: "5",
    countrycodes: "jp",
  });

  const response = await fetch(
    `${API_URL}/search?${params}`
  );

  if (!response.ok) {
    throw new Error("住所の検索に失敗しました");
  }

  const data: NominatimResult[] =
    await response.json();

  return data.map((item) => ({
    name: item.display_name.split(",")[0],
    address: item.display_name,
    lat: Number(item.lat),
    lng: Number(item.lon),
  }));
}

export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<LocationResult> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lng),
    format: "json",
    zoom: "18",
  });

  const response = await fetch(
    `${API_URL}/reverse?${params}`
  );

  if (!response.ok) {
    throw new Error("住所の取得に失敗しました");
  }

  const data: NominatimResult =
    await response.json();

  return {
    name: data.display_name.split(",")[0],
    address: data.display_name,
    lat,
    lng,
  };
}