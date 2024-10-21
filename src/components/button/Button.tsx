"use client";

import Link from "next/link";
import styles from "./Button.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  href?: string;
  children?: React.ReactNode;
  variant?: "primary" | "outline";
}

export function Button({
  variant = "primary",
  label,
  href,
  children,
  ...props
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
      className={`${styles.btn} ${mapVariantClasses[variant]}`}
      {...props}
    >
      {label}
    </button>
  );
}
