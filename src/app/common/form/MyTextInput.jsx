import React from "react";
import { Label, FormField } from "semantic-ui-react";
import { useField } from "formik";

export default function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
