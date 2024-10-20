import { useState } from "react";
import {
  fieldValidation,
  FormState,
  FormErrors,
  formValidation,
} from "@/lib/formValidations";

export function useForm<T>(initialValue: FormState<T>) {
  const [fields, setFields] = useState(initialValue);
  const [errors, setErrors] = useState({} as FormErrors<T>);
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const fieldsUpdated = {
      ...fields,
      [name]: { ...fields[name as keyof T], value },
    };
    setFields(fieldsUpdated);

    const errorField = fieldValidation({
      name,
      field: fieldsUpdated[name as keyof T],
    });
    isTouched && setErrors({ ...errors, [name]: errorField });
  };

  const handleSubmit =
    (cb: () => void) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsTouched(true);
      const newErrors = formValidation(fields);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        cb();
      }
    };

  return { errors, handleChange, handleSubmit };
}
