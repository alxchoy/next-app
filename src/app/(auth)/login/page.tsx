"use client";
import { supabaseClient } from "@/lib/supabaseClient";
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
    password: { validations: { required: true, minLength: 6 } },
  };

  const handleLogin = async (fields: LoginFields) => {
    const { email, password } = fields;
    // const { data, error } = await supabaseClient.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // console.log("data: ", data);
    // console.log("error: ", error);
    const data = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const res = await data.json();

    console.log(res);
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
