"use client";
import authService from "@/services/authService";
import { useFetch } from "@/hooks/useFetch";
import { LoginRequest } from "@/app/api/auth/types";
import Form, { FormState } from "@/components/form/Form";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import styles from "../auth.module.scss";

const Login = () => {
  const { data, error, isLoading, fetcher } = useFetch(authService.login);

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
    const res = await fetcher(fields);
    console.log(res);
  };

  return (
    <div>
      <h1 className={styles.formTitle}>Welcome back!</h1>
      <Form fields={fields} handleFormSubmit={handleLogin}>
        {Object.entries(fields).map(([key, { label }]) => (
          <Input key={key} name={key} label={label || key} />
        ))}
        <Button
          label={isLoading ? "Loading..." : "Login"}
          type="submit"
          disabled={isLoading}
        />
        <Button label="Register" href="/register" variant="outline" />
      </Form>
    </div>
  );
};

export default Login;
