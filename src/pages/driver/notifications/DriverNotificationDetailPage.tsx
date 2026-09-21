import {
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Info,
  MapPin,
  Megaphone,
  TriangleAlert,
} from "lucide-react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "./DriverNotificationDetail.css";

type NotificationType =
  | "operation"
  | "cancel"
  | "confirmed"
  | "approval"
  | "notice";

type NotificationDetail = {
  id: number;
  type: NotificationType;
  title: string;
  date: string;
  body: string[];
  operationId?: number;
  operation?: {
    date: string;
    time: string;
    pickup: string;
    destination: string;
  };
};

const notifications: NotificationDetail[] = [
  {
    id: 1,
    type: "operation",
    title: "新しい運行が割り当てられました",
    date: "2026年9月21日 10:30",
    body: [
      "新しい運行が割り当てられました。",
      "運行日時と乗車場所をご確認ください。",
    ],
    operationId: 1,
    operation: {
      date: "9月21日（月）",
      time: "16:20 〜 17:05",
      pickup: "春日井市役所",
      destination: "春日井駅",
    },
  },
  {
    id: 2,
    type: "cancel",
    title: "利用者からキャンセルがありました",
    date: "2026年9月21日 09:15",
    body: [
      "予定されていた利用者1名からキャンセルがありました。",
      "運行予定が更新されています。最新の運行内容をご確認ください。",
    ],
    operationId: 1,
    operation: {
      date: "9月21日（月）",
      time: "16:20 〜 17:05",
      pickup: "春日井市役所",
      destination: "春日井駅",
    },
  },
  {
    id: 3,
    type: "confirmed",
    title: "明日の運行が確定しました",
    date: "2026年9月20日 18:10",
    body: [
      "明日の運行内容が確定しました。",
      "乗車場所・目的地・運行時間を確認して、当日の運行に備えてください。",
    ],
    operationId: 2,
    operation: {
      date: "9月21日（月）",
      time: "17:40 〜 18:10",
      pickup: "春日井駅",
      destination: "○○クリニック",
    },
  },
  {
    id: 4,
    type: "approval",
    title: "ドライバー審査が承認されました",
    date: "2026年9月18日 14:30",
    body: [
      "ドライバー登録の審査が完了し、承認されました。",
      "YORIAIドライバーとしてシフトを登録し、運行に参加できます。",
    ],
  },
  {
    id: 5,
    type: "notice",
    title: "システムメンテナンスのお知らせ",
    date: "2026年9月17日 12:00",
    body: [
      "いつもYORIAIをご利用いただきありがとうございます。",
      "9月25日 2:00〜4:00にシステムメンテナンスを実施します。",
      "メンテナンス中は、一部の機能をご利用いただけない場合があります。",
    ],
  },
];

function DriverNotificationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const notification = notifications.find(
    (item) => item.id === Number(id)
  );

  if (!notification) {
    return (
      <div className="notificationDetail">
        <div className="notificationDetail__container">
          <header className="notificationDetail__header">
            <button
              type="button"
              className="notificationDetail__back"
              onClick={() =>
                navigate("/driver/notifications")
              }
              aria-label="戻る"
            >
              <ChevronLeft size={28} />
            </button>

            <h1>お知らせ詳細</h1>
          </header>

          <main className="notificationDetail__main">
            <div className="notificationDetailNotFound">
              <Bell size={36} />

              <h2>
                お知らせが見つかりません
              </h2>

              <p>
                削除されたか、URLが正しくない
                可能性があります。
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/driver/notifications"
                  )
                }
              >
                お知らせ一覧へ戻る
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const icon = getNotificationIcon(
    notification.type
  );

  const label = getNotificationLabel(
    notification.type
  );

  return (
    <div className="notificationDetail">
      <div className="notificationDetail__container">
        <header className="notificationDetail__header">
          <button
            type="button"
            className="notificationDetail__back"
            onClick={() =>
              navigate("/driver/notifications")
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>お知らせ詳細</h1>
        </header>

        <main className="notificationDetail__main">
          <section className="notificationDetailHero">
            <div
              className={`notificationDetailHero__icon notificationDetailHero__icon--${notification.type}`}
            >
              {icon}
            </div>

            <span
              className={`notificationDetailHero__label notificationDetailHero__label--${notification.type}`}
            >
              {label}
            </span>

            <h2>{notification.title}</h2>

            <div className="notificationDetailHero__date">
              <Clock3 size={14} />
              <span>{notification.date}</span>
            </div>
          </section>

          <section className="notificationDetailBody">
            {notification.body.map(
              (paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              )
            )}
          </section>

          {notification.operation && (
            <section className="notificationOperation">
              <div className="notificationOperation__title">
                <CalendarDays size={19} />
                <h2>運行情報</h2>
              </div>

              <div className="notificationOperation__row">
                <span>運行日</span>
                <strong>
                  {notification.operation.date}
                </strong>
              </div>

              <div className="notificationOperation__row">
                <span>運行時間</span>
                <strong>
                  {notification.operation.time}
                </strong>
              </div>

              <div className="notificationOperation__route">
                <div className="notificationOperation__place">
                  <div className="notificationOperation__dot" />

                  <div>
                    <span>乗車場所</span>
                    <strong>
                      {
                        notification.operation
                          .pickup
                      }
                    </strong>
                  </div>
                </div>

                <div className="notificationOperation__line" />

                <div className="notificationOperation__place">
                  <MapPin size={18} />

                  <div>
                    <span>目的地</span>
                    <strong>
                      {
                        notification.operation
                          .destination
                      }
                    </strong>
                  </div>
                </div>
              </div>
            </section>
          )}

          {notification.type === "cancel" && (
            <div className="notificationDetailNotice notificationDetailNotice--warning">
              <TriangleAlert size={19} />

              <p>
                利用者の変更により、
                乗車人数や運行内容が変更されている
                可能性があります。
              </p>
            </div>
          )}

          {notification.type === "approval" && (
            <div className="notificationDetailNotice notificationDetailNotice--success">
              <CheckCircle2 size={19} />

              <p>
                ドライバー登録が完了しています。
                シフトを登録すると運行に参加できます。
              </p>
            </div>
          )}

          {notification.type === "notice" && (
            <div className="notificationDetailNotice">
              <Info size={19} />

              <p>
                メンテナンス時間は状況により
                前後する場合があります。
              </p>
            </div>
          )}

          {notification.operationId && (
            <button
              type="button"
              className="notificationDetail__primary"
              onClick={() =>
                navigate(
                  `/driver/operations/${notification.operationId}`
                )
              }
            >
              運行詳細を確認する
            </button>
          )}

          {notification.type === "approval" && (
            <button
              type="button"
              className="notificationDetail__primary"
              onClick={() =>
                navigate("/driver/schedule")
              }
            >
              シフトを登録する
            </button>
          )}

          <button
            type="button"
            className="notificationDetail__secondary"
            onClick={() =>
              navigate("/driver/notifications")
            }
          >
            お知らせ一覧へ戻る
          </button>
        </main>
      </div>
    </div>
  );
}

function getNotificationIcon(
  type: NotificationType
) {
  switch (type) {
    case "operation":
      return <Bell size={29} />;

    case "cancel":
      return <TriangleAlert size={29} />;

    case "confirmed":
      return <CalendarDays size={29} />;

    case "approval":
      return <CheckCircle2 size={29} />;

    case "notice":
      return <Megaphone size={29} />;
  }
}

function getNotificationLabel(
  type: NotificationType
) {
  switch (type) {
    case "operation":
      return "運行";

    case "cancel":
      return "重要";

    case "confirmed":
      return "運行";

    case "approval":
      return "ドライバー登録";

    case "notice":
      return "運営からのお知らせ";
  }
}

export default DriverNotificationDetailPage;