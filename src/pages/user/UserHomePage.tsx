import { Bell, CalendarPlus, ClipboardList, CircleHelp, House, Settings, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "../../styles/user-flow.css";

function UserHomePage() {
  return <UserScreen title="" showBack={false} showNavigation={false} showHeader={false}>
    <header className="home-brand" aria-label="YORIAI">
      <svg className="home-brand-mark" viewBox="0 0 100 80" aria-hidden="true"><polygon points="15,15 43,15 58,32 40,63" fill="#0d65a8" /><polygon points="43,15 80,15 59,50 48,37" fill="#09a5c0" /><polygon points="15,15 29,37 40,22 43,15" fill="#16afd0" /><polygon points="59,50 78,19 85,28 58,68 40,63" fill="#087d9f" /></svg>
      <span>YORIAI</span>
    </header>
    <section className="home-intro">
      <p>こんにちは</p>
      <h1>山田 太郎<small>さん</small></h1>
    </section>
    <section className="ride-card">
      <div className="ride-card-heading"><span className="ride-card-icon"><House size={22} aria-hidden="true" /></span><strong>目的地まで</strong></div>
      <p className="ride-countdown">あと <strong>12</strong> 分</p>
      <p className="ride-arrival">9:40 ごろ到着予定</p>
      <p className="ride-destination">○○病院行き</p>
      <div className="ride-illustration" aria-hidden="true">🚙</div>
    </section>
    <section className="home-menu-grid" aria-label="ホームメニュー">
      <Link to="/user/reservation/pickup" className="home-menu-item"><CalendarPlus /><span>予約する</span></Link>
      <Link to="/user/reservations" className="home-menu-item"><ClipboardList /><span>予約一覧</span></Link>
      <Link to="/user/pickup-today" className="home-menu-item"><Bell /><span>お知らせ</span></Link>
      <Link to="/user/settings/profile" className="home-menu-item"><UserRound /><span>マイページ</span></Link>
      <Link to="/user/terms" className="home-menu-item"><CircleHelp /><span>よくある質問</span></Link>
      <Link to="/user/settings" className="home-menu-item"><Settings /><span>設定</span></Link>
    </section>
  </UserScreen>;
}

export default UserHomePage;