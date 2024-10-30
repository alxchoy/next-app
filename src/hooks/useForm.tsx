import { useState } from "react";
import { FormField, FormState } from "@/components/form/Form";
import { formValidation } from "@/lib/formValidations";

export function useForm<T>(initialValues: FormState<T>) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: { ...formData[name as keyof T], value },
    });
  };

  const handleSubmit =
    (cb: (fields: T) => void) => (event: React.FormEvent) => {
      event.preventDefault();
      const formDataWithErrors = formValidation(formData);
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

// export function useForm<T>(initialValue: FormState<T>) {
//   const [fields, setFields] = useState(initialValue);
//   const [errors, setErrors] = useState({} as FormErrors<T>);
//   const [isTouched, setIsTouched] = useState(false);

//   const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
//     const { name, value } = event.currentTarget;
//     const nameT = name as keyof T;
//     const fieldsUpdated = {
//       ...fields,
//       [name]: { ...fields[nameT], value },
//     };
//     setFields(fieldsUpdated);

//     const errorField = fieldValidation({
//       name,
//       field: fieldsUpdated[nameT],
//     });
//     if (isTouched) setErrors({ ...errors, [name]: errorField });
//   };

//   const handleSubmit =
//     (cb: (fields: T) => void) => (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       const newErrors = formValidation(fields);

//       if (Object.keys(newErrors).length > 0) {
//         setErrors(newErrors);
//         setIsTouched(true);
//       } else {
//         const data = {} as T;
//         Object.keys(fields).forEach((key) => {
//           const keyT = key as keyof T;
//           const field = fields[keyT];
//           data[keyT] = field.value! as T[keyof T];
//         });
//         cb(data);
//       }
//     };

//   return { errors, handleChange, handleSubmit };
// }

// function createFormDataInitialState<T>(
//   initialValues: FormState<T>
// ): FormData<T> {
//   const values = {} as FormData<T>;
//   Object.keys(initialValues).forEach((key) => {
//     const keyT = key as keyof T;
//     values[keyT] = {
//       value: initialValues[keyT].value || "",
//       error: initialValues[keyT].value || "",
//     };
//   });

//   return values;
// }
