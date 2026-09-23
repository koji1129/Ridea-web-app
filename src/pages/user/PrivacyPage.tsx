import { ShieldCheck } from "lucide-react";
import UserScreen from "../../components/user/UserScreen";
import { PRIVACY_CONTENT } from "../../constants/privacyPolicy";
import "./LegalPage.css";

function PrivacyPage() {
  return (
    <UserScreen
      title="プライバシーポリシー"
      showBack={true}
      showNavigation={false}
    >
      <section className="legal-heading">
        <div className="legal-heading-icon">
          <ShieldCheck size={30} aria-hidden="true" />
        </div>

        <div>
          <h2>プライバシーポリシー</h2>
          <p>
            YORIAIでお預かりする個人情報の
            取り扱いについて定めています。
          </p>
        </div>
      </section>

      <article className="legal-content">
        {PRIVACY_CONTENT}
      </article>

      <p className="legal-updated">
        最終更新日：2026年9月
      </p>
    </UserScreen>
  );
}

export default PrivacyPage;