import UserScreen from "../../components/user/UserScreen";

function ReturnConfirmedPage() { return <UserScreen title="帰宅配車確定"><span className="status-badge">配車確定</span><dl className="summary-list"><div className="summary-row"><dt>お迎え予定</dt><dd>16:20</dd></div><div className="summary-row"><dt>ドライバー</dt><dd>佐藤 太郎</dd></div><div className="summary-row"><dt>確定料金</dt><dd className="price">1,200円</dd></div></dl></UserScreen>; }
export default ReturnConfirmedPage;
