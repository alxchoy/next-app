import { FormField, FormState } from "@/components/form/Form";
import { capitalize } from "./utils";

export const fieldValidation = ({
  name,
  field,
}: {
  name: string;
  field: FormField;
}): string => {
  if (field.validations?.required && !field.value) {
    return `${capitalize(name)} is required`;
  }
  if (
    field.validations?.pattern &&
    !new RegExp(field.validations?.pattern).test(field.value!)
  ) {
    return `${capitalize(name)} is invalid`;
  }
  if (
    field.validations?.minLength &&
    field.value!.length < field.validations?.minLength
  ) {
    return `${capitalize(name)} must have ${
      field.validations?.minLength
    } characters at least`;
  }

  return "";
};

export const formValidation = <T,>(fields: FormState<T>): FormState<T> => {
  const formData = { ...fields };

  Object.entries<FormField>(formData).forEach(([key, field]) => {
    formData[key as keyof T].error = fieldValidation({ name: key, field });
  });

  return formData;
};
