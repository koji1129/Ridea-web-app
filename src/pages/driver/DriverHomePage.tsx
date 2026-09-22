import type { ReactNode } from "react";
import {
  Bell,
  CalendarDays,
  Car,
  ChevronRight,
  CircleDollarSign,
  CloudSun,
  House,
  List,
  Megaphone,
  Play,
  Settings,
  UserRound,
} from "lucide-react";
import {
  useNavigate,
  type NavigateFunction,
} from "react-router-dom";

import "./DriverHome.css";

type Operation = {
  id: number;
  time: string;
  pickup: string;
  destination: string;
};

const todayOperations: Operation[] = [
  {
    id: 1,
    time: "16:20",
    pickup: "春日井市役所",
    destination: "春日井駅",
  },
  {
    id: 2,
    time: "17:40",
    pickup: "春日井駅",
    destination: "○○クリニック",
  },
];

function DriverHomePage() {
  const navigate = useNavigate();

  const hasTodayOperations = true;
  const hasUnreadNotifications = true;

  const driverName = "山田 太郎";
  const workTime = "9:00 - 18:00";
  const todayRevenue = 3000;

  const openNotifications = () => {
    navigate("/driver/notifications", {
      state: {
        from: "/driver",
      },
    });
  };

  return (
    <div className="driverHome">
      <div className="driverHome__container">
        <header className="driverHome__header">
          <div className="driverHome__logo">
            YORIAI
          </div>

          <button
            type="button"
            className="driverHome__notification"
            aria-label="通知を見る"
            onClick={openNotifications}
          >
            <Bell size={26} />

            {hasUnreadNotifications && (
              <span className="driverHome__notificationDot" />
            )}
          </button>
        </header>

        <main className="driverHome__main">
          <section className="driverHome__profile">
            <div className="driverHome__avatar">
              <UserRound size={35} />
            </div>

            <div className="driverHome__greeting">
              <p>おはようございます</p>
              <h1>{driverName}さん</h1>
            </div>

            <div className="driverHome__available">
              <span className="driverHome__availableDot" />
              勤務可能
            </div>
          </section>

          <section className="driverHome__date">
            <h2>9月21日（日）</h2>

            <div className="driverHome__weather">
              <CloudSun size={26} />
              <span>晴れ</span>
              <span>28℃</span>
            </div>
          </section>

          {hasTodayOperations ? (
            <OperationDay
              operations={todayOperations}
              workTime={workTime}
              revenue={todayRevenue}
              onNavigate={navigate}
            />
          ) : (
            <NoOperationDay
              onNavigate={navigate}
            />
          )}
        </main>

        <DriverBottomNavigation
          navigate={navigate}
        />
      </div>
    </div>
  );
}

type OperationDayProps = {
  operations: Operation[];
  workTime: string;
  revenue: number;
  onNavigate: NavigateFunction;
};

