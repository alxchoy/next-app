import React from "react";
import { useForm } from "@/hooks/useForm";
import Input, { InputProps } from "../input/Input";
import styles from "./Form.module.scss";
import Button, { ButtonProps } from "../button/Button";

type FormProps<T> = {
  children: React.ReactNode;
  fields: { [Property in keyof T]: FormField };
  handleFormSubmit: (data: T) => void;
};

export type FormState<T> = {
  [Property in keyof T]: FormField;
};

type FormValidations = {
  required?: boolean;
  pattern?: string;
  minLength?: number;
  matchTo?: string;
};

export type FormField = {
  name?: string;
  label?: string;
  value?: string;
  error?: string;
  validations?: FormValidations;
};

const Form = <T,>({ children, fields, handleFormSubmit }: FormProps<T>) => {
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
            error: formData[child.props.name as keyof T].error || "",
          });
        }

        // if (child.type === Button && child.props.type === "submit") {
        //   return React.cloneElement(child as React.ReactElement<ButtonProps>, {
        //     label: isLoading ? "Loading..." : child.props.label,
        //   });
        // }

        return child;
      })}
    </form>
  );
};

export default Form;
