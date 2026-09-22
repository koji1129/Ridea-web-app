import {
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  CreditCard,
  FileBadge,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverLicensePage.css";

function DriverLicensePage() {
  const navigate = useNavigate();

  return (
    <div className="driverLicensePage">
      <div className="driverLicensePage__container">
        <header className="driverLicensePage__header">
          <button
            type="button"
            className="driverLicensePage__back"
            onClick={() =>
              navigate("/driver/mypage")
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>ドライバー情報</h1>
        </header>

        <main className="driverLicensePage__main">
          <section className="driverLicenseStatus">
            <div className="driverLicenseStatus__icon">
              <FileBadge size={34} />
            </div>

            <span>運転免許証</span>

            <div className="driverLicenseStatus__approved">
              <ShieldCheck size={17} />
              登録済み
            </div>

            <p>
              審査済みの運転免許証です
            </p>
          </section>

          <section className="driverLicensePage__section">
            <h2>免許証情報</h2>

            <div className="driverLicenseInfo">
              <LicenseInfoRow
                icon={<CreditCard size={19} />}
                label="氏名"
                value="山田 太郎"
              />

              <LicenseInfoRow
                icon={
                  <CalendarDays size={19} />
                }
                label="有効期限"
                value="2030年4月10日"
              />

              <LicenseInfoRow
                icon={<FileBadge size={19} />}
                label="免許証番号"
                value="**** **** **** 1234"
              />
            </div>
          </section>

          <section className="driverLicensePage__section">
            <h2>登録画像</h2>

            <div className="driverLicenseImages">
              <div className="driverLicenseImage">
                <div className="driverLicenseImage__preview">
                  <CreditCard size={38} />
                </div>

                <div className="driverLicenseImage__content">
                  <span>運転免許証</span>
                  <strong>表面</strong>

                  <div className="driverLicenseImage__registered">
                    <BadgeCheck size={15} />
                    登録済み
                  </div>
                </div>
              </div>

              <div className="driverLicenseImage">
                <div className="driverLicenseImage__preview">
                  <CreditCard size={38} />
                </div>

                <div className="driverLicenseImage__content">
                  <span>運転免許証</span>
                  <strong>裏面</strong>

                  <div className="driverLicenseImage__registered">
                    <BadgeCheck size={15} />
                    登録済み
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="driverLicenseWarning">
            <TriangleAlert size={21} />

            <p>
              免許証を更新した場合や、
              氏名・住所などの記載内容に変更があった場合は、
              最新の免許証情報を登録してください。
            </p>
          </div>

          <button
            type="button"
            className="driverLicensePage__updateButton"
            onClick={() =>
              navigate(
                "/driver/mypage/license/edit"
              )
            }
          >
            <RefreshCw size={20} />
            免許証情報を更新する
          </button>
        </main>
      </div>
    </div>
  );
}

type LicenseInfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function LicenseInfoRow({
  icon,
  label,
  value,
}: LicenseInfoRowProps) {
  return (
    <div className="driverLicenseInfo__row">
      <div className="driverLicenseInfo__icon">
        {icon}
      </div>

      <div className="driverLicenseInfo__content">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

export default DriverLicensePage;