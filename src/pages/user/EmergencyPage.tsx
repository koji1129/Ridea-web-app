import {
  CircleAlert,
  Phone,
} from "lucide-react";
import UserScreen from "../../components/user/UserScreen";

function EmergencyPage() {
  return (
    <UserScreen
      title="緊急連絡"
      showBack={true}
      showNavigation={false}
    >
      <div className="notice">
        <CircleAlert size={22} aria-hidden="true" />
        <p>
          緊急時は、状況に応じて下の連絡先へ電話してください。
        </p>
      </div>

      <section className="info-card">
        <strong>登録済み緊急連絡先</strong>
        <p>
          家族など、あらかじめ登録している緊急連絡先へ電話します。
        </p>

        <a
          className="primary-button"
          href="tel:09012345678"
        >
          <Phone size={20} aria-hidden="true" />
          緊急連絡先へ電話
        </a>
      </section>

      <section className="info-card">
        <strong>救急車が必要な場合</strong>
        <p>
          急病やけがなど、救急車が必要な場合は119へ電話してください。
        </p>

        <a
          className="danger-button"
          href="tel:119"
        >
          <Phone size={20} aria-hidden="true" />
          119へ電話
        </a>
      </section>
    </UserScreen>
  );
}

export default EmergencyPage;