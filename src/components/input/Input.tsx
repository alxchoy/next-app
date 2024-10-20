import { capitalize } from "@/lib/utils";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ name, label, className, error, ...props }: InputProps) => (
  <div className={`${styles.container} ${className || ""}`}>
    <div className={styles.inputWrapper}>
      {label ? <label htmlFor={name}>{capitalize(label)}</label> : null}
      <input
        name={name}
        {...props}
        placeholder={name}
        className={error && styles.inputError}
      />
    </div>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default Input;
