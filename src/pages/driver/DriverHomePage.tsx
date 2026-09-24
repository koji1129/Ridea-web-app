import { Link } from "react-router-dom";

function DriverHomePage() {
  return (
    <main>
      <h1>ようこそYORIAIへ</h1>
      <Link to="/driver/availability">勤務可能日を確認する</Link>
    </main>
  );
}

export default DriverHomePage;