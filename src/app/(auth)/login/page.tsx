"use client";
import { supabaseClient } from "@/lib/supabaseClient";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Form, { FormState } from "@/components/form/Form";
import styles from "../auth.module.scss";
import { useFetch } from "@/hooks/useFetch";
import httpClient from "@/lib/http/httpClient";
import { AuthResponse, LoginRequest } from "@/app/api/auth/types";

type LoginFields = {
  email: string;
  password: string;
};

const Login = () => {
  // const { data, fetcher } = useFetch();

  const fields: FormState<LoginRequest> = {
    email: {
      validations: {
        required: true,
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      },
    },
    password: { validations: { required: true, minLength: 6 } },
  };

  const handleLogin = async (fields: LoginRequest) => {
    const { email, password } = fields;

    const { data, error, success } = await httpClient.post<AuthResponse>(
      "/api/auth/login",
      fields
    );
    console.log(data, error, success);
  };

  return (
    <div>
      <h1 className={styles.formTitle}>Welcome back!</h1>
      <Form fields={fields} handleFormSubmit={handleLogin}>
        {Object.entries(fields).map(([key, { label }]) => (
          <Input key={key} name={key} label={label || key} />
        ))}
        <Button label="Login" type="submit" />
        <Button label="Register" href="/register" variant="outline" />
      </Form>
    </div>
  );
};

export default Login;
