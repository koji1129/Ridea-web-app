import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Check, Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [step, setStep] = useState<"input" | "confirm" | "complete">("input");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (name && phoneNumber && address && password && acceptedTerms) {
      setStep("confirm");
    }
  };

  const handleRegister = () => {
    setStep("complete");
  };

  if (step === "complete") {
    return (
      <div className="register-page">
        <main className="register-container register-complete-page">
          <div className="register-complete-icon"><Check size={58} strokeWidth={3} /></div>
          <h1>登録が完了しました</h1>
          <p>ご利用いただけるようになりました。<br />さっそくYORIAIをご利用ください。</p>
          <button className="register-button" type="button" onClick={() => navigate("/login")}>ログインへ</button>
        </main>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="register-page">
        <main className="register-container">
          <button className="register-back-button" type="button" onClick={() => setStep("input")} aria-label="入力画面へ戻る"><ArrowLeft size={25} /></button>
          <div className="register-header"><h1>登録内容の確認</h1><p>この内容で登録しますか？</p></div>
          <div className="register-confirm-list">
            <ConfirmRow label="氏名" value={name} onEdit={() => setStep("input")} />
            <ConfirmRow label="電話番号" value={phoneNumber} onEdit={() => setStep("input")} />
            <ConfirmRow label="住所" value={address} onEdit={() => setStep("input")} />
            <ConfirmRow label="パスワード" value="••••••••" onEdit={() => setStep("input")} />
          </div>
          <button className="register-button" type="button" onClick={handleRegister}>登録する</button>
          <button className="register-outline-button" type="button" onClick={() => setStep("input")}>修正する</button>
        </main>
      </div>
    );
  }

  return (
    <div className="register-page">
      <main className="register-container">
        <button className="register-back-button" type="button" onClick={() => navigate("/login")} aria-label="ログイン画面へ戻る"><ArrowLeft size={25} /></button>
        <img className="auth-brand-logo" src="/src/assets/header_logo.png" alt="YORIAI" />
        <div className="register-header">
          <h1>新規登録</h1>
          <p>必要な情報を入力してください。</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <RegisterField label="氏名" htmlFor="name" required error={submitted && !name} errorMessage="氏名を入力してください">
            <input
              id="name"
              type="text"
              placeholder="山田 太郎"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={submitted && !name ? "input-error" : ""}
            />
          </RegisterField>

          <RegisterField label="電話番号" htmlFor="registerPhoneNumber" required error={submitted && !phoneNumber} errorMessage="電話番号を入力してください">
            <input
              id="registerPhoneNumber"
              type="tel"
              inputMode="numeric"
              placeholder="090-1234-5678"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className={submitted && !phoneNumber ? "input-error" : ""}
            />
          </RegisterField>

          <RegisterField label="住所" htmlFor="address" required error={submitted && !address} errorMessage="住所を入力してください">
            <input
              id="address"
              type="text"
              placeholder="春日井市中央町1-1-1"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className={submitted && !address ? "input-error" : ""}
            />
          </RegisterField>

          <RegisterField label="パスワード" htmlFor="password" required error={submitted && !password} errorMessage="パスワードは8文字以上で入力してください">
            <div className="register-password-wrapper">
              <input id="password" type={showPassword ? "text" : "password"} placeholder="8文字以上" value={password} onChange={(event) => setPassword(event.target.value)} className={submitted && !password ? "input-error" : ""} />
              <button className="register-password-toggle" type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示する"}>{showPassword ? <EyeOff size={21} /> : <Eye size={21} />}</button>
            </div>
          </RegisterField>

          <label className="terms-check"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /><span><button type="button" onClick={() => setShowTerms(true)}>利用規約</button>・<button type="button" onClick={() => setShowPrivacy(true)}>プライバシーポリシー</button>に同意する</span></label>
          {submitted && !acceptedTerms && <p className="register-error">利用規約とプライバシーポリシーに同意してください</p>}
          <button className="register-button" type="submit">登録する</button>
        </form>

        {(showTerms || showPrivacy) && <div className="register-modal-backdrop" role="presentation" onClick={() => { setShowTerms(false); setShowPrivacy(false); }}><section className="register-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="register-modal-close" type="button" onClick={() => { setShowTerms(false); setShowPrivacy(false); }} aria-label="閉じる"><X size={22} /></button><h2 id="modal-title">{showTerms ? "利用規約" : "プライバシーポリシー"}</h2><p>YORIAIのサービスをご利用いただくための規約と、個人情報の取り扱いについてご案内します。</p><button className="register-outline-button" type="button" onClick={() => { setShowTerms(false); setShowPrivacy(false); }}>閉じる</button></section></div>}
      </main>
    </div>
  );
}

type RegisterFieldProps = { label: string; htmlFor: string; required?: boolean; error?: boolean; errorMessage?: string; children: ReactNode };

function RegisterField({ label, htmlFor, required, error, errorMessage, children }: RegisterFieldProps) {
  return <div className="form-group"><label htmlFor={htmlFor}>{label}{required && <span className="required-badge">必須</span>}</label>{children}{error && <p className="register-error">{errorMessage}</p>}</div>;
}

function ConfirmRow({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return <div className="confirm-row"><div><span>{label}</span><strong>{value}</strong></div><button type="button" onClick={onEdit}>編集</button></div>;
}

export default RegisterPage;
