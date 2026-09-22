import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ReturnMatchingPage() { return <UserScreen title="帰宅マッチング中"><div className="info-card"><span className="status-badge">マッチング中</span><h2>帰宅のお手伝いを探しています</h2><p>配車が決まるまで少しお待ちください。</p></div><div className="action-stack"><Link className="primary-button" to="/user/return/confirmed">配車確定画面を見る</Link><Link className="secondary-button" to="/user/taxi-switch">タクシーに切り替える</Link></div></UserScreen>; }
export default ReturnMatchingPage;
