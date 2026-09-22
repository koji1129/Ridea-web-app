import {
  Bell,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  TriangleAlert,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./DriverNotifications.css";

type NotificationType =
  | "operation"
  | "change"
  | "approved"
  | "notice";

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  unread: boolean;
};

type NotificationLocationState = {
  from?: "/driver" | "/driver/mypage";
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    type: "operation",
    title: "新しい運行が割り当てられました",
    message:
      "9月21日 16:20からの運行予定を確認してください。",
    date: "今日 10:30",
    unread: true,
  },
  {
    id: 2,
    type: "change",
    title: "運行内容が変更されました",
    message:
      "9月21日の運行について、利用者情報が更新されました。",
    date: "今日 09:15",
    unread: true,
  },
  {
    id: 3,
    type: "operation",
    title: "明日の運行が確定しました",
    message:
      "9月22日の運行予定が確定しました。内容をご確認ください。",
    date: "昨日 18:10",
    unread: false,
  },
  {
    id: 4,
    type: "approved",
    title: "ドライバー登録が承認されました",
    message:
      "YORIAIドライバーとして活動できるようになりました。",
    date: "9月18日",
    unread: false,
  },
  {
    id: 5,
    type: "notice",
    title: "交通規制のお知らせ",
    message:
      "9月23日は地域イベントのため、一部エリアで交通規制があります。",
    date: "9月17日",
    unread: false,
  },
];

function DriverNotificationsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state =
    location.state as NotificationLocationState | null;

  const returnPath =
    state?.from === "/driver/mypage"
      ? "/driver/mypage"
      : "/driver";

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const getIcon = (
    type: NotificationType
  ) => {
    switch (type) {
      case "operation":
        return <CalendarCheck size={21} />;

      case "change":
        return <TriangleAlert size={21} />;

      case "approved":
        return <CheckCircle2 size={21} />;

      case "notice":
        return <Info size={21} />;
    }
  };

  const handleBack = () => {
    navigate(returnPath);
  };

  const handleNotificationClick = (
    notificationId: number
  ) => {
    navigate(
      `/driver/notifications/${notificationId}`,
      {
        state: {
          returnPath,
        },
      }
    );
  };

  return (
    <div className="driverNotifications">
      <div className="driverNotifications__container">
        <header className="driverNotifications__header">
          <button
            type="button"
            className="driverNotifications__back"
            onClick={handleBack}
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>通知</h1>
        </header>

        <main className="driverNotifications__main">
          <section className="notificationSummary">
            <div className="notificationSummary__icon">
              <Bell size={24} />
            </div>

            <div>
              <span>お知らせ</span>

              <strong>
                {unreadCount > 0
                  ? `未読の通知が${unreadCount}件あります`
                  : "すべて確認済みです"}
              </strong>
            </div>
          </section>

          <div className="notificationHeading">
            <h2>通知一覧</h2>

            <span>
              {notifications.length}件
            </span>
          </div>

          <section className="notificationList">
            {notifications.map(
              (notification) => (
                <button
                  key={notification.id}
                  type="button"
                  className={
                    notification.unread
                      ? "notificationItem notificationItem--unread"
                      : "notificationItem"
                  }
                  onClick={() =>
                    handleNotificationClick(
                      notification.id
                    )
                  }
                >
                  {notification.unread && (
                    <span className="notificationItem__unreadDot" />
                  )}

                  <div
                    className={`notificationItem__icon notificationItem__icon--${notification.type}`}
                  >
                    {getIcon(
                      notification.type
                    )}
                  </div>

                  <div className="notificationItem__content">
                    <div className="notificationItem__top">
                      <strong>
                        {notification.title}
                      </strong>

                      <span>
                        {notification.date}
                      </span>
                    </div>

                    <p>
                      {notification.message}
                    </p>
                  </div>

                  <ChevronRight
                    size={19}
                    className="notificationItem__arrow"
                  />
                </button>
              )
            )}
          </section>

          <p className="driverNotifications__note">
            運行に関する重要なお知らせは、
            運行前に必ず確認してください。
          </p>
        </main>
      </div>
    </div>
  );
}

export default DriverNotificationsPage;