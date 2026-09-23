import { useRef, useState, type ChangeEvent, type ReactNode } from "react";
import {
  Bell,
  Camera,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  FileBadge,
  LogOut,
  Settings,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverMyPage.css";

type MenuItemProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
};

function DriverMyPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleProfileImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <div className="driverMyPage">
      <div className="driverMyPage__container">
        <header className="driverMyPage__header">
          <button
            type="button"
            className="driverMyPage__back"
            onClick={() => navigate("/driver")}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>マイページ</h1>
        </header>

        <main className="driverMyPage__main">
          <section className="driverProfileCard">
            <button
              type="button"
              className="driverProfileCard__avatar"
              onClick={() => fileInputRef.current?.click()}
              aria-label="プロフィール画像を変更"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="プロフィール画像"
                  className="driverProfileCard__avatarImage"
                />
              ) : (
                <User size={30} />
              )}

              <span className="driverProfileCard__camera">
                <Camera size={14} />
              </span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfileImageChange}
            />

            <div className="driverProfileCard__info">
              <span>ドライバー</span>
              <h2>山田 太郎</h2>
              <p>春日井市</p>
            </div>

            <div className="driverProfileCard__status">
              <ShieldCheck size={15} />
              承認済み
            </div>
          </section>

          <section className="driverMyPage__section">
            <h2>アカウント情報</h2>

            <div className="driverInfoCard">
              <InfoRow label="氏名" value="山田 太郎" />
              <InfoRow label="電話番号" value="090-1234-5678" />
              <InfoRow label="住所" value="愛知県春日井市○○町1-2-3" />
            </div>

            <button
              type="button"
              className="driverMyPage__editButton"
              onClick={() => navigate("/driver/mypage/profile")}
            >
              <User size={17} />
              基本情報を確認・変更
            </button>
          </section>

          <section className="driverMyPage__section">
            <h2>ドライバー情報</h2>

            <button
              type="button"
              className="driverLicenseCard"
              onClick={() => navigate("/driver/mypage/license")}
            >
              <div className="driverLicenseCard__icon">
                <FileBadge size={24} />
              </div>

              <div className="driverLicenseCard__content">
                <span>運転免許証</span>
                <strong>登録済み</strong>
                <p>
                  登録情報に変更がある場合は
                  更新してください
                </p>
              </div>

              <ChevronRight
                size={20}
                className="driverLicenseCard__arrow"
              />
            </button>
          </section>

          <section className="driverMyPage__section">
            <h2>メニュー</h2>

            <div className="driverMyPageMenu">
              <MenuItem
                icon={<Bell size={21} />}
                title="通知"
                description="運行やYORIAIからのお知らせ"
                onClick={() =>
                  navigate("/driver/notifications", {
                    state: {
                      from: "/driver/mypage",
                    },
                  })
                }
              />

              <MenuItem
                icon={<Settings size={21} />}
                title="設定"
                description="通知・勤務に関する設定"
                onClick={() => navigate("/driver/settings")}
              />

              <MenuItem
                icon={<CircleHelp size={21} />}
                title="ヘルプ・お問い合わせ"
                description="困ったときはこちら"
                onClick={() => navigate("/driver/help")}
              />
            </div>
          </section>

          <section className="driverMyPage__section">
            <h2>利用モード</h2>

            <button
              type="button"
              className="driverModeSwitch"
              onClick={() => navigate("/user/home")}
            >
              <div className="driverModeSwitch__icon">
                <Users size={22} />
              </div>

              <div>
                <strong>
                  利用者としてYORIAIを使う
                </strong>

                <span>
                  乗車予約などの利用者画面へ移動
                </span>
              </div>

              <ChevronRight size={20} />
            </button>
          </section>

          <button
            type="button"
            className="driverMyPage__logout"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut size={19} />
            ログアウト
          </button>

          <p className="driverMyPage__version">
            YORIAI Driver
          </p>
        </main>
      </div>

      {showLogoutModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowLogoutModal(false)}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logoutModalTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal__close"
              onClick={() => setShowLogoutModal(false)}
              aria-label="閉じる"
            >
              <X size={25} />
            </button>

            <h2
              id="logoutModalTitle"
              className="modal__title"
            >
              ログアウトしますか？
            </h2>

            <p className="driverLogoutModal__description">
              ログアウトするとログイン画面に戻ります。
            </p>

            <div className="driverLogoutModal__actions">
              <button
                type="button"
                className="driverLogoutModal__cancel"
                onClick={() => setShowLogoutModal(false)}
              >
                キャンセル
              </button>

              <button
                type="button"
                className="driverLogoutModal__confirm"
                onClick={handleLogout}
              >
                ログアウト
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="driverInfoCard__row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MenuItem({
  icon,
  title,
  description,
  onClick,
}: MenuItemProps) {
  return (
    <button
      type="button"
      className="driverMyPageMenu__item"
      onClick={onClick}
    >
      <div className="driverMyPageMenu__icon">
        {icon}
      </div>

      <div className="driverMyPageMenu__content">
        <strong>{title}</strong>

        {description && (
          <span>{description}</span>
        )}
      </div>

      <ChevronRight size={20} />
    </button>
  );
}

export default DriverMyPage;