function OperationDay({
  operations,
  workTime,
  revenue,
  onNavigate,
}: OperationDayProps) {
  const nextOperation = operations[0];

  return (
    <>
      <section className="driverHome__summary">
        <div className="driverHome__summaryItem">
          <span>本日の運行予定</span>
          <strong>
            {operations.length}件
          </strong>
        </div>

        <div className="driverHome__summaryDivider" />

        <div className="driverHome__summaryItem">
          <span>勤務予定</span>

          <strong className="driverHome__summaryTime">
            {workTime}
          </strong>
        </div>

        <div className="driverHome__summaryDivider" />

        <div className="driverHome__summaryItem">
          <span>本日の収益</span>

          <strong>
            ¥{revenue.toLocaleString()}
          </strong>
        </div>
      </section>

      {nextOperation && (
        <section className="driverHome__nextOperation">
          <div className="driverHome__nextOperationHeader">
            <div>
              <span>次の運行</span>
              <strong>
                {nextOperation.time}
              </strong>
            </div>

            <button
              type="button"
              onClick={() =>
                onNavigate(
                  `/driver/operations/${nextOperation.id}`
                )
              }
            >
              詳細
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="driverHome__route">
            <div>
              <span className="driverHome__routeLabel">
                乗車
              </span>
              <p>{nextOperation.pickup}</p>
            </div>

            <div className="driverHome__routeLine" />

            <div>
              <span className="driverHome__routeLabel">
                降車
              </span>
              <p>
                {nextOperation.destination}
              </p>
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        className="driverHome__startButton"
        onClick={() =>
          onNavigate("/driver/operations")
        }
      >
        <Play
          size={22}
          fill="currentColor"
        />
        勤務を開始する
      </button>

      <section className="driverHome__menuGrid">
        <HomeMenuCard
          icon={<CalendarDays size={31} />}
          label="シフト管理"
          onClick={() =>
            onNavigate("/driver/schedule")
          }
        />

        <HomeMenuCard
          icon={<List size={31} />}
          label="運行一覧"
          onClick={() =>
            onNavigate("/driver/operations")
          }
        />

        <HomeMenuCard
          icon={
            <CircleDollarSign size={31} />
          }
          label="収益の確認"
          onClick={() =>
            onNavigate("/driver/revenue")
          }
        />

        <HomeMenuCard
          icon={<Settings size={31} />}
          label="設定"
          onClick={() =>
            onNavigate("/driver/settings")
          }
        />
      </section>

      <button
        type="button"
        className="driverHome__notice"
        onClick={() =>
          onNavigate(
            "/driver/notifications/5",
            {
              state: {
                returnPath: "/driver",
              },
            }
          )
        }
      >
        <div className="driverHome__noticeIcon">
          <Megaphone size={25} />
        </div>

        <div className="driverHome__noticeContent">
          <strong>お知らせ</strong>

          <p>
            9月23日は地域イベントのため、
            一部エリアで交通規制があります。
          </p>
        </div>

        <ChevronRight size={22} />
      </button>

      <section className="driverHome__message">
        <strong>
          地域の移動を支える
          <br />
          やりがいのある仕事です
        </strong>

        <Car size={47} />
      </section>
    </>
  );
}

type NoOperationDayProps = {
  onNavigate: NavigateFunction;
};

function NoOperationDay({
  onNavigate,
}: NoOperationDayProps) {
  return (
    <>
      <section className="driverHome__empty">
        <div className="driverHome__emptyIllustration">
          <Car size={70} />
        </div>

        <h2>
          本日の運行予定はありません
        </h2>

        <p>
          ゆっくりお過ごしください。
          <br />
          次回のシフトに向けて、
          準備を整えましょう。
        </p>

        <button
          type="button"
          className="driverHome__outlineButton"
          onClick={() =>
            onNavigate("/driver/schedule")
          }
        >
          <CalendarDays size={22} />
          シフトを確認する
        </button>
      </section>

      <section className="driverHome__canDo">
        <h2>できること</h2>

        <ActionRow
          icon={<CalendarDays size={25} />}
          title="シフトを登録する"
          description="勤務できる日時を登録できます"
          onClick={() =>
            onNavigate("/driver/schedule")
          }
        />

        <ActionRow
          icon={<List size={25} />}
          title="過去の運行を見る"
          description="これまでの運行履歴を確認できます"
          onClick={() =>
            onNavigate("/driver/operations")
          }
        />

        <ActionRow
          icon={
            <CircleDollarSign size={25} />
          }
          title="過去の収益を見る"
          description="これまでの収益を確認できます"
          onClick={() =>
            onNavigate("/driver/revenue")
          }
        />

        <ActionRow
          icon={<Settings size={25} />}
          title="設定を確認する"
          description="プロフィールや通知設定を変更できます"
          onClick={() =>
            onNavigate("/driver/settings")
          }
        />
      </section>

      <button
        type="button"
        className="driverHome__notice"
        onClick={() =>
          onNavigate(
            "/driver/notifications/5",
            {
              state: {
                returnPath: "/driver",
              },
            }
          )
        }
      >
        <div className="driverHome__noticeIcon">
          <Megaphone size={25} />
        </div>

        <div className="driverHome__noticeContent">
          <strong>お知らせ</strong>

          <p>
            9月23日は地域イベントのため、
            一部エリアで交通規制があります。
          </p>
        </div>

        <ChevronRight size={22} />
      </button>

      <div className="driverHome__thanks">
        いつも地域の移動を支えていただき
        <br />
        ありがとうございます。
      </div>
    </>
  );
}

type HomeMenuCardProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

function HomeMenuCard({
  icon,
  label,
  onClick,
}: HomeMenuCardProps) {
  return (
    <button
      type="button"
      className="driverHome__menuCard"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

type ActionRowProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

function ActionRow({
  icon,
  title,
  description,
  onClick,
}: ActionRowProps) {
  return (
    <button
      type="button"
      className="driverHome__actionRow"
      onClick={onClick}
    >
      <div className="driverHome__actionIcon">
        {icon}
      </div>

      <div className="driverHome__actionContent">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <ChevronRight size={21} />
    </button>
  );
}

type DriverBottomNavigationProps = {
  navigate: NavigateFunction;
};

function DriverBottomNavigation({
  navigate,
}: DriverBottomNavigationProps) {
  return (
    <nav className="driverHome__bottomNav">
      <button
        type="button"
        className="driverHome__navItem driverHome__navItem--active"
        onClick={() =>
          navigate("/driver")
        }
      >
        <House size={24} />
        <span>ホーム</span>
      </button>

      <button
        type="button"
        className="driverHome__navItem"
        onClick={() =>
          navigate("/driver/schedule")
        }
      >
        <CalendarDays size={24} />
        <span>シフト</span>
      </button>

      <button
        type="button"
        className="driverHome__navItem"
        onClick={() =>
          navigate("/driver/operations")
        }
      >
        <Car size={24} />
        <span>運行</span>
      </button>

      <button
        type="button"
        className="driverHome__navItem"
        onClick={() =>
          navigate("/driver/revenue")
        }
      >
        <CircleDollarSign size={24} />
        <span>収益</span>
      </button>

      <button
        type="button"
        className="driverHome__navItem"
        onClick={() =>
          navigate("/driver/mypage")
        }
      >
        <UserRound size={24} />
        <span>マイページ</span>
      </button>
    </nav>
  );
}

export default DriverHomePage;