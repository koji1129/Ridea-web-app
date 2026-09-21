import { useState } from "react";
import {
  Bell,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Info,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverSettings.css";

function DriverSettingsPage() {
  const navigate = useNavigate();

  const [operationNotification, setOperationNotification] =
    useState(true);

  const [changeNotification, setChangeNotification] =
    useState(true);

  const [noticeNotification, setNoticeNotification] =
    useState(true);

  return (
    <div className="driverSettings">
      <div className="driverSettings__container">
        <header className="driverSettings__header">
          <button
            type="button"
            className="driverSettings__back"
            onClick={() => navigate("/driver/mypage")}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>設定</h1>
        </header>

        <main className="driverSettings__main">
          <section className="driverSettings__section">
            <div className="driverSettings__sectionTitle">
              <Bell size={19} />

              <div>
                <h2>通知設定</h2>
                <p>
                  ドライバー活動に関する通知を設定します
                </p>
              </div>
            </div>

            <div className="settingsCard">
              <ToggleRow
                title="運行割り当て"
                description="新しい運行が決まったときに通知"
                checked={operationNotification}
                onChange={() =>
                  setOperationNotification(
                    !operationNotification
                  )
                }
              />

              <ToggleRow
                title="運行変更・キャンセル"
                description="予定の変更やキャンセルを通知"
                checked={changeNotification}
                onChange={() =>
                  setChangeNotification(
                    !changeNotification
                  )
                }
              />

              <ToggleRow
                title="YORIAIからのお知らせ"
                description="運営からのお知らせを通知"
                checked={noticeNotification}
                onChange={() =>
                  setNoticeNotification(
                    !noticeNotification
                  )
                }
              />
            </div>
          </section>

          <section className="driverSettings__section">
            <div className="driverSettings__sectionTitle">
              <CalendarClock size={19} />

              <div>
                <h2>勤務設定</h2>
                <p>
                  運行できる日時を管理します
                </p>
              </div>
            </div>

            <div className="settingsCard">
              <SettingsLink
                icon={<CalendarClock size={20} />}
                title="シフトを設定"
                description="運行できる日・時間を変更"
                onClick={() =>
                  navigate("/driver/schedule")
                }
              />
            </div>
          </section>

          <section className="driverSettings__section">
            <div className="driverSettings__sectionTitle">
              <Smartphone size={19} />

              <div>
                <h2>アプリ設定</h2>
                <p>
                  YORIAIの利用に関する設定
                </p>
              </div>
            </div>

            <div className="settingsCard">
              <SettingsLink
                icon={<Bell size={20} />}
                title="通知一覧"
                description="これまでのお知らせを確認"
                onClick={() =>
                  navigate("/driver/notifications")
                }
              />

              <SettingsLink
                icon={<MessageCircle size={20} />}
                title="ヘルプ・お問い合わせ"
                description="使い方や困ったときの相談"
                onClick={() =>
                  navigate("/driver/help")
                }
              />
            </div>
          </section>

          <section className="driverSettings__section">
            <div className="driverSettings__sectionTitle">
              <ShieldCheck size={19} />

              <div>
                <h2>サービス情報</h2>
              </div>
            </div>

            <div className="settingsCard">
              <SettingsLink
                icon={<ShieldCheck size={20} />}
                title="プライバシーポリシー"
                onClick={() =>
                  navigate("/privacy")
                }
              />

              <SettingsLink
                icon={<Info size={20} />}
                title="利用規約"
                onClick={() =>
                  navigate("/terms")
                }
              />
            </div>
          </section>

          <div className="driverSettings__version">
            <strong>YORIAI</strong>
            <span>Driver Version 1.0.0</span>
          </div>
        </main>
      </div>
    </div>
  );
}

type ToggleRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="settingsToggle">
      <div className="settingsToggle__content">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={
          checked
            ? "settingsToggle__switch settingsToggle__switch--active"
            : "settingsToggle__switch"
        }
        onClick={onChange}
      >
        <span />
      </button>
    </div>
  );
}

type SettingsLinkProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
};

function SettingsLink({
  icon,
  title,
  description,
  onClick,
}: SettingsLinkProps) {
  return (
    <button
      type="button"
      className="settingsLink"
      onClick={onClick}
    >
      <div className="settingsLink__icon">
        {icon}
      </div>

      <div className="settingsLink__content">
        <strong>{title}</strong>

        {description && (
          <span>{description}</span>
        )}
      </div>

      <ChevronRight
        size={19}
        className="settingsLink__arrow"
      />
    </button>
  );
}

export default DriverSettingsPage;