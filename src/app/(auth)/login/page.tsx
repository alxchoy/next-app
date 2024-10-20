import AuthForm from "../components/auth-form/AuthForm";

export default function Login() {
  const fields = {
    email: { value: "", validations: { required: true, minLength: 6 } },
    password: { value: "", validations: { required: true } },
  };

  return <AuthForm<typeof fields> title="Welcome back!" fields={fields} />;
}
