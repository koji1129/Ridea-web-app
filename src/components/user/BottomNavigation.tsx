import { HeartPulse, House, ListChecks, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    to: "/user/home",
    label: "ホーム",
    icon: House,
  },
  {
    to: "/user/reservations",
    label: "予約",
    icon: ListChecks,
  },
  {
    to: "/user/emergency",
    label: "緊急",
    icon: HeartPulse,
  },
  {
    to: "/user/settings",
    label: "設定",
    icon: Settings,
  },
];

function BottomNavigation() {
  return (
    <nav
      className="bottom-navigation"
      aria-label="メインナビゲーション"
    >
      {navigationItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottom-navigation-link${isActive ? " active" : ""}`
          }
        >
          <Icon size={22} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNavigation;