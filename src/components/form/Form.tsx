import React from "react";
import { useForm } from "@/hooks/useForm";
import Input, { InputProps } from "../input/Input";
import styles from "./Form.module.scss";

type FormProps<T> = {
  children: React.ReactNode;
  fields: { [Property in keyof T]: FormField };
  handleFormSubmit: (data: T) => void;
};

export type FormState<T> = {
  [Property in keyof T]: FormField;
};

export type FormValidations = {
  required?: boolean;
  pattern?: string;
  minLength?: number;
};

export type FormField = {
  name?: string;
  label?: string;
  value?: string;
  error?: string;
  validations?: FormValidations;
};

export type FormValues<T> = {
  [Property in keyof T]: string;
};

export const Form = <T,>({
  children,
  fields,
  handleFormSubmit,
}: FormProps<T>) => {
  const { formData, handleChange, handleSubmit } = useForm(fields);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (child.type === Input) {
          return React.cloneElement(child as React.ReactElement<InputProps>, {
            onChange: handleChange,
            value: formData[child.props.name as keyof T].value || "",
          });
        }

        return child;
      })}
    </form>
  );
};
