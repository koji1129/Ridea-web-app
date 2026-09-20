import type { HTMLAttributes, ReactNode } from "react";
import "./Card.css";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  title?: string;
};

function Card({
  children,
  title,
  className = "",
  ...props
}: CardProps) {
  return (
    <div className={`card ${className}`} {...props}>
      {title && <h2 className="card__title">{title}</h2>}
      {children}
    </div>
  );
}

export default Card;