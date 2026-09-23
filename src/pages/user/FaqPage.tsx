import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import UserScreen from "../../components/user/UserScreen";
import "./FaqPage.css";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "YORIAIとは何ですか？",
    answer:
      "地域の移動を支えるライドシェアサービスです。乗車場所や目的地、日時を指定して乗車予約ができます。",
  },
  {
    question: "予約はいつからできますか？",
    answer:
      "乗車日の15日前から前日まで予約できます。当日の予約はできません。",
  },
  {
    question: "一度に何人まで予約できますか？",
    answer:
      "1回の予約につき1人から3人まで予約できます。",
  },
  {
    question: "予約したら必ず乗車できますか？",
    answer:
      "予約後にドライバーとのマッチングを行います。状況によってはドライバーが見つからない場合があります。",
  },
  {
    question: "予約をキャンセルできますか？",
    answer:
      "乗車日の前日までキャンセルできます。",
  },
  {
    question: "キャンセル料はかかりますか？",
    answer:
      "前日までのキャンセルにはキャンセル料はかかりません。",
  },
  {
    question: "ドライバーが到着したらどうなりますか？",
    answer:
      "ドライバーの到着状況を画面から確認できます。到着後は指定した乗車場所でお待ちください。",
  },
  {
    question: "ドライバーはどのくらい待ってくれますか？",
    answer:
      "到着後10分間待機します。10分を過ぎても乗車されない場合はキャンセルとなることがあります。",
  },
  {
    question: "料金はどのように決まりますか？",
    answer:
      "乗車料金は移動距離などに応じて決まります。予約内容の確認画面などで料金をご確認ください。",
  },
  {
    question: "困ったことが起きた場合はどうすればいいですか？",
    answer:
      "マイページの「お問い合わせ」または乗車中のトラブル・緊急時の案内をご利用ください。",
  },
];

function FaqPage() {
  const [openIndex, setOpenIndex] =
    useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <UserScreen
      title="よくある質問"
      showBack={true}
      showNavigation={false}
    >
      <main className="faq-page">
        <p className="faq-page__lead">
          よくあるご質問をまとめています。
        </p>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <section
                className="faq-item"
                key={item.question}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>

                  {isOpen ? (
                    <ChevronUp
                      size={22}
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDown
                      size={22}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </UserScreen>
  );
}

export default FaqPage;