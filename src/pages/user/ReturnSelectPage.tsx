import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";

function ReturnSelectPage() { return <UserScreen title="帰宅"><p className="page-lead">帰宅先を確認して配車を申し込みます。</p><div className="info-card"><strong>帰宅先</strong><p>登録済みの自宅</p></div><Link className="primary-button" to="/user/return/matching">帰宅の配車を申し込む</Link></UserScreen>; }
export default ReturnSelectPage;
