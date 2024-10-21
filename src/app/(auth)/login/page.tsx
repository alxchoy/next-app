"use client";
import { FormState } from "@/lib/formValidations";
import AuthForm from "../components/auth-form/AuthForm";
import { Button } from "@/components/button/Button";

type LoginFields = {
  email: string;
  password: string;
};

const Login = () => {
  const fields: FormState<LoginFields> = {
    email: {
      validations: {
        required: true,
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      },
    },
    password: { validations: { required: true } },
  };

  const handleLogin = (fields: LoginFields) => {
    console.log("handleLogin:", fields);
  };

  return (
    <AuthForm
      title="Welcome back!"
      fields={fields}
      handleFormSubmit={handleLogin}
      buttons={[
        { component: Button, props: { label: "Login", type: "submit" } },
        {
          component: Button,
          props: { href: "/register", label: "Register", variant: "outline" },
        },
      ]}
    />
  );
};

export default Login;
