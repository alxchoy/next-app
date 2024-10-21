"use client";
import { useForm } from "@/hooks/useForm";
import { FormState } from "@/lib/formValidations";
import Input from "@/components/input/Input";
import { ButtonProps } from "@/components/button/Button";
import styles from "./AuthForm.module.scss";

type ButtonConfig = {
  component: React.ComponentType<ButtonProps>;
  props: ButtonProps;
};

type AuthFormProps<T> = {
  title: string;
  fields: FormState<T>;
  buttons: ButtonConfig[];
  handleFormSubmit: (fields: T) => void;
};

export default function AuthForm<T>({
  title,
  fields,
  buttons,
  handleFormSubmit,
}: AuthFormProps<T>) {
  console.log("AuthForm fields: ", fields);
  const { errors, handleChange, handleSubmit } = useForm(fields);

  return (
    <div className={styles.container}>
      <h1 className={styles.authTitle}>{title}</h1>
      <form
        className={styles.authForm}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {Object.keys(fields).map((key) => {
          const keyT = key as keyof T;
          return (
            <Input
              key={key}
              name={key}
              label={fields[keyT].label || key}
              className={styles.authInput}
              onChange={handleChange}
              error={errors[keyT]}
            />
          );
        })}
        {buttons.map(({ component: Button, props }, idx) => (
          <Button key={idx} {...props} />
        ))}
      </form>
    </div>
  );
}
