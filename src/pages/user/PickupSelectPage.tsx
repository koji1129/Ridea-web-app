import { Home, Map, MapPin, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import UserPopup from "../../components/user/UserPopup";
import type { ReservationState } from "./flowTypes";

function PickupSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const previous = (location.state as ReservationState | null) ?? {};
  const [pickup, setPickup] = useState(previous.pickup ?? "自宅");
  const [activeTab, setActiveTab] = useState<"home" | "history" | "map">("home");
  const [search, setSearch] = useState("");
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const history = [["春日井市役所", "春日井市鳥居松町5-44"], ["イオン春日井店", "春日井市柏井町4-17"], ["JR春日井駅", "春日井市上条町1-1"], ["勝川駅", "春日井市松新町1-4"], ["味美駅", "春日井市西本町1-8"]];

  return <UserScreen title="乗車地点選択"><div className="pickup-heading"><h1>乗車地点を選択</h1><p>どこから乗りますか？</p></div><div className="pickup-tabs" role="tablist" aria-label="乗車地点の選択方法"><button className={activeTab === "home" ? "active" : ""} type="button" onClick={() => setActiveTab("home")}><Home size={18} />自宅</button><button className={activeTab === "history" ? "active" : ""} type="button" onClick={() => setActiveTab("history")}><MapPin size={18} />履歴</button><button className={activeTab === "map" ? "active" : ""} type="button" onClick={() => { setActiveTab("map"); setShowLocationPopup(true); }}><Map size={18} />地図から選ぶ</button></div>{activeTab === "home" && <button className="pickup-place-card selected" type="button" onClick={() => setPickup("自宅")}><Home size={24} /><span><strong>自宅</strong><small>春日井市中央町1-1-1</small></span><span className="pickup-radio" aria-hidden="true" /></button>}{activeTab === "history" && <section className="pickup-history"><div className="pickup-history-heading"><strong>最近の乗車地点</strong><button type="button"><Trash2 size={15} />履歴をすべて削除</button></div>{history.map(([name, address]) => <button className="pickup-place-card" type="button" key={name} onClick={() => setPickup(name)}><MapPin size={24} /><span><strong>{name}</strong><small>{address}</small></span><span className="pickup-radio" aria-hidden="true" /></button>)}</section>}{activeTab === "map" && <section className="pickup-map-section"><label className="pickup-search"><Search size={21} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="住所・施設名で検索" /></label><div className="pickup-map-placeholder"><span className="map-marker main"><MapPin size={32} /></span><span className="map-marker second"><MapPin size={24} /></span><span className="map-marker third"><MapPin size={22} /></span><span className="map-road road-one" /><span className="map-road road-two" /></div><button className="pickup-selected-place" type="button" onClick={() => setPickup("自宅")}><MapPin size={24} /><span><strong>選択中の地点</strong><small>春日井市中央町1-1-1</small></span></button></section>}<label className="pickup-search bottom"><Search size={21} /><input value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="他の場所を検索" /></label><button className="primary-button pickup-next" type="button" onClick={() => navigate("/user/reservation/destination", { state: { ...previous, pickup } })}>次へ</button><UserPopup variant="location" isOpen={showLocationPopup} onClose={() => setShowLocationPopup(false)} /></UserScreen>;
}

export default PickupSelectPage;
