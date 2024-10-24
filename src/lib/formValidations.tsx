import { capitalize } from "./utils";

export type FormValidations = {
  required?: boolean;
  pattern?: string;
  minLength?: number;
};

export type FormField = {
  value?: string;
  label?: string;
  validations?: FormValidations;
};

export type FormState<T> = {
  [Property in keyof T]: FormField;
};

export type FormErrors<T> = {
  [Property in keyof T]: string;
};

export const fieldValidation = ({
  name,
  field,
}: {
  name: string;
  field: FormField;
}): string | undefined => {
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
};

export const formValidation = function <T>(
  fields: FormState<T>
): FormErrors<T> {
  const errors = {} as FormErrors<T>;

  Object.keys(fields).forEach((key) => {
    const field = fields[key as keyof T];
    const error = fieldValidation({ name: key, field });
    if (error) {
      errors[key as keyof T] = error;
    }
  });

  return errors;
};
