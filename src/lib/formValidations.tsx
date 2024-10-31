import { FormField, FormState } from "@/components/form/Form";
import { capitalize } from "./utils";

export const fieldValidation = <T,>(
  { name, field }: { name: string; field: FormField },
  form: FormState<T>
): string => {
  const fieldName = capitalize(field.label || name);

  if (field.validations?.required && !field.value) {
    return `${fieldName} is required`;
  }
  if (
    field.validations?.pattern &&
    !new RegExp(field.validations?.pattern).test(field.value!)
  ) {
    return `${fieldName} is invalid`;
  }
  if (
    field.validations?.minLength &&
    field.value!.length < field.validations?.minLength
  ) {
    return `${fieldName} must have ${field.validations?.minLength} characters at least`;
  }

  if (
    field.validations?.matchTo &&
    form[field.validations.matchTo as keyof T].value !== field.value
  ) {
    return `${fieldName} not match with ${capitalize(
      field.validations?.matchTo
    )}`;
  }

  return "";
};

export const formValidation = <T,>(form: FormState<T>): FormState<T> => {
  const formData = { ...form };

  Object.entries<FormField>(formData).forEach(([key, field]) => {
    formData[key as keyof T].error = fieldValidation(
      { name: key, field },
      formData
    );
  });

  return formData;
};
