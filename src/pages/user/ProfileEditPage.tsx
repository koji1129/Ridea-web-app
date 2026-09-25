import {
  Camera,
  ChevronDown,
  User,
  X,
} from "lucide-react";
import {
  useRef,
  useState,
  useEffect, // ★追加：画面表示時にGETするため
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import UserScreen from "../../components/user/UserScreen";
import { PREFECTURES } from "../../constants/prefectures";
import "./ProfileEditPage.css";

type ZipCloudResult = {
  address1: string;
  address2: string;
  address3: string;
};

type ZipCloudResponse = {
  results: ZipCloudResult[] | null;
};

// ==========================================
// ★追加：バックエンドAPI設定
// ==========================================

const API_URL = "http://localhost:3000";

// ★接続確認用
// 後でログイン中ユーザーのIDに変更する
const USER_ID =
  "71788f4c-4e57-4d3d-945d-29919f3a07ea";

function ProfileEditPage() {
  const navigate = useNavigate();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [name, setName] =
    useState("山田 太郎");

  const [kana, setKana] =
    useState("やまだ たろう");

  const [phone, setPhone] =
    useState("09012345678");

  const [postalCode, setPostalCode] =
    useState("4860804");

  const [prefecture, setPrefecture] =
    useState("愛知県");

  const [city, setCity] =
    useState("春日井市");

  const [town, setTown] =
    useState("神領町");

  const [block, setBlock] =
    useState("2-24");

  const [building, setBuilding] =
    useState("");

  const [profileImage, setProfileImage] =
    useState<string | null>(null);

  const [error, setError] =
    useState("");

  const [
    addressSearchError,
    setAddressSearchError,
  ] = useState("");

  const [
    isSearchingAddress,
    setIsSearchingAddress,
  ] = useState(false);

  const [
    showCompleteModal,
    setShowCompleteModal,
  ] = useState(false);

  // ==========================================
  // ★追加：利用者情報取得
  // GET /api/users?id=UUID
  // ==========================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/users?id=${USER_ID}`
        );

        if (!response.ok) {
          throw new Error(
            "ユーザー情報の取得に失敗しました"
          );
        }

        const data = await response.json();

        console.log(
          "★ユーザー情報取得成功:",
          data
        );

        const user = data.user;

        setName(user.user_name ?? "");
        setPhone(user.phone_number ?? "");
        setPostalCode(
          user.address_postcode ?? ""
        );

        /*
         * 現在DBの住所はaddressという
         * 1つのカラムなので、
         * 既存住所は一旦blockへ表示する。
         */
        setPrefecture("");
        setCity("");
        setTown("");
        setBlock(user.address ?? "");
        setBuilding("");

      } catch (err) {
        console.error(err);

        setError(
          "登録情報を取得できませんでした"
        );
      }
    };

    fetchUser();
  }, []);

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError(
        "画像ファイルを選択してください"
      );
      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setError("");
  };

  const handlePostalCodeChange = (
    value: string
  ) => {
    const formatted = value
      .replace(/[^\d-]/g, "")
      .slice(0, 8);

    setPostalCode(formatted);
    setAddressSearchError("");
  };

  const handleSearchAddress =
    async () => {
      const zipCode =
        postalCode.replace(/-/g, "");

      if (!/^\d{7}$/.test(zipCode)) {
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
          throw new Error();
        }

        const data =
          (await response.json()) as ZipCloudResponse;

        if (
          !data.results ||
          data.results.length === 0
        ) {
          setAddressSearchError(
            "該当する住所が見つかりませんでした"
          );
          return;
        }

        const address =
          data.results[0];

        setPrefecture(
          address.address1
        );

        setCity(
          address.address2
        );

        setTown(
          address.address3
        );

      } catch {
        setAddressSearchError(
          "住所を取得できませんでした。もう一度お試しください"
        );

      } finally {
        setIsSearchingAddress(false);
      }
    };

  // ==========================================
  // ★変更：保存時にPATCHを呼ぶ
  // ==========================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !kana.trim() ||
      !phone.trim() ||
      !postalCode.trim() ||
      !prefecture ||
      !city.trim() ||
      !town.trim() ||
      !block.trim()
    ) {
      setError(
        "必須項目を入力してください"
      );
      return;
    }

    const zipCode =
      postalCode.replace(/-/g, "");

    if (!/^\d{7}$/.test(zipCode)) {
      setError(
        "郵便番号を7桁で入力してください"
      );
      return;
    }

    if (!/^[0-9-]+$/.test(phone)) {
      setError(
        "電話番号を正しく入力してください"
      );
      return;
    }

    setError("");

    try {

      // ★追加：分割されている住所を
      // DB用の1つの文字列にする
      const fullAddress =
        `${prefecture}${city}${town}${block}${building}`;

      // ======================================
      // ★追加：バックエンドへPATCH
      // ======================================

      const response = await fetch(
        `${API_URL}/api/users`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: USER_ID,
            user_name: name,
            phone_number: phone,
            address_postcode:
              postalCode,
            address: fullAddress,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "ユーザー情報の更新に失敗しました"
        );
      }

      const data =
        await response.json();

      console.log(
        "★ユーザー情報更新成功:",
        data
      );

      setShowCompleteModal(true);

    } catch (err) {
      console.error(err);

      setError(
        "登録情報を更新できませんでした"
      );
    }
  };

  return (
    <UserScreen
      title="登録情報の確認・変更"
      showBack={true}
      showNavigation={false}
    >
      <p className="page-lead">
        登録している情報を編集できます
      </p>

      <section className="profile-image-section">
        <div className="profile-edit-avatar">
          {profileImage ? (
            <img
              src={profileImage}
              alt="プロフィール画像"
              className="profile-edit-avatar-image"
            />
          ) : (
            <User
              size={48}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="profile-image-info">
          <strong>
            プロフィール画像
          </strong>

          <p>
            ドライバーに表示される画像です
          </p>
        </div>

        <button
          type="button"
          className="secondary-button profile-image-button"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          <Camera
            size={19}
            aria-hidden="true"
          />
          画像を変更
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </section>

      <form
        className="form-stack profile-edit-form"
        onSubmit={handleSubmit}
      >
        <ProfileInput
          label="氏名"
          required
          value={name}
          onChange={setName}
          autoComplete="name"
        />

        <ProfileInput
          label="ふりがな"
          required
          value={kana}
          onChange={setKana}
        />

        <ProfileInput
          label="電話番号"
          required
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={setPhone}
          autoComplete="tel"
        />

        <section className="address-fields">
          <h2 className="profile-address-title">
            住所
          </h2>

          <div className="field-group">
            <label
              className="field-label"
              htmlFor="profile-postal-code"
            >
              郵便番号

              <span className="required-badge">
                必須
              </span>
            </label>

            <div className="postal-code-row">
              <input
                id="profile-postal-code"
                className="field-input"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="例：4860804"
                maxLength={8}
                value={postalCode}
                onChange={(event) =>
                  handlePostalCodeChange(
                    event.target.value
                  )
                }
              />

              <button
                type="button"
                className="postal-search-button"
                onClick={
                  handleSearchAddress
                }
                disabled={
                  isSearchingAddress
                }
              >
                {isSearchingAddress
                  ? "検索中..."
                  : "住所を検索"}
              </button>
            </div>

            {addressSearchError && (
              <p className="error-message">
                {addressSearchError}
              </p>
            )}
          </div>

          <div className="field-group">
            <label
              className="field-label"
              htmlFor="profile-prefecture"
            >
              都道府県

              <span className="required-badge">
                必須
              </span>
            </label>

            <div className="select-wrapper">
              <select
                id="profile-prefecture"
                className="field-select"
                value={prefecture}
                onChange={(event) =>
                  setPrefecture(
                    event.target.value
                  )
                }
                autoComplete="address-level1"
              >
                <option value="">
                  選択してください
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

              <ChevronDown
                size={20}
                aria-hidden="true"
              />
            </div>
          </div>

          <ProfileInput
            label="市区町村"
            required
            placeholder="例：春日井市"
            value={city}
            onChange={setCity}
            autoComplete="address-level2"
          />

          <ProfileInput
            label="町名"
            required
            placeholder="例：神領町"
            value={town}
            onChange={setTown}
          />

          <ProfileInput
            label="丁目・番地"
            required
            placeholder="例：2-24"
            value={block}
            onChange={setBlock}
            autoComplete="address-line1"
          />

          <ProfileInput
            label="建物名・部屋番号"
            placeholder="例：サンハイツ101"
            value={building}
            onChange={setBuilding}
            autoComplete="address-line2"
          />
        </section>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <button
          className="primary-button profile-save-button"
          type="submit"
        >
          変更を保存する
        </button>
      </form>

      {showCompleteModal && (
        <div
          className="modal-backdrop"
          onClick={() =>
            setShowCompleteModal(false)
          }
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profileSaveTitle"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="modal__close"
              onClick={() =>
                setShowCompleteModal(false)
              }
              aria-label="閉じる"
            >
              <X size={25} />
            </button>

            <h2
              id="profileSaveTitle"
              className="modal__title"
            >
              変更を保存しました
            </h2>

            <div className="modal__content">
              <p className="profile-save-complete">
                登録情報を更新しました。
              </p>
            </div>

            <button
              type="button"
              className="primary-button profile-save-complete-button"
              onClick={() =>
                navigate(
                  "/user/settings"
                )
              }
            >
              設定に戻る
            </button>
          </section>
        </div>
      )}
    </UserScreen>
  );
}

type ProfileInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  inputMode?:
    | "text"
    | "tel"
    | "numeric";
  autoComplete?: string;
};

function ProfileInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  inputMode,
  autoComplete,
}: ProfileInputProps) {
  return (
    <div className="field-group">
      <label className="field-label">
        {label}

        {required && (
          <span className="required-badge">
            必須
          </span>
        )}
      </label>

      <input
        className="field-input"
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />
    </div>
  );
}

export default ProfileEditPage;