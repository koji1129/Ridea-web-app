import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

type UserScreenProps = {
  title: string;
  children: ReactNode;
  showBack?: boolean;
  showNavigation?: boolean;
  showHeader?: boolean;
};

function UserScreen({
  title,
  children,
  showBack = true,
  showNavigation = true,
  showHeader = true,
}: UserScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="user-screen-shell">
      <main className="user-screen">
        {showHeader && <header className="user-screen-header">
          {showBack ? <button className="icon-button" type="button" aria-label="前の画面へ戻る" onClick={() => navigate(-1)}><ArrowLeft size={24} aria-hidden="true" /></button> : <span className="header-spacer" aria-hidden="true" />}
          <div className="screen-title">{title}</div>
          <span className="header-spacer" aria-hidden="true" />
        </header>}
        <div className="user-screen-content">{children}</div>
        {showNavigation && <BottomNavigation />}
      </main>
    </div>
  );
}

export default UserScreen;
