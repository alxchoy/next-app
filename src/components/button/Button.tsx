"use client";

import Link from "next/link";
import styles from "./Button.module.scss";

interface ButtonProps {
  label?: string;
  href?: string;
  children?: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
}

export default function Button({
  variant = "primary",
  label,
  href,
  children,
  onClick,
}: ButtonProps) {
  const mapVariantClasses = {
    primary: styles.btnPrimary,
    outline: styles.btnOutline,
  };

  if (href) {
    return (
      <Link
        href={href}
        className={`${styles.btn} ${mapVariantClasses[variant]}`}
      >
        {label || children}
      </Link>
    );
  }

  return (
    <button
      type="submit"
      className={`${styles.btn} ${mapVariantClasses[variant]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
