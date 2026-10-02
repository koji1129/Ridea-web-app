import {
  Bell,
  CalendarCheck,
  CalendarX,
  Car,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import "./NotificationsPage.css";

type NotificationType =
  | "pickup"
  | "confirmed"
  | "reserved"
  | "cancelled";

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  time: string;
  link?: string;
  unread?: boolean;
};

const notifications: Notification[] = [
  {
    id: 1,
    type: "pickup",
    title: "本日のお迎え予定",
    message: "本日09:40ごろにお迎えに伺います。",
    date: "今日",
    time: "09:15",
    link: "/user/pickup-today",
    unread: true,
  },
  {
    id: 2,
    type: "confirmed",
    title: "予約が確定しました",
    message: "10月2日の市民病院までの予約が確定しました。",
    date: "昨日",
    time: "18:32",
    link: "/user/reservations",
    unread: true,
  },
  {
    id: 3,
    type: "reserved",
    title: "予約を受け付けました",
    message: "10月2日 10:00到着希望の予約を受け付けました。",
    date: "9月30日",
    time: "14:20",
    link: "/user/reservations",
  },
  {
    id: 4,
    type: "cancelled",
    title: "予約をキャンセルしました",
    message: "9月29日の予約をキャンセルしました。",
    date: "9月28日",
    time: "11:05",
  },
];

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "pickup":
      return <Car size={22} aria-hidden="true" />;

    case "confirmed":
      return <CalendarCheck size={22} aria-hidden="true" />;

    case "reserved":
      return <Bell size={22} aria-hidden="true" />;

    case "cancelled":
      return <CalendarX size={22} aria-hidden="true" />;
  }
}

function NotificationsPage() {
  return (
    <UserScreen
      title="お知らせ"
      showBack={true}
      showNavigation={false}
    >
      <div className="notifications-page">
        {notifications.length === 0 ? (
          <div className="notifications-empty">
            <Bell size={40} aria-hidden="true" />
            <p>お知らせはありません</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification) => {
              const content = (
                <>
                  <div
                    className={`notification-icon notification-icon-${notification.type}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  <div className="notification-content">
                    <div className="notification-title-row">
                      <h2>{notification.title}</h2>

                      {notification.unread && (
                        <span
                          className="notification-unread"
                          aria-label="未読"
                        />
                      )}
                    </div>

                    <p className="notification-message">
                      {notification.message}
                    </p>

                    <div className="notification-meta">
                      <span>{notification.date}</span>
                      <span>{notification.time}</span>
                    </div>
                  </div>

                  {notification.link && (
                    <ChevronRight
                      className="notification-chevron"
                      size={20}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              if (notification.link) {
                return (
                  <Link
                    key={notification.id}
                    to={notification.link}
                    className="notification-item notification-item-link"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={notification.id}
                  className="notification-item"
                >
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </UserScreen>
  );
}

export default NotificationsPage;