import UserScreen from "../../components/user/UserScreen";

function DriverLocationPage() {
	return <UserScreen title="ドライバー位置確認"><div className="map-placeholder" role="img" aria-label="地図API接続まで準備中">地図API接続まで準備中<br /><small>現在地図を表示する準備をしています</small></div><div className="info-card"><strong>ドライバーの位置情報</strong><p>地図API接続後に表示されます。</p></div></UserScreen>;
}
export default DriverLocationPage;
