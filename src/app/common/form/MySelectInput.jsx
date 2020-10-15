import React from "react";
import { Label, FormField, Select } from "semantic-ui-react";
import { useField } from "formik";

export default function MySelectInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
      clearable
      value={field.value || null}
      onChange={(i, d) => helpers.setValue(d.value)}
      onBlur={() => helpers.setTouched(true)}
      {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
