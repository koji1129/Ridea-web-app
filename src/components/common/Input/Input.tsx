import type { InputHTMLAttributes } from "react";
import "./Input.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function Input({
  label,
  error,
  id,
  className = "",
  required,
  ...props
}: InputProps) {
  return (
    <div className={`inputField ${className}`}>
      {label && (
        <label className="inputField__label" htmlFor={id}>
          {label}

          {required && (
            <span className="inputField__required">
              必須
            </span>
          )}
        </label>
      )}

      <input
        id={id}
        required={required}
        className={`inputField__input ${
          error ? "inputField__input--error" : ""
        }`}
        {...props}
      />

      {error && (
        <p className="inputField__error">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;