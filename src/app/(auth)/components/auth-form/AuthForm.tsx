"use client";
import { useForm } from "@/hooks/useForm";
import { FormState } from "@/lib/formValidations";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import styles from "./AuthForm.module.scss";

type AuthFormProps<T> = {
  title: string;
  fields: FormState<T>;
};

export default function AuthForm<T>({ title, fields }: AuthFormProps<T>) {
  const { errors, handleChange, handleSubmit } = useForm(fields);
  console.log(errors["email" as keyof T]);
  const handleFormSubmit = () => {
    console.log("login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.authTitle}>{title}</h1>
      <form
        className={styles.authForm}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {Object.keys(fields).map((field) => (
          <Input
            key={field}
            name={field}
            label={field}
            className={styles.authInput}
            onChange={handleChange}
            error={errors[field as keyof T]}
          />
        ))}
        <Button label="Login" />
        <Button href="/register" variant="outline">
          Register
        </Button>
      </form>
    </div>
  );
}

// export default AuthForm;
