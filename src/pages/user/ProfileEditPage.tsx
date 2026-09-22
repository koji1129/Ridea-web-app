import { ArrowLeft, Camera, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ProfileEditPage() {
	const navigate = useNavigate();
	const [name, setName] = useState("山田 太郎");
	const [kana, setKana] = useState("やまだ たろう");
	const [phone, setPhone] = useState("09012345678");
	const [postalCode, setPostalCode] = useState("");
	const [prefecture, setPrefecture] = useState("");
	const [city, setCity] = useState("");
	const [town, setTown] = useState("");
	const [block, setBlock] = useState("");
	const [building, setBuilding] = useState("");

	return <UserScreen title="" showHeader={false}><header className="destination-brand profile-edit-brand"><button type="button" onClick={() => navigate(-1)} aria-label="前の画面へ戻る"><ArrowLeft size={32} /></button><div><span className="destination-brand-mark">◆</span><strong>YORIAI</strong></div><span /></header><div className="profile-edit-heading"><h1>登録情報の確認・変更</h1><p>登録情報を編集できます</p></div><section className="profile-image-section"><div className="profile-edit-avatar">◯</div><div><strong>プロフィール画像</strong><p>※ 画像を設定すると、<br />ドライバーに表示されます</p></div><button type="button"><Camera size={19} />画像を変更</button></section><form className="profile-edit-form" onSubmit={(event) => event.preventDefault()}><ProfileInput label="氏名" value={name} onChange={setName} /><ProfileInput label="ふりがな" value={kana} onChange={setKana} /><ProfileInput label="電話番号" value={phone} onChange={setPhone} type="tel" /><div className="address-fields"><label>住所 <span>必須</span></label><div className="address-row"><span>郵便番号</span><input placeholder="例：4860804" value={postalCode} onChange={(event) => setPostalCode(event.target.value)} /><button type="button">住所を検索</button></div><div className="address-row"><span>都道府県</span><div className="select-wrapper"><select value={prefecture} onChange={(event) => setPrefecture(event.target.value)}><option value="">選択してください</option><option value="愛知県">愛知県</option><option value="東京都">東京都</option></select><ChevronDown size={20} /></div></div><AddressInput label="市区町村" placeholder="例：春日井市" value={city} onChange={setCity} /><AddressInput label="町名" placeholder="例：神領町" value={town} onChange={setTown} /><AddressInput label="丁目・番地" placeholder="例：2-24" value={block} onChange={setBlock} /><AddressInput label="建物名・部屋番号" placeholder="例：サンハイツ101（任意）" value={building} onChange={setBuilding} /></div><button className="primary-button profile-save-button" type="submit">変更を保存する</button></form></UserScreen>;
}

function ProfileInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label className="profile-field"><span>{label}<b>必須</b></span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function AddressInput({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (value: string) => void }) { return <label className="address-row"><span>{label}</span><input placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
export default ProfileEditPage;
