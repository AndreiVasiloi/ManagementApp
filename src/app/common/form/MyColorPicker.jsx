import React from "react";
import { Label, FormField } from "semantic-ui-react";
import { useField, useFormikContext } from "formik";
import InputColor from "react-input-color";

export default function MyColorPicker({ label, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <InputColor
        {...field}
        {...props}
        initialValue='#5e72e4'
        onChange={(value) => setFieldValue(field.name, value)}
        placement='right'
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
