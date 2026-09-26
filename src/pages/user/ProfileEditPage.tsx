import { Camera, ChevronDown, User, X } from "lucide-react";
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
import { getUser, searchAddress, updateUser, getFurigana } from "../../lib/user-api";
import "./ProfileEditPage.css";

function ProfileEditPage() {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("山田 太郎");

  const [kana, setKana] = useState("");
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [furiganaError, setFuriganaError] = useState("");
  const [isFetchingFurigana, setIsFetchingFurigana] = useState(false);
  const furiganaControllerRef = useRef<AbortController | null>(null);

  const [phone, setPhone] = useState("09012345678");

  const [postalCode, setPostalCode] = useState("4860804");

  const [prefecture, setPrefecture] = useState("愛知県");

  const [city, setCity] = useState("春日井市");

  const [town, setTown] = useState("神領町");

  const [block, setBlock] = useState("2-24");

  const [building, setBuilding] = useState("");

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [error, setError] = useState("");

  const [addressSearchError, setAddressSearchError] = useState("");

  const [isSearchingAddress, setIsSearchingAddress] = useState(false);

  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // ==========================================
  // ★追加：利用者情報取得
  // GET /api/users?id=UUID
  // ==========================================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");
        if (!accessToken || !userId) {
          throw new Error("ログイン情報がありません");
        }

        const user = await getUser(userId, accessToken);

        setName(user.user_name ?? "");
        setIsUserLoaded(true);
        setPhone(user.phone_number ?? "");
        setPostalCode(user.address_postcode ?? "");

        if (user.address == null || user.address == undefined) {
          setPrefecture("");
          setCity("");
          setTown("");
          setBlock(user.address ?? "");
          setBuilding("");
        } else {
          const address = splitAddress(user.address);
          setPrefecture(address.prefecture);
          setCity(address.cityAndTown);
          setTown("");
          setBlock(address.block);
          setBuilding(address.building);
        }
      } catch (err) {
        console.error(err);

        setError("登録情報を取得できませんでした");
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!isUserLoaded) return;

    const controller = new AbortController();
    furiganaControllerRef.current = controller;

    const timer = window.setTimeout(async () => {
      if (controller.signal.aborted) return;
      setIsFetchingFurigana(true);
      setFuriganaError("");

      try {
        const furigana = await getFurigana(name, controller.signal);
        if (!controller.signal.aborted) setKana(furigana);
      } catch {
        if (!controller.signal.aborted) {
          setFuriganaError(
            "フリガナを取得できませんでした。手動で入力してください",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsFetchingFurigana(false);
      }
    }, 500);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [name, isUserLoaded]);

  const handleNameChange = (value: string) => {
    furiganaControllerRef.current?.abort();
    setName(value);
    setKana("");
    setFuriganaError("");
    setIsFetchingFurigana(false);
  };

  const handleKanaChange = (value: string) => {
    // 手動で修正した読みを、通信中の結果で上書きしないようにします。
    furiganaControllerRef.current?.abort();
    setKana(value);
    setFuriganaError("");
    setIsFetchingFurigana(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage(imageUrl);
    setError("");
  };

  const handlePostalCodeChange = (value: string) => {
    const formatted = value.replace(/[^\d-]/g, "").slice(0, 8);

    setPostalCode(formatted);
    setAddressSearchError("");
  };

  const handleSearchAddress = async () => {
    const zipCode = postalCode.replace(/-/g, "");

    if (!/^\d{7}$/.test(zipCode)) {
      setAddressSearchError("郵便番号を7桁で入力してください");
      return;
    }

    setIsSearchingAddress(true);
    setAddressSearchError("");

    try {
      const address = await searchAddress(zipCode);

      if (!address) {
        setAddressSearchError("該当する住所が見つかりませんでした");
        return;
      }

      setPrefecture(address.address1);

      setCity(address.address2);

      setTown(address.address3);
    } catch {
      setAddressSearchError(
        "住所を取得できませんでした。もう一度お試しください",
      );
    } finally {
      setIsSearchingAddress(false);
    }
  };

  type SplitAddress = {
    prefecture: string;
    cityAndTown: string;
    block: string;
    building: string;
  };

  function splitAddress(address: string): SplitAddress {
    const prefectureMatch = address.match(
      /^(北海道|東京都|大阪府|京都府|.+県)/,
    );

    const prefecture = prefectureMatch?.[0] ?? "";
    const rest = address.slice(prefecture.length);

    const numberMatch = rest.match(/\d/);

    if (!numberMatch || numberMatch.index === undefined) {
      return {
        prefecture,
        cityAndTown: rest,
        block: "",
        building: "",
      };
    }

    const cityAndTown = rest.slice(0, numberMatch.index);
    const addressWithNumber = rest.slice(numberMatch.index);

    const blockMatch = addressWithNumber.match(/^\d+(?:丁目)?-\d+(?:-\d+)?/);

    if (!blockMatch) {
      return {
        prefecture,
        cityAndTown,
        block: addressWithNumber,
        building: "",
      };
    }

    const block = blockMatch[0];
    const building = addressWithNumber.slice(block.length);

    return {
      prefecture,
      cityAndTown,
      block,
      building,
    };
  }

  // ==========================================
  // ★変更：保存時にPATCHを呼ぶ
  // ==========================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !kana.trim() ||
      !phone.trim() ||
      !postalCode.trim() ||
      !prefecture ||
      !city.trim() ||
      // !town.trim() ||
      !block.trim()
    ) {
      setError("必須項目を入力してください");
      return;
    }

    const zipCode = postalCode.replace(/-/g, "");

    if (!/^\d{7}$/.test(zipCode)) {
      setError("郵便番号を7桁で入力してください");
      return;
    }

    if (!/^[0-9-]+$/.test(phone)) {
      setError("電話番号を正しく入力してください");
      return;
    }

    setError("");

    try {
      // ★追加：分割されている住所を
      // DB用の1つの文字列にする
      const fullAddress = `${prefecture}${city}${town}${block}${building}`;

      // ======================================
      // ★追加：バックエンドへPATCH
      // ======================================

      const accessToken = localStorage.getItem("access_token");
      const userId = localStorage.getItem("user_id");
      if (!accessToken || !userId) {
        throw new Error("ログイン情報がありません");
      }

      await updateUser(
        userId,
        {
          user_name: name,
          phone_number: phone,
          address_postcode: postalCode,
          address: fullAddress,
        },
        accessToken,
      );

      setShowCompleteModal(true);
    } catch (err) {
      console.error(err);

      setError("登録情報を更新できませんでした");
    }
  };

  return (
    <UserScreen
      title="登録情報の確認・変更"
      showBack={true}
      showNavigation={false}
    >
      <p className="page-lead">登録している情報を編集できます</p>

      <section className="profile-image-section">
        <div className="profile-edit-avatar">
          {profileImage ? (
            <img
              src={profileImage}
              alt="プロフィール画像"
              className="profile-edit-avatar-image"
            />
          ) : (
            <User size={48} aria-hidden="true" />
          )}
        </div>

        <div className="profile-image-info">
          <strong>プロフィール画像</strong>

          <p>ドライバーに表示される画像です</p>
        </div>

        <button
          type="button"
          className="secondary-button profile-image-button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Camera size={19} aria-hidden="true" />
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

      <form className="form-stack profile-edit-form" onSubmit={handleSubmit}>
        <ProfileInput
          label="氏名"
          required
          value={name}
          onChange={handleNameChange}
          autoComplete="name"
        />

        <ProfileInput
          label="フリガナ"
          required
          value={kana}
          onChange={handleKanaChange}
        />

        {isFetchingFurigana && <p role="status">フリガナを取得中...</p>}
        {furiganaError && (
          <p className="error-message" role="alert">{furiganaError}</p>
        )}

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
          <h2 className="profile-address-title">住所</h2>

          <div className="field-group">
            <label className="field-label" htmlFor="profile-postal-code">
              郵便番号
              <span className="required-badge">必須</span>
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
                onChange={(event) => handlePostalCodeChange(event.target.value)}
              />

              <button
                type="button"
                className="postal-search-button"
                onClick={handleSearchAddress}
                disabled={isSearchingAddress}
              >
                {isSearchingAddress ? "検索中..." : "住所を検索"}
              </button>
            </div>

            {addressSearchError && (
              <p className="error-message">{addressSearchError}</p>
            )}
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="profile-prefecture">
              都道府県
              <span className="required-badge">必須</span>
            </label>

            <div className="select-wrapper">
              <select
                id="profile-prefecture"
                className="field-select"
                value={prefecture}
                onChange={(event) => setPrefecture(event.target.value)}
                autoComplete="address-level1"
              >
                <option value="">選択してください</option>

                {PREFECTURES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={20} aria-hidden="true" />
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

          {/* <ProfileInput
            label="町名"
            required
            placeholder="例：神領町"
            value={town}
            onChange={setTown}
          /> */}

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

        {error && <p className="error-message">{error}</p>}

        <button className="primary-button profile-save-button" type="submit">
          変更を保存する
        </button>
      </form>

      {showCompleteModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowCompleteModal(false)}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profileSaveTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal__close"
              onClick={() => setShowCompleteModal(false)}
              aria-label="閉じる"
            >
              <X size={25} />
            </button>

            <h2 id="profileSaveTitle" className="modal__title">
              変更を保存しました
            </h2>

            <div className="modal__content">
              <p className="profile-save-complete">登録情報を更新しました。</p>
            </div>

            <button
              type="button"
              className="primary-button profile-save-complete-button"
              onClick={() => navigate("/user/settings")}
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
  inputMode?: "text" | "tel" | "numeric";
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

        {required && <span className="required-badge">必須</span>}
      </label>

      <input
        className="field-input"
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default ProfileEditPage;
