import { Phone } from "lucide-react";
import UserScreen from "../../components/user/UserScreen";

function EmergencyPage() { return <UserScreen title="緊急連絡"><p className="page-lead">緊急時は下のボタンから電話をかけてください。</p><div className="action-stack"><a className="primary-button" href="tel:09012345678"><Phone size={20} aria-hidden="true" /> 登録済み緊急連絡先へ電話</a><a className="danger-button" href="tel:119"><Phone size={20} aria-hidden="true" /> 119へ電話</a></div></UserScreen>; }
export default EmergencyPage;
