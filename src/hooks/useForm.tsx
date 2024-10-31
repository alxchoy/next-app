import { useState } from "react";
import { FormField, FormState } from "@/components/form/Form";
import { fieldValidation, formValidation } from "@/lib/formValidations";

export function useForm<T>(initialValues: FormState<T>) {
  const [formData, setFormData] = useState(initialValues);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    const fieldError = fieldValidation(
      {
        name,
        field: { ...formData[name as keyof T], value },
      },
      formData
    );

    setFormData(() => ({
      ...formData,
      [name]: {
        ...formData[name as keyof T],
        value,
        error: isTouched ? fieldError : "",
      },
    }));
  };

  const handleSubmit =
    (cb: (fields: T) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      const formDataWithErrors = formValidation(formData);
      setFormData(formDataWithErrors);
      setIsTouched(true);

      if (!hasErrors(formDataWithErrors)) {
        const data = getValuesFromForm(formDataWithErrors) as T;
        cb(data);
      }
    };

  return { formData, handleChange, handleSubmit };
}

function hasErrors<T>(form: FormState<T>): boolean {
  return Object.values<FormField>(form).some((val) => !!val.error);
}

function getValuesFromForm<T>(form: FormState<T>): Record<keyof T, string> {
  return Object.entries<FormField>(form).reduce((acc, [key, { value }]) => {
    acc[key as keyof T] = value!;
    return acc;
  }, {} as Record<keyof T, string>);
}
