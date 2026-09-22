import { ArrowLeft, Building2, MapPin, Search, Store, TrainFront } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import type { ReservationState } from "./flowTypes";

function DestinationSelectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const previous = (location.state as ReservationState | null) ?? {};
  const [destination, setDestination] = useState(previous.destination ?? "春日井市民病院");
  const [search, setSearch] = useState("");
  const destinations = [["春日井市民病院", "春日井市中央町1-1-1", Building2], ["春日井市役所", "春日井市鳥居松町5-44", MapPin], ["イオン春日井店", "春日井市柏井町4-17", Store], ["JR春日井駅", "春日井市上条町1-1", TrainFront]] as const;
  const visibleDestinations = destinations.filter(([name, address]) => `${name}${address}`.includes(search));

  return <UserScreen title="" showHeader={false} showNavigation={false}><header className="destination-brand"><button type="button" onClick={() => navigate(-1)} aria-label="前の画面へ戻る"><ArrowLeft size={32} /></button><div><span className="destination-brand-mark">◆</span><strong>YORIAI</strong></div><span /></header><div className="pickup-heading destination-heading"><h1>目的地を選択</h1><p>どこへ行きますか？</p></div><label className="destination-search"><Search size={32} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="施設名・住所で検索" /></label><section className="destination-list">{visibleDestinations.map(([name, address, Icon]) => <button className={`destination-item${destination === name ? " selected" : ""}`} type="button" key={name} onClick={() => setDestination(name)}><Icon size={40} /><span><strong>{name}</strong><small>{address}</small></span></button>)}</section><button className="primary-button pickup-next" type="button" onClick={() => navigate("/user/reservation/datetime", { state: { ...previous, destination } })}>次へ</button></UserScreen>;
}

export default DestinationSelectPage;
