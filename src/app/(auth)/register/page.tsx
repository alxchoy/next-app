"use client";
import { FormState } from "@/lib/formValidations";
import AuthForm from "../components/auth-form/AuthForm";
import { Button } from "@/components/button/Button";

type RegisterFields = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Register() {
  const fields: FormState<RegisterFields> = {
    fullName: { label: "Full name", validations: {} },
    email: { validations: { required: true } },
    password: { validations: { required: true } },
    passwordConfirm: {
      label: "Confirm password",
      validations: { required: true },
    },
  };

  const handleRegister = (fields: RegisterFields) => {
    console.log("handleRegister: ", fields);
  };

  return (
    <AuthForm
      title="New user"
      fields={fields}
      handleFormSubmit={handleRegister}
      buttons={[
        { component: Button, props: { label: "Register" } },
        {
          component: Button,
          props: { href: "/login", variant: "outline", label: "Login" },
        },
      ]}
    />
  );
}
