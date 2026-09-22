import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function TaxiSwitchPage() { return <UserScreen title="タクシー切替確認"><div className="info-card"><h2>タクシーを手配しますか？</h2><p>マッチングできない場合は、タクシーの利用をご案内します。</p></div><div className="action-stack"><Link className="primary-button" to="/user/home">タクシーを手配する</Link><Link className="secondary-button" to="/user/home">戻る</Link></div></UserScreen>; }
export default TaxiSwitchPage;
