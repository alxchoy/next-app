"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Form, { FormState } from "@/components/form/Form";
import styles from "../auth.module.scss";

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
