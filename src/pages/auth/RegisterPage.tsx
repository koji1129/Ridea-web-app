import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Check,
  Eye,
  EyeOff,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { PREFECTURES } from "../../constants/prefectures";
import { TERMS_CONTENT } from "../../constants/terms";
import { PRIVACY_CONTENT } from "../../constants/privacyPolicy";
import {
  AuthApiError,
  register,
} from "../../lib/auth-api";

import "./RegisterPage.css";

type Step = "input" | "confirm" | "complete";

type AddressSearchResult = {
  address1: string;
  address2: string;
  address3: string;
};

type ZipCloudResponse = {
  status: number;
  message: string | null;
  results: AddressSearchResult[] | null;
};

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [step, setStep] = useState<Step>("input");
  const [submitted, setSubmitted] = useState(false);
  const [isSearchingAddress, setIsSearchingAddress] =
    useState(false);
  const [addressSearchError, setAddressSearchError] =
    useState("");
  const [isRegistering, setIsRegistering] =
    useState(false);
  const [registerError, setRegisterError] =
    useState("");

  const isPasswordValid = password.length >= 8;

  const isPostalCodeValid =
    postalCode.replace(/\D/g, "").length === 7;

  const isFormValid =
    name.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    email.trim() !== "" &&
    isPostalCodeValid &&
    prefecture !== "" &&
    city.trim() !== "" &&
    streetAddress.trim() !== "" &&
    isPasswordValid &&
    acceptedTerms;

  const fullAddress = [
    prefecture,
    city,
    streetAddress,
    building,
  ]
    .filter(Boolean)
    .join("");

  const closeModal = () => {
    setShowTerms(false);
    setShowPrivacy(false);
  };

  const openTerms = () => {
    setShowPrivacy(false);
    setShowTerms(true);
  };

  const openPrivacy = () => {
    setShowTerms(false);
    setShowPrivacy(true);
  };

  const formatPostalCode = (value: string) => {
    const numbers = value
      .replace(/\D/g, "")
      .slice(0, 7);

    if (numbers.length > 3) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }

    return numbers;
  };

  const handlePostalCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPostalCode(
      formatPostalCode(event.target.value)
    );

    setAddressSearchError("");
  };

  const handleAddressSearch = async () => {
    const zipCode = postalCode.replace(/\D/g, "");

    if (zipCode.length !== 7) {
      setAddressSearchError(
        "郵便番号を7桁で入力してください"
      );
      return;
    }

    setIsSearchingAddress(true);
    setAddressSearchError("");

    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipCode}`
      );

      if (!response.ok) {
        throw new Error(
          "住所検索に失敗しました"
        );
      }

      const data: ZipCloudResponse =
        await response.json();

      if (
        !data.results ||
        data.results.length === 0
      ) {
        setAddressSearchError(
          "住所が見つかりませんでした"
        );
        return;
      }

      const result = data.results[0];

      setPrefecture(result.address1);
      setCity(result.address2);
      setStreetAddress(result.address3);
    } catch {
      setAddressSearchError(
        "住所を取得できませんでした。時間をおいて再度お試しください"
      );
    } finally {
      setIsSearchingAddress(false);
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSubmitted(true);

    if (!isFormValid) {
      return;
    }

    setStep("confirm");
    window.scrollTo(0, 0);
  };

  const handleRegister = async () => {
    if (isRegistering) {
      return;
    }

    setIsRegistering(true);
    setRegisterError("");

    try {
      await register({
        email,
        password,
        user_name: name,
        phone_number: phoneNumber.replace(/-/g, ""),
        address_postcode: postalCode,
        address: fullAddress,
      });

      setStep("complete");
      window.scrollTo(0, 0);
    } catch (error) {
      if (error instanceof AuthApiError) {
        setRegisterError(error.message);
      } else {
        setRegisterError(
          "登録に失敗しました。時間をおいて再度お試しください",
        );
      }
    } finally {
      setIsRegistering(false);
    }
  };

  if (step === "complete") {
    return (
      <div className="app-page">
        <main className="app-container register-container register-complete-page">
          <div className="register-complete-icon">
            <Check
              size={58}
              strokeWidth={3}
            />
          </div>

          <h1>登録が完了しました</h1>

          <p>
            ご利用いただけるようになりました。
            <br />
            さっそくYORIAIをご利用ください。
          </p>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              navigate("/login")
            }
          >
            ログインへ
          </button>
        </main>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="app-page">
        <main className="app-container register-container">
          <div className="register-header">
            <h1>登録内容の確認</h1>
            <p>
              この内容で登録しますか？
            </p>
          </div>

          <div className="register-confirm-list">
            <ConfirmRow
              label="氏名"
              value={name}
              onEdit={() =>
                setStep("input")
              }
            />

            <ConfirmRow
              label="電話番号"
              value={phoneNumber}
              onEdit={() =>
                setStep("input")
              }
            />

            <ConfirmRow
              label="メールアドレス"
              value={email}
              onEdit={() =>
                setStep("input")
              }
            />

            <ConfirmRow
              label="郵便番号"
              value={`〒${postalCode}`}
              onEdit={() =>
                setStep("input")
              }
            />

            <ConfirmRow
              label="住所"
              value={fullAddress}
              onEdit={() =>
                setStep("input")
              }
            />

            <ConfirmRow
              label="パスワード"
              value="••••••••"
              onEdit={() =>
                setStep("input")
              }
            />
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={handleRegister}
            disabled={isRegistering}
          >
            {isRegistering ? "登録中..." : "登録する"}
          </button>

          {registerError && (
            <p className="error-message">
              {registerError}
            </p>
          )}

          <button
            className="secondary-button register-secondary-button"
            type="button"
            onClick={() =>
              setStep("input")
            }
          >
            修正する
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app-page">
      <main className="app-container register-container">
        <div className="auth-brand-logo-wrapper">
          <img
            className="auth-brand-logo"
            src="/src/assets/header_logo.png"
            alt="YORIAI"
          />
        </div>

        <div className="register-header">
          <h1>新規登録</h1>
          <p>
            必要な情報を入力してください。
          </p>
        </div>

        <form
          className="form-stack register-form"
          onSubmit={handleSubmit}
        >
          <RegisterField
            label="氏名"
            htmlFor="name"
            required
            error={
              submitted &&
              !name.trim()
            }
            errorMessage="氏名を入力してください"
          >
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="山田 太郎"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              className={`field-input ${submitted &&
                !name.trim()
                ? "input-error"
                : ""
                }`}
            />
          </RegisterField>

          <RegisterField
            label="電話番号"
            htmlFor="registerPhoneNumber"
            required
            error={
              submitted &&
              !phoneNumber.trim()
            }
            errorMessage="電話番号を入力してください"
          >
            <input
              id="registerPhoneNumber"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="090-1234-5678"
              value={phoneNumber}
              onChange={(event) =>
                setPhoneNumber(event.target.value)
              }
              className={`field-input ${submitted &&
                !phoneNumber.trim()
                ? "input-error"
                : ""
                }`}
            />
          </RegisterField>

          <RegisterField
            label="メールアドレス"
            htmlFor="email"
            required
            error={
              submitted &&
              !email.trim()
            }
            errorMessage="メールアドレスを入力してください"
          >
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="example@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className={`field-input ${submitted &&
                !email.trim()
                ? "input-error"
                : ""
                }`}
            />
          </RegisterField>

          <RegisterField
            label="郵便番号"
            htmlFor="postalCode"
            required
            error={
              submitted &&
              !isPostalCodeValid
            }
            errorMessage="郵便番号を7桁で入力してください"
          >
            <div className="register-postal-row">
              <input
                id="postalCode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="000-0000"
                maxLength={8}
                value={postalCode}
                onChange={
                  handlePostalCodeChange
                }
                className={`field-input ${submitted &&
                  !isPostalCodeValid
                  ? "input-error"
                  : ""
                  }`}
              />

              <button
                className="register-address-search-button"
                type="button"
                onClick={
                  handleAddressSearch
                }
                disabled={
                  isSearchingAddress
                }
              >
                <Search size={18} />

                {isSearchingAddress
                  ? "検索中..."
                  : "住所検索"}
              </button>
            </div>

            {addressSearchError && (
              <p className="error-message">
                {addressSearchError}
              </p>
            )}
          </RegisterField>

          <RegisterField
            label="都道府県"
            htmlFor="prefecture"
            required
            error={
              submitted &&
              !prefecture
            }
            errorMessage="都道府県を選択してください"
          >
            <select
              id="prefecture"
              autoComplete="address-level1"
              value={prefecture}
              onChange={(event) =>
                setPrefecture(
                  event.target.value
                )
              }
              className={`field-select ${submitted &&
                !prefecture
                ? "input-error"
                : ""
                }`}
            >
              <option value="">
                都道府県を選択してください
              </option>

              {PREFECTURES.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </RegisterField>

          <RegisterField
            label="市区町村"
            htmlFor="city"
            required
            error={
              submitted &&
              !city.trim()
            }
            errorMessage="市区町村を入力してください"
          >
            <input
              id="city"
              type="text"
              autoComplete="address-level2"
              placeholder="春日井市"
              value={city}
              onChange={(event) =>
                setCity(event.target.value)
              }
              className={`field-input ${submitted &&
                !city.trim()
                ? "input-error"
                : ""
                }`}
            />
          </RegisterField>

          <RegisterField
            label="町名・番地"
            htmlFor="streetAddress"
            required
            error={
              submitted &&
              !streetAddress.trim()
            }
            errorMessage="町名・番地を入力してください"
          >
            <input
              id="streetAddress"
              type="text"
              autoComplete="address-line1"
              placeholder="中央町1-1-1"
              value={streetAddress}
              onChange={(event) =>
                setStreetAddress(
                  event.target.value
                )
              }
              className={`field-input ${submitted &&
                !streetAddress.trim()
                ? "input-error"
                : ""
                }`}
            />
          </RegisterField>

          <RegisterField
            label="建物名・部屋番号"
            htmlFor="building"
          >
            <input
              id="building"
              type="text"
              autoComplete="address-line2"
              placeholder="YORIAIマンション 101号室"
              value={building}
              onChange={(event) =>
                setBuilding(
                  event.target.value
                )
              }
              className="field-input"
            />
          </RegisterField>

          <RegisterField
            label="パスワード"
            htmlFor="password"
            required
            error={
              submitted &&
              !isPasswordValid
            }
            errorMessage="パスワードは8文字以上で入力してください"
          >
            <div className="register-password-wrapper">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                autoComplete="new-password"
                placeholder="8文字以上"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                className={`field-input ${submitted &&
                  !isPasswordValid
                  ? "input-error"
                  : ""
                  }`}
              />

              <button
                className="register-password-toggle"
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) =>
                      !current
                  )
                }
                aria-label={
                  showPassword
                    ? "パスワードを隠す"
                    : "パスワードを表示する"
                }
              >
                {showPassword ? (
                  <EyeOff size={21} />
                ) : (
                  <Eye size={21} />
                )}
              </button>
            </div>
          </RegisterField>

          <label className="terms-check">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) =>
                setAcceptedTerms(
                  event.target.checked
                )
              }
            />

            <span>
              <button
                type="button"
                onClick={openTerms}
              >
                利用規約
              </button>
              ・
              <button
                type="button"
                onClick={openPrivacy}
              >
                プライバシーポリシー
              </button>
              に同意する
            </span>
          </label>

          {submitted &&
            !acceptedTerms && (
              <p className="error-message">
                利用規約とプライバシーポリシーに同意してください
              </p>
            )}

          <button
            className="primary-button"
            type="submit"
          >
            登録内容を確認する
          </button>

          <div className="register-login-link">
            <button
              type="button"
              onClick={() =>
                navigate("/login")
              }
            >
              ログインはこちら
            </button>
          </div>
        </form>

        {(showTerms || showPrivacy) && (
          <div
            className="modal-backdrop"
            role="presentation"
            onClick={closeModal}
          >
            <section
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                className="modal__close"
                type="button"
                onClick={closeModal}
                aria-label="閉じる"
              >
                <X size={22} />
              </button>

              <h2
                className="modal__title"
                id="modal-title"
              >
                {showTerms
                  ? "利用規約"
                  : "プライバシーポリシー"}
              </h2>

              <div className="modal__content">
                {showTerms
                  ? TERMS_CONTENT
                  : PRIVACY_CONTENT}
              </div>

              <button
                className="secondary-button"
                type="button"
                onClick={closeModal}
              >
                閉じる
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

type RegisterFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  children: ReactNode;
};

function RegisterField({
  label,
  htmlFor,
  required = false,
  error = false,
  errorMessage,
  children,
}: RegisterFieldProps) {
  return (
    <div className="field-group">
      <label
        className="field-label"
        htmlFor={htmlFor}
      >
        {label}

        {required && (
          <span className="required-badge">
            必須
          </span>
        )}
      </label>

      {children}

      {error && errorMessage && (
        <p className="error-message">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

type ConfirmRowProps = {
  label: string;
  value: string;
  onEdit: () => void;
};

function ConfirmRow({
  label,
  value,
  onEdit,
}: ConfirmRowProps) {
  return (
    <div className="confirm-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <button
        type="button"
        onClick={onEdit}
      >
        編集
      </button>
    </div>
  );
}

export default RegisterPage;