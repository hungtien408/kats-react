import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import InputField from 'components/form-controls/input-field';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import PropTypes from 'prop-types';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm({ onSubmit = null }) {
  const validationSchema = yup.object().shape({
    userName: yup.string().required('Vui lòng nhập tên đăng nhập.'),
    password: yup.string().required('Vui lòng nhập mật khẩu.'),
  });

  const form = useForm({
    defaultValues: {
      userName: '',
      password: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleSubmitForm = async (values) => {
    if (!onSubmit) return;

    await onSubmit(values);
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
      <InputField name="userName" label="Email" variant="outlined" className="mb-3" form={form} />
      <InputField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        className="mb-3"
        form={form}
      />
      <div className="text-right">
        <Button type="submit" variant="contained" color="primary" className="mb-3">
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
