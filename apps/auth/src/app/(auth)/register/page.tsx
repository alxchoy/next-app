"use client";
import authService from "../../../services/authService";
import { RegisterRequest } from "../../api/auth/types";
import Form, { FormState } from "../../../components/form/Form";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import styles from "../auth.module.scss";

type RegisterFields = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const Register = () => {
  const fields: FormState<RegisterRequest> = {
    fullName: { label: "Full name", validations: { required: true } },
    email: {
      validations: {
        required: true,
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      },
    },
    password: { validations: { required: true, minLength: 6 } },
    passwordConfirm: {
      label: "Confirm password",
      validations: { required: true, matchTo: "password" },
    },
  };

  const handleRegister = async (fields: RegisterRequest) => {
    const { data, error, success } = await authService.register(fields);
    console.log(data, error, success);
  };

  return (
    <div>
      <h1 className={styles.formTitle}>New User</h1>
      <Form fields={fields} handleFormSubmit={handleRegister}>
        {Object.entries(fields).map(([key, { label }]) => (
          <Input key={key} name={key} label={label || key} />
        ))}
        <Button label="Register" type="submit" />
        <Button label="Login" href="/login" variant="outline" />
      </Form>
    </div>
  );
};

export default Register;
