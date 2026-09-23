import {
  FileText,
} from "lucide-react";
import UserScreen from "../../components/user/UserScreen";
import { TERMS_CONTENT } from "../../constants/terms";
import "./LegalPage.css";

function TermsPage() {
  return (
    <UserScreen
      title="利用規約"
      showBack={true}
      showNavigation={false}
    >
      <section className="legal-heading">
        <div className="legal-heading-icon">
          <FileText size={30} aria-hidden="true" />
        </div>

        <div>
          <h2>YORIAI 利用規約</h2>
          <p>
            YORIAIをご利用いただく際の
            条件について定めています。
          </p>
        </div>
      </section>

      <article className="legal-content">
        {TERMS_CONTENT}
      </article>

      <p className="legal-updated">
        最終更新日：2026年9月
      </p>
    </UserScreen>
  );
}

export default TermsPage;