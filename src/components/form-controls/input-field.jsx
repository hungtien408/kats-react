import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
};

function InputField(props) {
  const { form, name, type, label, placeholder, disabled, ...custom } = props;
  // const { errors, formState } = form;
  // const hasError = formState.touched[name] && errors[name];
  const { errors } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      fullWidth
      label={label}
      type={type}
      placeholder={placeholder ?? label}
      disabled={disabled}
      error={!!hasError}
      helperText={errors[name]?.message}
      size="small"
      {...custom}
    />
  );
}

export default InputField;
