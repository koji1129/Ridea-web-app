import { useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverHelp.css";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "運行予定はどこで確認できますか？",
    answer:
      "ドライバーホームまたは「運行一覧」から、予定されている運行を確認できます。",
  },
  {
    id: 2,
    question: "シフトを変更したいです",
    answer:
      "「シフト管理」から勤務可能な日と時間を変更できます。すでに運行が確定している時間は変更できません。",
  },
  {
    id: 3,
    question: "利用者が乗車場所にいません",
    answer:
      "運行中のトラブル画面から「利用者が来ない」を選択してください。必要に応じて利用者への連絡や運営への報告ができます。",
  },
  {
    id: 4,
    question: "利用者から受け取る料金はどこで確認できますか？",
    answer:
      "運行詳細と運行中画面に、利用者ごとの受取予定金額が表示されます。",
  },
  {
    id: 5,
    question: "運行できなくなった場合はどうしますか？",
    answer:
      "運行中のトラブル画面から運行継続不可を報告してください。運営・提携タクシー会社側で代替対応を行います。",
  },
];

function DriverHelpPage() {
  const navigate = useNavigate();

  const [openFaqId, setOpenFaqId] =
    useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId((current) =>
      current === id ? null : id
    );
  };

  return (
    <div className="driverHelp">
      <div className="driverHelp__container">
        <header className="driverHelp__header">
          <button
            type="button"
            className="driverHelp__back"
            onClick={() =>
              navigate("/driver/mypage")
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>ヘルプ・お問い合わせ</h1>
        </header>

        <main className="driverHelp__main">
          <section className="driverHelpHero">
            <div className="driverHelpHero__icon">
              <CircleHelp size={30} />
            </div>

            <div>
              <h2>お困りですか？</h2>

              <p>
                よくある質問やお問い合わせ方法を
                確認できます。
              </p>
            </div>
          </section>

          <section className="driverHelp__emergency">
            <div className="driverHelp__emergencyIcon">
              <AlertTriangle size={23} />
            </div>

            <div className="driverHelp__emergencyContent">
              <strong>
                運行中のトラブルですか？
              </strong>

              <span>
                利用者が来ない、車両トラブルなど
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/driver/trouble")
              }
            >
              対応する
              <ChevronRight size={17} />
            </button>
          </section>

          <section className="driverHelp__section">
            <div className="driverHelp__sectionTitle">
              <h2>よくある質問</h2>
              <span>FAQ</span>
            </div>

            <div className="driverFaq">
              {faqItems.map((faq) => {
                const isOpen =
                  openFaqId === faq.id;

                return (
                  <div
                    key={faq.id}
                    className={
                      isOpen
                        ? "driverFaq__item driverFaq__item--open"
                        : "driverFaq__item"
                    }
                  >
                    <button
                      type="button"
                      className="driverFaq__question"
                      onClick={() =>
                        toggleFaq(faq.id)
                      }
                    >
                      <span>
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={19}
                        className="driverFaq__chevron"
                      />
                    </button>

                    {isOpen && (
                      <div className="driverFaq__answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="driverHelp__section">
            <div className="driverHelp__sectionTitle">
              <h2>お問い合わせ</h2>
            </div>

            <div className="driverContact">
              <button
                type="button"
                className="driverContact__item"
              >
                <div className="driverContact__icon">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <strong>
                    YORIAI運営へ問い合わせ
                  </strong>

                  <span>
                    サービスについてのご相談
                  </span>
                </div>

                <ChevronRight size={19} />
              </button>

              <button
                type="button"
                className="driverContact__item"
              >
                <div className="driverContact__icon">
                  <Phone size={21} />
                </div>

                <div>
                  <strong>
                    電話で問い合わせ
                  </strong>

                  <span>
                    受付時間 9:00〜18:00
                  </span>
                </div>

                <ChevronRight size={19} />
              </button>

              <button
                type="button"
                className="driverContact__item"
              >
                <div className="driverContact__icon">
                  <Mail size={21} />
                </div>

                <div>
                  <strong>
                    メールで問い合わせ
                  </strong>

                  <span>
                    通常のお問い合わせ
                  </span>
                </div>

                <ChevronRight size={19} />
              </button>
            </div>
          </section>

          <div className="driverHelp__notice">
            <AlertTriangle size={18} />

            <p>
              事故や人命に関わる緊急事態では、
              YORIAIへの連絡より先に警察・消防など
              必要な緊急通報を行ってください。
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DriverHelpPage;