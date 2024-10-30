import Input, { InputProps } from "@/components/input/Input";
import { useFormTwo } from "@/hooks/useForm";
import { FormField, FormValidations } from "@/lib/formValidations";
import React from "react";

type AuthFormTwoProps<T> = {
  children: React.ReactNode;
  formFields: { [Property in keyof T]: FormField };
};

const AuthFormTwo = <T,>({ children, formFields }: AuthFormTwoProps<T>) => {
  const { formData, handleChange } = useFormTwo(formFields);
  // console.log(children);

  return (
    <form>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<{
            onChange: React.ChangeEventHandler<HTMLInputElement>;
            value: string;
            name: keyof T;
          }>(child)
        ) {
          return React.cloneElement(child, {
            onChange: handleChange,
            value: formData[child.props.name].value || "",
          });
        }

        return child;
      })}
    </form>
  );
};

export default AuthFormTwo;
