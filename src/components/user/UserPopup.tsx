import { AlertTriangle, MapPin, WifiOff, X } from "lucide-react";
import type { ReactNode } from "react";
import "./UserPopup.css";

type UserPopupVariant = "logout" | "delete" | "input-error" | "network-error" | "location";

type UserPopupProps = {
  variant: UserPopupVariant;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
  isBusy?: boolean;
};

const popupContent = {
  logout: { title: "ログアウトしますか？", message: "", confirm: "ログアウト", confirmClass: "popup-danger" },
  delete: { title: "この予約を削除しますか？", message: "", confirm: "削除する", confirmClass: "popup-danger" },
  "input-error": { title: "入力内容に誤りがあります", message: "電話番号を正しく入力してください。", confirm: "OK", confirmClass: "popup-primary" },
  "network-error": { title: "通信エラー", message: "通信環境を確認して\nもう一度お試しください。", confirm: "OK", confirmClass: "popup-primary" },
  location: { title: "位置情報を使用しますか？", message: "乗車地点の検索に位置情報を使用します。", confirm: "許可する", confirmClass: "popup-primary" },
} as const;

function UserPopup({ variant, isOpen, onClose, onConfirm, children, isBusy = false }: UserPopupProps) {
  if (!isOpen) return null;
  const content = popupContent[variant];
  const isError = variant === "input-error" || variant === "network-error";
  return <div className="user-popup-backdrop" role="presentation" onClick={isBusy ? undefined : onClose}><section className="user-popup" role="dialog" aria-modal="true" aria-labelledby="user-popup-title" onClick={(event) => event.stopPropagation()}><button className="user-popup-close" type="button" onClick={isBusy ? undefined : onClose} aria-label="閉じる"><X size={22} /></button>{isError && variant === "input-error" && <AlertTriangle className="user-popup-icon error" size={42} />}{variant === "network-error" && <WifiOff className="user-popup-icon" size={42} />}{variant === "location" && <MapPin className="user-popup-icon" size={42} /> }<h2 id="user-popup-title">{content.title}</h2>{content.message && <p>{content.message}</p>}{children}<div className="user-popup-actions"><button className={content.confirmClass} type="button" disabled={isBusy} onClick={onConfirm ?? onClose}>{isBusy ? "処理中..." : content.confirm}</button>{(variant === "logout" || variant === "delete" || variant === "location") && <button className="popup-outline" type="button" onClick={isBusy ? undefined : onClose}>{variant === "location" ? "許可しない" : "キャンセル"}</button>}</div></section></div>;
}

export default UserPopup;
