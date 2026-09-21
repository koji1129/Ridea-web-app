import type {
  ChangeEvent,
  FormEvent,
  ReactNode,
} from "react";
import { useState } from "react";
import {
  ChevronLeft,
  Home,
  Pencil,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./DriverProfileEditPage.css";

type ProfileForm = {
  name: string;
  phone: string;
  address: string;
};

type ProfileErrors = {
  name?: string;
  phone?: string;
  address?: string;
};

const initialProfile: ProfileForm = {
  name: "山田 太郎",
  phone: "090-1234-5678",
  address: "愛知県春日井市○○町1-2-3",
};

function DriverProfileEditPage() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState<ProfileForm>(initialProfile);

  const [savedProfile, setSavedProfile] =
    useState<ProfileForm>(initialProfile);

  const [errors, setErrors] =
    useState<ProfileErrors>({});

  const [isEditing, setIsEditing] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: ProfileErrors = {};

    if (!form.name.trim()) {
      nextErrors.name =
        "氏名を入力してください";
    }

    if (!form.phone.trim()) {
      nextErrors.phone =
        "電話番号を入力してください";
    }

    if (!form.address.trim()) {
      nextErrors.address =
        "住所を入力してください";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  };

  const handleEdit = () => {
    setForm(savedProfile);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(savedProfile);
    setErrors({});
    setIsEditing(false);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    /*
     * TODO:
     * API完成後
     * ユーザー基本情報更新APIを呼び出す
     */

    setTimeout(() => {
      setSavedProfile(form);
      setIsSubmitting(false);
      setIsEditing(false);
    }, 500);
  };

  return (
    <div className="driverProfileEdit">
      <div className="driverProfileEdit__container">
        <header className="driverProfileEdit__header">
          <button
            type="button"
            className="driverProfileEdit__back"
            onClick={() =>
              navigate("/driver/mypage")
            }
            aria-label="戻る"
          >
            <ChevronLeft size={28} />
          </button>

          <h1>基本情報</h1>
        </header>

        <main className="driverProfileEdit__main">
          <section className="driverProfileEdit__intro">
            <div className="driverProfileEdit__introIcon">
              <User size={28} />
            </div>

            <div>
              <h2>登録情報</h2>

              <p>
                YORIAIに登録している
                基本情報を確認できます。
              </p>
            </div>
          </section>

          {!isEditing ? (
            <>
              <section className="driverProfileView">
                <ProfileViewRow
                  icon={<User size={20} />}
                  label="氏名"
                  value={savedProfile.name}
                />

                <ProfileViewRow
                  icon={<Phone size={20} />}
                  label="電話番号"
                  value={savedProfile.phone}
                />

                <ProfileViewRow
                  icon={<Home size={20} />}
                  label="住所"
                  value={savedProfile.address}
                />
              </section>

              <div className="driverProfileEdit__notice">
                <strong>
                  登録情報について
                </strong>

                <p>
                  電話番号や住所は、運行時の連絡や
                  本人確認などに使用される場合があります。
                  変更があった場合は最新の情報に
                  更新してください。
                </p>
              </div>

              <button
                type="button"
                className="driverProfileEdit__editButton"
                onClick={handleEdit}
              >
                <Pencil size={18} />
                基本情報を編集する
              </button>
            </>
          ) : (
            <form
              className="driverProfileEdit__form"
              onSubmit={handleSubmit}
            >
              <ProfileField
                icon={<User size={20} />}
                label="氏名"
                name="name"
                value={form.name}
                placeholder="山田 太郎"
                error={errors.name}
                onChange={handleChange}
              />

              <ProfileField
                icon={<Phone size={20} />}
                label="電話番号"
                name="phone"
                type="tel"
                value={form.phone}
                placeholder="090-1234-5678"
                error={errors.phone}
                onChange={handleChange}
              />

              <ProfileField
                icon={<Home size={20} />}
                label="住所"
                name="address"
                value={form.address}
                placeholder="愛知県春日井市○○町1-2-3"
                error={errors.address}
                onChange={handleChange}
              />

              <div className="driverProfileEdit__notice">
                <strong>
                  変更内容を確認してください
                </strong>

                <p>
                  入力した情報に間違いがないことを
                  確認してから保存してください。
                </p>
              </div>

              <button
                type="submit"
                className="driverProfileEdit__save"
                disabled={isSubmitting}
              >
                <Save size={19} />

                {isSubmitting
                  ? "保存しています..."
                  : "変更内容を保存"}
              </button>

              <button
                type="button"
                className="driverProfileEdit__cancel"
                disabled={isSubmitting}
                onClick={handleCancel}
              >
                <X size={17} />
                編集をキャンセル
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

type ProfileViewRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function ProfileViewRow({
  icon,
  label,
  value,
}: ProfileViewRowProps) {
  return (
    <div className="driverProfileView__row">
      <div className="driverProfileView__icon">
        {icon}
      </div>

      <div className="driverProfileView__content">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

type ProfileFieldProps = {
  icon: ReactNode;
  label: string;
  name: keyof ProfileForm;
  value: string;
  type?: string;
  placeholder?: string;
  error?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>
  ) => void;
};

function ProfileField({
  icon,
  label,
  name,
  value,
  type = "text",
  placeholder,
  error,
  onChange,
}: ProfileFieldProps) {
  return (
    <div className="driverProfileField">
      <label htmlFor={name}>
        <div className="driverProfileField__label">
          <div className="driverProfileField__icon">
            {icon}
          </div>

          <span>{label}</span>

          <strong>必須</strong>
        </div>
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={
          error
            ? "driverProfileField__input driverProfileField__input--error"
            : "driverProfileField__input"
        }
      />

      {error && (
        <p className="driverProfileField__error">
          {error}
        </p>
      )}
    </div>
  );
}

export default DriverProfileEditPage;