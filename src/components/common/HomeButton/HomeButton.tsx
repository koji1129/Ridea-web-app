import { House } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./HomeButton.css";

type HomeButtonProps = {
  to?: string;
  label?: string;
};

function HomeButton({
  to = "/home",
  label = "ホームへ戻る",
}: HomeButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="homeButton"
      onClick={() => navigate(to)}
    >
      <House size={19} strokeWidth={2.2} />
      <span>{label}</span>
    </button>
  );
}

export default HomeButton;