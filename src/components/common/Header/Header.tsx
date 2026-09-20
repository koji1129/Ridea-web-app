import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import "./Header.css";

type HeaderProps = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
};

function Header({
  title,
  onBack,
  right,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header__side">
        {onBack && (
          <button
            type="button"
            className="header__back"
            onClick={onBack}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>
        )}
      </div>

      <h1 className="header__title">{title}</h1>

      <div className="header__side header__side--right">
        {right}
      </div>
    </header>
  );
}

export default Header;