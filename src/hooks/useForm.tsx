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
    const nameT = name as keyof T;
    const fieldsUpdated = {
      ...fields,
      [name]: { ...fields[nameT], value },
    };
    setFields(fieldsUpdated);

    const errorField = fieldValidation({
      name,
      field: fieldsUpdated[nameT],
    });
    if (isTouched) setErrors({ ...errors, [name]: errorField });
  };

  const handleSubmit =
    (cb: (fields: T) => void) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const newErrors = formValidation(fields);

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsTouched(true);
      } else {
        const data = {} as T;
        Object.keys(fields).forEach((key) => {
          const keyT = key as keyof T;
          const field = fields[keyT];
          data[keyT] = field.value! as T[keyof T];
        });
        cb(data);
      }
    };

  return { errors, handleChange, handleSubmit };
}
