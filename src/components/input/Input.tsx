import { capitalize } from "@/lib/utils";
import styles from "./Input.module.scss";
import { useId } from "react";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

const Input = ({ name, label, className, error, ...props }: InputProps) => {
  const id = useId();

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.inputWrapper}>
        {label ? <label htmlFor={id}>{capitalize(label)}</label> : null}
        <input
          id={id}
          placeholder={name}
          className={error && styles.inputError}
          name={name}
          {...props}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
